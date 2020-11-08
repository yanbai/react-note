# Getting Started with CSS Modules
Author
Robin Rendle
Last Updated
Jan 20, 2018

```bash
CSS模块没有单一的方法来制作JavaScript模板、CSS文件或使它们工作的构建步骤。这篇文章是CSS模块系列的一部分，在这篇文章中，我们将介绍一种方法。这篇文章的目标是让CSS模块项目启动并运行。

在我工作的项目中，有一个要求，CSS永远不应该依赖客户端JavaScript来工作，因此构建步骤需要在部署之前将所有内容处理为可工作的HTML和CSS。我们将使用Webpack，一个构建系统和模块绑定器。在下一篇文章中，我们将重点讨论如何使下面的代码适合于向浏览器呈现静态HTML的实际项目。
让我们开始吧!
```

# Installing Webpack

```bash

在安装NPM和node之后，我们需要在某处设置一个空目录并运行以下操作:

npm init - y

这将形成一个包。json文件，并填充一堆默认值。这是我们的依赖项清单——当其他人npm安装这个项目时下载和安装的说明。
Webpack将处理我们的构建过程。它将监视我们的CSS、JavaScript和HTML，并执行它们之间的所有魔法。但是Webpack是什么呢?Maxime Fabre想知道Webpack是一个构建系统还是一个模块绑定器:
好吧，两者都有，我不是说两者都有，我是说两者都有。Webpack不构建你的资源，然后单独捆绑你的模块，它认为你的资源是模块本身…可以导入，修改，操作，最终可以打包到你的最终包。
如果这听起来很奇怪，不要担心。还记得Sass, Gulp和npm都是陌生而可怕的吗?我们会想办法的。
让我们确保Webpack通过一个JavaScript文件定义一个依赖项来正确地“绑定”模块，这样我们就可以导入代码块。首先，我们需要全局安装Webpack，这样我们就可以在终端使用Webpack命令:

npm install webpack -g

完成之后，我们需要在项目中安装Webpack，如下所示:

npm i -D webpack

现在我们需要在/src目录中创建一个index.js文件。通常，我喜欢创建一个存放所有静态资产(如图像、字体、CSS文件和标记)的目录。我编写的任何代码通常都存在于/src目录中，而机器编写的或在某个进程中解释的任何代码都应该存在于/build目录中。我的想法是，删除/build目录应该完全没有问题，因为我们可以运行一个命令，它将处理来自/src目录的东西，并完全重建/build目录。在本例中，我们希望Webpack查看/src中的所有内容，执行某个过程，然后将代码移到/build中。
在/src目录中，我们还可以添加一个空的alert.js文件(我们将马上返回它)。我们还需要一个webpack.config.js文件，它位于项目的根目录下，在/src目录之外，这样我们的项目结构现在应该是这样的:
```
```bash
package.json
webpack.config.js
/node_modules
/src
  index.js
  alert.js

webpack.config.js:

module.exports = {
  entry: './src',
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
};
```
```bash
无论何时我们从这里开始运行webpack命令，webpack都会查看/src中的所有资产来构建一个依赖树。
返回到我们的src/index.js文件，我们可以添加以下内容:
```
```bash
require("./alert.js");
And inside our alert.js file we can write this:

alert("LOUD NOISES");

Now let’s make an index.html file in our root and add our bundle in a script tag just before the <body> closes:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document name</title>
</head>
<body>
    <h1>CSS Modules demo</h1>

    <script src="build/bundle.js"></script>
</body>
</html>
```
```bash
这个bundle.js将由Webpack生成。要生成它，我们只需运行webpack命令。为了使这更容易，我们可以更新包。带有构建脚本的json文件。以下是您应该在该文件中找到的内容:

"scripts": {
  "test": "echo 'Error: no test specified' && exit 1"
},

这些是npm给我们的默认设置，但是我们可以用下面的代码来替换上面的代码，来创建我们自己的命令行脚本，它将为我们运行Webpack并打开一个浏览器窗口:

"scripts": {
  "start": "webpack && open index.html"
},


所以当我们运行npm start时，我们会自动运行webpack命令并在浏览器中打开我们的索引文件。让我们来看看会发生什么。
万岁，有东西在工作!这证明了我们的index.js文件从alert.js中导入了代码，并且Webpack正确地绑定了所有的东西。如果我们现在删除alert.js文件，我们会发现一个错误，当我们运行npm重新开始:
如果Webpack找不到导入的模块，就会出现这个错误。但现在我们已经确认了所有这些工作，我们可以在我们的index.js文件中删除require语句，并进入下一个步骤，学习Webpack。
```

