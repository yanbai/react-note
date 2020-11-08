# CSS Modules and React
Author
Robin Rendle
Last Updated
Mar 13, 2017
在CSS模块系列的最后一篇文章中，我将研究如何借助Webpack创建一个静态的React站点。这个静态站点将有两个模板:一个主页和一个about页面，其中有几个React组件来解释它的实际工作方式。

```bash

在上一篇文章中，我们用Webpack建立了一个快速项目，展示了如何将依赖项导入到文件中，以及如何使用构建过程来生成一个在CSS和HTML中生成的唯一类名。下面的示例很大程度上依赖于该教程，因此绝对值得首先完成前面的示例。这篇文章还假设你熟悉React的基本知识。
在上一个演示中，在我们结束时代码基出现了一些问题。我们依赖于JavaScript来呈现我们的标记，但我们并不完全清楚应该如何构造一个项目。在这篇文章中，我们将看到一个更现实的例子，在这个例子中，我们尝试用我们新的Webpack知识来创建一些组件。
要赶上进度，您可以查看我所做的css-modules-react(https://github.com/robinrendle/css-modules-react)，这只是一个演示项目，它将我们带到最后一个演示结束的地方。从那里您可以继续下面的教程。
```

# Webpack’s Static Site Generator

```bash
为了生成静态标记，我们需要为Webpack安装一个插件来帮助我们生成静态标记:
npm i -D static-site-generator-webpack-plugin
现在我们需要把我们的插件添加到webpack.config中。和添加我们的路由。路径会像 / 主页或/about 关于页面。路由告诉插件创建哪些静态文件。

var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var locals = {
  routes: [
    '/',
  ]
};

因为我们想要交付静态标记，并且在这一点上我们希望避免服务器端代码，所以我们可以使用我们的StaticSiteGeneratorPlugin。正如这个插件的文档中提到的，它提供了:
通过执行您自己定制的、webpack-compiled render函数，将在输出目录中呈现一系列要呈现的路径和一组匹配的index.html文件。
如果这听起来很难，不用担心!仍然在我们的webpack.config中。js，我们现在可以更新:

module.exports = {
  entry:  {
    'main': './src/',
  },
  output: {
    path: 'build',
    filename: 'bundle.js',
    libraryTarget: 'umd' // this is super important
  },
  ...
}

我们设置libraryTarget是因为这是nodejs和静态站点插件正常工作的必要条件。我们还添加了一个路径，这样所有内容都将生成到我们的' /build '目录中。
仍然在我们的webpack.config中。我们需要在底部添加StaticSiteGeneratorPlugin，像这样，传递我们想要生成的路由:

plugins: [
  new ExtractTextPlugin('styles.css'),
  new StaticSiteGeneratorPlugin('main', locals.routes),
]

// webpack.config.js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var locals = {
  routes: [
    '/',
  ]
}

webpack.config.js

module.exports = {
  entry: './src',
  output: {
    path: 'build',
    filename: 'bundle.js',
    libraryTarget: 'umd' // this is super important
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname + '/src',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: __dirname + '/src'
      }
    ],
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', locals.routes),
    new ExtractTextPlugin("styles.css"),
  ]
};

// src/index.js:
// Exported static site renderer:
module.exports = function render(locals, callback) {
  callback(null, '<html>Hello!</html>');
};

现在我们只想打印Hello!上载至本网站的首页。最终我们会把它变成一个更真实的站点。
在我们的package.json，我们已经有了基本的命令，webpack，我们可以运行:

npm start

如果我们签出我们的构建目录，我们会找到一个包含我们内容的index。html文件。甜蜜的!我们可以确认静态站点插件正在工作。现在，为了测试这一切是否正常，我们可以返回webpack.config.js并更新路由:

var locals = {
  routes: [
    '/',
    '/about'
  ]
};

通过重新运行npm start命令，我们创建了一个新文件:' build/about/index.html '。然而，这将有“Hello!”就像‘build/index.html’一样。因为我们向两个文件发送了相同的内容。为了解决这个问题，我们需要使用路由器，但首先，我们需要得到React设置。
在此之前，我们应该将路由移动到一个单独的文件中，以保持整洁。所以在'./data.js'。我们可以这样写:

module.exports = {
  routes: [
    '/',
    '/about'
  ]
}

Then we’ll require that data in `webpack.config.js` and remove our locals variable:

var data = require('./data.js');
Further down that file we’ll update our StaticSiteGeneratorPlugin:

plugins: [
  new ExtractTextPlugin('styles.css'),
  new StaticSiteGeneratorPlugin('main', data.routes, data),
]
```

