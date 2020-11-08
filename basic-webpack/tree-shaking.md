# Tree Shaking
Tree Shaking是JavaScript上下文中通常用于消除死代码的一个术语。它依赖于ES2015模块语法的静态结构，即import和export。这个名称和概念是由ES2015模块bundler rollup推广的。

webpack 2版本提供了对ES2015模块(别名和谐模块)的内置支持，以及未使用模块导出检测。新的webpack 4版本扩展了这个功能，通过package.json里面的sideEffects属性表示项目中的哪些文件是“纯”的，因此在未使用时可以安全删除。

## 增加utility
```bash
project

webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules


// src/math.js

export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```
mode设置development，不要让bundle minified

```bash
// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
+ mode: 'development',
+ optimization: {
+   usedExports: true,
+ },
};
```
有了这些，让我们更新我们的entry script，以利用这些新方法之一，并删除lodash为简单:

```bash
// src/index.js

- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```
注意，我们没有从src/math.js模块导入square方法。该函数被称为“死代码”，意思是应该删除未使用的导出。现在让我们运行我们的npm脚本，npm run build，并检查输出包:

```bash
dist/bundle.js (around lines 90 - 100)

/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```
注意上面unused harmony export square的comment。如果您查看它下面的代码，您会注意到square没有被导入，但是它仍然包含在bundle中。我们将在下一节中解决这个问题。