# Adding our First Loader

```bash
Webpack中的加载器非常重要。马克西姆·法布尔这样说:
加载器是一种小插件，基本上说“当你遇到这种文件时，用它来做这个”。
在马克西姆的教程中，他添加了Babel加载器，这是一个很好的起点，因为Babel允许我们使用ES2015和JavaScript语言的最新改进。因此，我们可以使用import代替前面使用的Common.js函数来要求另一个模块。有了Babel，我们还可以使用类，箭头函数和一堆其他很酷的功能:
像Babel这样的工具允许我们现在编写新的ES2015代码，并执行一项名为transpiling(很像预处理)的任务，将代码转换成更早版本的JavaScript，它拥有更强大的浏览器支持。这与Sass的工作原理相似;最初使用Sass语法编写代码，然后由一个预处理器编译成标准的CSS。
以下将安装Webpack babel加载器和我们运行babel所需的依赖项:
```
```bash
npm i -D babel-loader babel-core babel-preset-env

In a .babelrc file in the root of our project we can configure the preset to let others know which JavaScript syntax we’ll be using:

{
  "presets": ["babel-preset-env"]
}
```
```bash
现在我们想在所有。js文件上运行Babel但只有我们写的文件，以及以后安装的其他依赖，可能会有自己的语法，我们不想弄乱代码。这就是Webpack加载器发挥作用的地方。我们可以打开webpack.config.js文件，并将该代码替换为以下代码:
```
```bash
module.exports = {
  entry:  './src',
  output: {
  path: 'build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: __dirname + '/src',
       }
    ],
  }
};
```
```bash
加载器数组中的test key/value对是我们告诉Webpack我们想要对哪种类型的文件执行操作的方式，而include则告诉它在我们的项目中我们想要在哪里执行操作。
让我们测试一下Babel是否与Webpack一起工作。在一个新文件(' src/ robots .js ')中，我们写入以下内容:
```
```bash
const greetings = (text, person) => {
  return `${text}, ${person}. I read you but I’m sorry, I’m afraid I can’t do that.`;
}

export default greetings;
```
```bash
这个JavaScript文件使用了一组ES2015特有的特性，比如export、const和let、箭头函数和模板文字。
现在我们可以将这个模块导入到src/index.js文件中，如下所示:
```
```bash
import greetings from './robot.js'
document.write(greetings("Affirmative", "Dave"));
```
```bash
最后，我们所需要做的就是重新运行npm start，我们的浏览器将弹出文本:“肯定，Dave。我读懂了，但是对不起，恐怕我不能那样做。“这只是证实了babel正在正常工作。
Hurray!这还不是CSS模块，尽管我们离它更近了一步。但在我们继续之前，让我们删除src/ robots .js和所有的代码从src/index.js。
```


# Loading the styles
```bash
现在我们已经让我们的模板几乎工作，我们需要增加两个加载器:css-loader和style-loader，我们将安装:
npm i -D css-loader style-loader
css-loader获取CSS文件并读取其所有依赖项，而style-loader将把这些样式直接嵌入到标记中。让我们在src/app.css中编写一些CSS来测试这个:
```
```bash
.element {
  background-color: blue;
  color: white;
  font-size: 20px;
  padding: 20px;
}

Then we can import that stylesheet into our `src/index.js` file:

import styles from './app.css'

let element = `
  <div class="element">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur laudantium recusandae itaque libero velit minus ex reiciendis veniam. Eligendi modi sint delectus beatae nemo provident ratione maiores, voluptatibus a tempore!</p>
  </div>