# Installing React

```bash
We want to make lots of little bundles of HTML and CSS that we can then bundle into a template (like an About or Homepage). This can be done with react, and react-dom, which we’ll need to install:

npm i -D react react-dom babel-preset-react
Then we’ll need to update our `.babelrc` file:

{
  "presets": ["es2016", "react"]
}
Now in a new folder, `/src/templates`, we’ll need to make a `Main.js` file. This will be where all our markup resides and it’ll be where all the shared assets for our templates will live (like everything in the <head> and our site’s <footer>:

// main.js
import React from 'react'
import Head from '../components/Head'

export default class Main extends React.Component {
  render() {
    return (
      <html>
        <Head title='React and CSS Modules' />
        <body>
          {/* This is where our content for various pages will go */}
        </body>
      </html>
    )
  }
}


这里需要注意两件事:首先，如果您不熟悉响应使用的JSX语法，那么了解body元素中的文本是注释是很有帮助的。你可能也注意到了那个奇怪的<head>元素——这不是标准的HTML元素——它是一个React组件，我们在这里所做的是通过它的title属性向它传递数据。虽然，它不是一个attributes它在react世界中被称为props。
现在我们需要做一个src/components/Head.js的文件:

import React from 'react'

export default class Head extends React.Component {
  render() {
    return (
      <head>
        <title>{this.props.title}</title>
      </head>
    )
  }
}

我们可以把" Head "的代码都放进main.js. but it is helpfull如果我们想要一个页脚，那么我们会用“src/components/ footer”创建一个新的组件。然后导入到Main.js
现在,在'src/index.js'，我们可以用我们的新react代码替换一切:

// src/index.js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Main from './templates/Main.js'

module.exports = function render(locals, callback) {
  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(Main, locals))
  callback(null, '<!DOCTYPE html>' + html)
}

它所做的是从' Main.js '导入我们所有的标记。然后它会用React DOM渲染所有这些。如果我们再次运行npm start，并检查“build/index.html”。然后我们会发现React已经添加了我们的Main。js的React组件，以及Head组件，然后它将其全部呈现为静态标记。
但是这些内容仍然在我们的About页面和主页上生成。让我们用路由器来解决这个问题。
```
# Setting up our Router
```bash
我们需要将特定的代码传递到特定的路径:在About页面上，我们需要About页面的内容，类似地，在主页、博客或其他我们可能想要的页面上也是如此。换句话说，我们需要一些软件来指挥周围的内容:a router。为此，我们可以让react路由器为我们做所有繁重的工作。
在我们开始之前，值得注意的是，在本教程中，我们将使用React Router的2.0版本，与之前的版本相比，有很多变化。
首先，我们需要安装它，因为React路由器不附带react默认，所以我们必须跳到命令行:
```
```bash
npm i -D react-router
In the `/src` directory we can then make a `routes.js` file and add the following:

import React from 'react'
import {Route, Redirect} from 'react-router'
import Main from './templates/Main.js'
import Home from './templates/Home.js'
import About from './templates/About.js'

module.exports = (
  // Router code will go here
)
We want multiple pages: one for the homepage and another for the About page so we can quickly go ahead and make a `src/templates/About.js` file:

import React from 'react'

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About page</h1>
        <p>This is an about page</p>
      </div>
    )
  }
}
And a `src/templates/Home.js` file:

import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>This is a home page</p>
      </div>
    )
  }
}
Now we can return to `routes.js` and inside module.exports:

<Route component={Main}>
  <Route path='/' component={Home}/>
  <Route path='/about' component={About}/>
</Route>
```
```bash
我们的src/template/main.js的文件包含所有周围的标记(如&lt;head&gt;)。home.js和about.js的react组件可以被放置Main.js的body内。
接下来我们需要一个“src/router.js文件。这将有效地替换src/index.js。所以你可以继续并删除该文件，并写入以下router.js:

// router.js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import {Router, RouterContext, match, createMemoryHistory} from 'react-router'
import Routes from './routes'
import Main from './templates/Main'

module.exports = function(locals, callback){
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  return match({
    routes: Routes,
    location: location
  }, function(error, redirectLocation, renderProps) {
    var html = ReactDOMServer.renderToStaticMarkup(
      <RouterContext {...renderProps} />
    );
    return callback(null, html);
  })
}

如果你不熟悉这里的情况，那么最好看看Brad Westfall的intro to React Router。(https://css-tricks.com/learning-react-router/)
因为我们删除了index。我们需要返回webpack.config.js并修复entry的值:


module.exports = {
  entry: './src/router',
  // other stuff...
}
And finally we just need to head over to `src/templates/Main.js`:

export default class Main extends React.Component {
  render() {
    return (
      <html>
        <Head title='React and CSS Modules' />
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
}

{this.props.children}是放置其他模板中的所有代码的地方。所以现在我们可以再次npm start，我们应该看到两个文件正在生成:build/index.html和 build/about/index.html，每个都有各自的内容。
```

