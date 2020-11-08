# What are CSS Modules and why do we need them?
https://css-tricks.com/css-modules-part-1-need/
Author
Robin Rendle
Last Updated
Mar 13, 2017

Article Series:
What are CSS Modules and why do we need them? (You are here!)
https://css-tricks.com/css-modules-part-1-need/
Getting Started with CSS Modules
https://css-tricks.com/css-modules-part-2-getting-started/
React + CSS Modules = 😍
https://css-tricks.com/css-modules-part-3-react/

```bash
我最近对CSS模块很感兴趣。如果你还没有听说过他们，这篇文章就是为你准备的。我们会看一下这个项目以及它的目标和目的。如果你感兴趣，请继续关注，下一篇文章将介绍如何开始使用这个想法。如果您希望实现或提高使用级别，第3部分将介绍如何在React环境中使用它们。
```
# What are CSS Modules?

```bash
根据repo(https://github.com/css-modules/css-modules), CSS模块有:
默认情况下，所有类名和动画名都在本地作用域内的CSS文件。
CSS files in which all class names and animation names are scoped locally by default.

所以CSS模块不是一个官方的规范，也不是浏览器中的一个实现，而是一个构建步骤中的过程(在Webpack或Browserify的帮助下)，它会改变类名和选择器的作用域(比如类似命名空间)。
这是什么样子的，为什么要这样做?我们马上就会讲到。首先，记住HTML和CSS通常是如何工作的。一个类是应用在HTML:
```
```bash
<h1 class="title">An example heading</h1>
And that class is styled in CSS:

.title {
  background-color: red;
}
```
```bash
只要CSS应用到HTML文档，该<h1>的背景将是红色的。我们不需要处理CSS或HTML。浏览器可以理解这两种文件格式。
CSS模块采用了不同的方法。我们需要在一个JavaScript文件中编写所有的标记，比如index.js，而不是编写普通的HTML。下面是一个例子(我们稍后会看一个更现实的例子):
```
```bash
import styles from "./styles.css";

element.innerHTML =
  `<h1 class="${styles.title}">
     An example heading
   </h1>`;
```
```bash
在构建步骤中，编译器将搜索我们导入的styles.css文件，然后查看我们编写的JavaScript，并通过styles.title访问.title类。然后，我们的构建步骤将把这些东西处理成新的、单独的HTML和CSS文件，用一个新的字符串替换HTML类和CSS选择器类。
我们生成的HTML可能看起来像这样:
```

```bash
<h1 class="_styles__title_309571057">
  An example heading
</h1>

._styles__title_309571057 {
  background-color: red;
}

[filename]\_[classname]\_\_[hash]
```

```bash
class属性和选择器。title完全消失了，取而代之的是这个全新的字符串;我们最初的CSS根本没有被提供给浏览器。
正如雨果·吉劳德尔在他的课程中所说:
[类]是动态生成的，唯一的，并映射到正确的样式。
这就是限定样式范围的意思。它们适用于特定的模板。如果我们有一个buttones .css文件，我们将只导入到buttones .js模板中，而其中的。btn类将无法被其他模板(例如forms.js)访问，除非我们也特别导入它。
为什么我们要乱用CSS和HTML来做这个呢?我们究竟为什么要这样工作呢?

```
# Why should we use CSS Modules?
```bash
有了CSS模块，它是一个保证，所有的样式为一个单一的组件:
住在一个地方
只适用于该组件，而不适用于其他组件
另外，任何组件都可以有一个真正的依赖，比如:
```

```bash
import buttons from "./buttons.css";
import padding from "./padding.css";

element.innerHTML = `<div class="${buttons.red} ${padding.large}">`;
```

```bash
这种方法旨在解决CSS中的全局作用域问题。
您是否曾经被时间或资源的缺乏所诱惑，只是简单地尽快编写CSS，而没有考虑您可能会影响什么?
您是否曾经在样式表的底部添加一些随机的碎片和垃圾，想要抽出时间来组织它，但从来没有这样做过?
你是否遇到过你不能完全确定它们做了什么或者它们是否被使用的样式?
你有没有想过可以在不破坏某些东西的情况下摆脱一些风格?想知道这些风格是独立的还是依赖于其他东西?或者是其他地方的过度风格?
这些问题可能会让你头疼，让你的项目期限变得臃肿，让你愁眉苦脸地望着窗外。
使用CSS模块和默认的局部范围概念，可以避免这个问题。当你写风格的时候，你总是不得不考虑后果。
例如，如果在HTML中使用random-gross-class而没有将其应用为CSS模块样式类，则不会应用该样式，因为CSS选择器将转换为._style_random-gross-class_0038089。
```

# The `composes` keyword

```bash
假设我们有一个名为type.css的模块用于文本样式。在该文件中，我们可能有以下内容:
type.css
.serif-font {
  font-family: Georgia, serif;
}

.display {
  composes: serif-font;
  font-size: 30px;
  line-height: 35px;
}

html:
import type from "./type.css";

element.innerHTML =
  `<h1 class="${type.display}">
    This is a heading
  </h1>`;
```

```bash
最终的markup是
<h1 class="_type__display_0980340 _type__serif_404840">
  Heading title
</h1>
```

```bash
两个类都通过使用composes关键字绑定到元素，从而避免了类似解决方案的一些问题，比如Sass的@extend。
我们甚至可以compose一个特定的类在一个单独的CSS文件:
.element {
  composes: dark-red from "./colors.css";
  font-size: 30px;
  line-height: 1.2;
}
```

# BEM not required
```bash
我们在创建CSS模块时不需要使用BEM。这有两个原因:

1.简单的解析--type.display对于开发人员来说就像BEM-y .font-size__serif--large一样清晰。当BEM选择器变长时，可能更容易在心理上解析。
2.局部作用域--假设我们在一个模块中有一个像.big这样的类，它可以更改字体大小。在另一个例子中，我们使用完全相同的类。big，它以不同的数量增加padding和font-size。这根本不重要!它们不会冲突，因为样式的范围是非常刻意的。即使一个模块导入了两个样式表，它也有一个定制的名称，这个名称是我们的构建过程专门为该类定制的。
换句话说，CSS模块的特性问题消失了。

酷,不是吗?
这只是编写CSS模块的一些好处。
如果您有兴趣了解更多，Glen Madden(https://glenmaddern.com/articles/css-modules)已经写了大量关于这种方法的其他好处的文章。
本系列的下一篇文章将介绍如何使用Webpack和CSS模块启动并运行一个项目。我们将使用最新的ES2015特性来完成这项工作，并查看一些示例代码来指导我们完成整个过程。
```