`

document.write(element);
```
```bash
哇,坚持!我们是否让样式表依赖于JavaScript文件?当然，我们做到了。但是在它正常工作之前，在我们看到它为什么有用之前，我们首先需要重新配置我们的webpack.config.js:
```
```bash
module.exports = {
  entry:  './src',
  output: {
    path: 'build',
      filename: 'bundle.js',
    },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src',
      },
      {
        test: /\.css/,
        loaders: ['style', 'css'],
        include: __dirname + '/src'
      }
    ],
  }
};
```
```bash
运行npm start将给我们留下这样的东西:
因此，如果我们在文档中“检查元素”，我们会发现样式加载器已经将该文件放入一个<style>在头部的文档:
让我们回顾一下刚刚发生的事情。我们创建了一个请求另一个CSS文件的JavaScript文件，该代码随后被嵌入到一个web页面中。因此，在一个更现实的例子中，我们可以创建一个buttons.js文件，并将buttons.css作为它的依赖项，然后将该JavaScript导入到另一个文件中，该文件组织我们的模板并生成一些HTML。这应该使我们的代码荒谬地模块化和容易阅读!
就个人而言，为了保持简洁，我更喜欢使用一个单独的CSS文件，而不是内联添加所有代码。为此，我们需要使用Webpack插件extract text:
将条目块中的每个require(' style.css ')移动到一个单独的css输出文件中。因此，您的样式不再内联到javascript中，而是单独放在一个css bundle文件(styles.css)中。如果样式表总量很大，速度会更快，因为样式表包是与javascript包并行加载的。
我们必须安装与npm:

npm i -D extract-text-webpack-plugin

现在我们可以更新webpack.config了。js的文件再次要求它和放置我们的CSS加载器到它:
```
```bash
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  './src',
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src',
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("css")
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
```
```bash
ExtractTextPlugin现在将创建一个style.css的文件给我们!
您可能已经注意到，我们已经完全摆脱了style-loader。这是因为我们不想再将这些样式注入到我们的标记中。所以现在如果我们打开/build目录，我们应该会发现已经创建了一个styles.css文件，其中包含了我们所有的代码。在index.html文件中，我们现在可以将样式表添加到header中:

<link rel="stylesheet" href="build/styles.css">

运行npm，重新开始和废话!-我们的风格魔术般地出现在他们所属的页面上。
现在我们已经在页面上运行了CSS和HTML，那么如何操作类名以获得本地作用域的所有好处呢?我们所要做的就是像这样更新我们的webpack.config.js文件:

{
  test: /\.css/,
  loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
}

这将在类名的末尾添加疯狂生成的文本。这就是CSS模块的全部，它是一个哈希，用来改变可以通过CSS-loader添加到Webpack中的类。
接下来，我们必须用样式更新我们的index.js文件。元素类:
```
```bash
import styles from './app.css'

let element = `
  <div class="${styles.element}">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur laudantium recusandae itaque libero velit minus ex reiciendis veniam. Eligendi modi sint delectus beatae nemo provident ratione maiores, voluptatibus a tempore!</p>
  </div>
`

document.write(element);
```
```bash
看会发生什么!再启动一次npm，我们的代码就被Webpack处理了，所以局部作用域不再是问题，因为注入到web页面的类现在看起来是这样的:

<div class="app__element___1MmQg">
  ...
</div>

我们还没有真正完成，因为还有很多问题没有回答。我们如何在开发中编写这样的代码?我们怎样才能避开那份讨厌的document.write规则，我们正在使用注入到页面的标记?我们应该如何构造模块和文件?让CSS模块启动并运行只是工作的一半，接下来我们必须考虑如何从另一个系统将代码基移植到它中。
在下一个教程中，我们将了解React如何帮助我们生成整洁的小模块，还将了解如何从大量模板中生成静态标记，以及如何在我们的项目中添加其他特性，如Sass和PostCSS。
```