## 弄清tree shaking 和 sideEffects
sideEffects和usedExports(更广为人知的tree shaking)优化是两种不同的东西。
sideEffects更有效，因为它允许跳过整个模块/文件和完整的子树。
usedExports依赖于terser[https://github.com/terser/terser]来检测语句中的sideEffects。这在JavaScript中是一项困难的任务，而且不如直接使用sideEffects标志有效。它也不能跳过子树/依赖关系，因为规范说需要评估sideEffects。虽然导出函数可以正常工作，但React的高阶组件(HOC)在这方面存在问题。
比如
```bash
import { Button } from '@shopify/polaris';

The pre-bundled version looks like this:

import hoistStatics from 'hoist-non-react-statics';

function Button(_ref) {
  // ...
}

function merge() {
  var _final = {};

  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i];
    mergeRecursively(_final, obj);
  }

  return _final;
}

function withAppProvider() {
  return function addProvider(WrappedComponent) {
    var WithProvider =
    /*#__PURE__*/
    function (_React$Component) {
      // ...
      return WithProvider;
    }(Component);

    WithProvider.contextTypes = WrappedComponent.contextTypes ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes) : polarisAppProviderContextTypes;
    var FinalComponent = hoistStatics(WithProvider, WrappedComponent);
    return FinalComponent;
  };
}

var Button$1 = withAppProvider()(Button);

export {
  // ...,
  Button$1
};
```
当Button未使用时，您可以有效地删除export {Button$1};这就留下了所有剩余的代码。所以问题是“这段代码有任何sideEffects吗?或者可以安全地删除它吗?”很难说，特别是因为这一行与appprovider()(Button)。调用withAppProvider并调用返回值。调用merge或hoistStatics时是否有sideEffects?使用WithProvider.contextTypes时有sideEffects吗?或者当读取WrappedComponent.contextTypes (Getter)。

Terser实际上试图弄清楚，但在很多情况下它并不确定。这并不意味着terser不能很好地完成它的工作，因为它不能解决问题。在像JavaScript这样的动态语言中可靠地确定它是非常困难的。

但是我们可以通过使用剩余的/*#__PURE__*/注释来帮助terser。它将语句标记为无sideEffects。所以一个简单的改变将使它可能tree shaking代码:

var Button$1 = /*#__PURE__*/ withAppProvider()(Button);

这将允许删除这段代码。但是进口产品仍然存在问题，需要列入/评估，因为它们可能含有sideEffects。

为了解决这个问题，我们使用package.json中的“sideEffects”属性。

它类似于/*#__PURE__*/，但是是在模块级别(module level)而不是语句级别( statement level)。它说(“sideEffects”属性):“如果没有使用标记为无sideEffects的模块的直接导出，绑定者可以跳过评估模块的sideEffects。”

在Shopify的北极星示例(Polaris)中，原始模块是这样的:

```bash
index.js

import './configure';
export * from './types';
export * from './components';
components/index.js

// ...
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Button, buttonFrom, buttonsFrom, } from './Button';
export { default as ButtonGroup } from './ButtonGroup';
// ...
package.json

// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...

```
```bash
For import { Button } from "@shopify/polaris"; this has the following implications:

include it: include the module, evaluate it and continue analysing dependencies
skip over: dont include it, don't evaluate it but continue analysing dependencies
exclude it: don't include it, don't evaluate it and don't analyse dependencies
Specifically per matching resource(s):

index.js: No direct export is used, but flagged with sideEffects -> include it
configure.js: No export is used, but flagged with sideEffects -> include it
types/index.js: No export is used, not flagged with sideEffects -> exclude it
components/index.js: No direct export is used, not flagged with sideEffects, but reexported exports are used -> skip over
components/Breadcrumbs.js: No export is used, not flagged with sideEffects -> exclude it. This also excluded all dependencies like components/Breadcrumbs.css even if they are flagged with sideEffects.
components/Button.js: Direct export is used, not flagged with sideEffects -> include it
components/Button.css: No export is used, but flagged with sideEffects -> include it
In this case only 4 modules are included into the bundle:

index.js: pretty much empty
configure.js
components/Button.js
components/Button.css
```
在此优化之后，仍然可以应用其他优化。例如:buttonFrom和buttonFrom导出的buttonon .js也是未使用的。usedExports优化将拾取它，而terser可能能够从模块中删除一些语句。

模块连接也适用。这样这4个模块加上入口模块(可能还有更多的依赖项)就可以连接起来了 index.js最终没有生成任何代码。

## Mark a function call as side-effect-free

通过使用/*#__PURE__*/注释，可以告诉webpack一个函数调用是无副作用的(纯)。它可以放在函数调用前面，将它们标记为无副作用。传递给函数的参数没有被注释标记，可能需要单独标记。当变量声明中未使用变量的初始值被认为是无副作用的(纯)时，它被标记为死代码，不被执行并被最小化器丢弃。此行为在optimization.innerGraph设置为真时候启用。

```bash
file.js

/*#__PURE__*/ double(55);
```

## minify the output
因此，我们已经使用导入和导出语法提示了要删除的“死代码”，但我们仍然需要从包中删除它。为此，将模式配置选项设置为production。

```bash
webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
- mode: 'development',
- optimization: {
-   usedExports: true,
- }
+ mode: 'production',
};

Note that the --optimize-minimize flag can be used to enable TerserPlugin as well.
```

```bash
With that squared away, we can run another npm run build and see if anything has changed.

Notice anything different about dist/bundle.js? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you wont see the square function included but will see a mangled version of the cube function (function r(e){return e*e*e}n.a=r). With minification and tree shaking, our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.

ModuleConcatenationPlugin is needed for the tree shaking to work. It is added by mode: 'production'. If you are not using it, remember to add the ModuleConcatenationPlugin manually.
```

## conclusion

所以，我们学到的是，为了利用摇树的优势，你必须……

使用ES2015模块语法(即导入和导出)。

1.确保没有编译器将你的ES2015模块语法转换成CommonJS模块(这是流行的Babel预设@babel/preset-env的默认行为，更多细节请参阅文档)。

2.将“副作用”属性添加到项目包中。json文件。

3.使用生产模式配置选项来启用各种优化，包括缩小和摇动树。

您可以将应用程序想象成一棵树。您实际使用的源代码和库表示树的绿色活叶子。“死代码”代表秋天吃掉的枯黄枯叶。为了除掉枯叶，你必须摇动树，使它们掉下来。
如果你对优化你的输出的更多方法感兴趣，请跳到下一个指南，了解为生产构建的细节。