# Reimplementing CSS Modules
```bash
自从<button>是CSS的hello world，我们将创建一个按钮模块。尽管我将坚持使用Webpack的CSS加载器和我在上一教程中使用的东西，但还有其他选择。
这是我们在这个项目中想要的文件结构:
/components
  /Button
    Button.js
    styles.css

然后我们将把这个定制的React组件导入到我们的一个模板中。为此，我们可以继续创建一个新文件:' src/components/Button/Button.js ':

import React from 'react'
import btn from './styles.css'

export default class CoolButton extends React.Component {
  render() {
    return (
      <button className={btn.red}>{this.props.text}</button>
    )
  }
}

正如我们在之前的教程中学习的，{btn.red}在style.CSS中寻找，然后Webpack将生成我们的 gobbledygook CSS模块的类名。

现在我们可以在“src/components/Button/styles.css”中创建一些简单的样式:

.red {
  font-size: 25px;
  background-color: red;
  color: white;
}
And finally we can add that Button component to a template page, like `src/templates/Home.js`:

import React from 'react'
import CoolButton from '../components/Button/Button'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>This is a home page</p>
        <CoolButton text='A super cool button' />
      </div>
    )
  }
}

再来一个npm start，我们就搞定了!一个静态的react站点，我们可以快速添加新的模板，组件，我们有额外的好处的CSS模块，使我们的类现在看起来像这样:

您可以在react and css modules repo中找到上述演示的完整版本。如果您在上面的代码中注意到任何错误，那么一定要提交一个问题。

当然，我们有很多方法可以改进这个项目，比如我们可以将
Browsersync添加到我们的Webpack工作流程中，这样我们就不必一直安装npm。我们还可以添加Sass、PostCSS和一些加载器和插件来帮助解决这个问题，但是为了简洁起见，我决定暂时将它们排除在项目之外。
```

# Wrapping up
```bash
我们在这里完成了什么?好吧，虽然这看起来是一个可怕的工作，我们现在有一个模块化的环境来编写代码。我们可以添加尽可能多的组件，因为我们喜欢:

/components
  Head.js
  /Button
    Button.js
    styles.css
  /Input
    Input.js
    style.css
  /Title
    Title.js
    style.css

因此，如果我们在标题组件的样式中有一个.large类，那么它就不会与按钮组件的.large样式冲突。此外，我们仍然可以通过导入一个文件来使用全局样式，比如“src/globals”。或者简单地在头文件中添加一个单独的css文件。

通过一个静态网站的react我们已经失去了很多魔法属性,为我们提供了开箱即用的react,包括管理状态,但它仍有可能与这个系统提供两种类型的网站:你可以做一个静态网站上面我已经向你们展示,然后逐步加强与事后react超级大国的一切。

这个工作流是整洁的，但是在很多情况下，这种CSS模块、React和Webpack的组合是完全多余的。根据web项目的大小和范围，花时间实现这个解决方案将是近乎疯狂的——例如，如果它只是一个web页面的话。

然而，如果每天都有很多人将CSS贡献到代码库中，那么如果CSS模块能够防止由级联导致的任何错误，就会非常有帮助。但这可能会导致设计师接触代码库的机会减少，因为他们现在也必须学习如何编写Javascript。要使此方法正确工作，还需要支持许多依赖项。

这是否意味着我们在不久的将来都将使用CSS模块?我不这么认为，因为——和所有前端技术一样——解决方案取决于问题，而不是所有的问题都是一样的。
```
