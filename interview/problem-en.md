1. working achievement

gobear website
big project, 80% unit test code coverage, 6 countries, each country has several product such as personal loan, ..
each product has similar main flow, main flow is from landing page to result page then detail page, compare page,
then checkout flow, checkout flow including client flow or our own flow

the difficulty is the architect, we build a vue application, we have several pipe lines, each pipelin we build
country by country.
In every build pipeline, we use common-country hierarchy through webpack(补充配置)
The project structure is that we have a common folder, and then country folder. So if one country level component is exsited, we will import this component in build stage by webpack, if the country level component is not existed, we will import common component
we also apply this rule in other places like services store or assets


design pantry

A UI component library, can be used through npm, I build it from 0, including npm pipeline, storybook as play ground, storybook pipeline, and because we need to support SSR, also a SSR pipeline to test in SSR environment

the difficulty is that In our project, at first we only have one pipeline to output a whole javascript and css package, which means user can only globally register all the component at once no matter if they want them all or not. So we need to improve it

I use webpack to set up a multiple entry pipeline as step one, so we can output different bundlers, each component has one specific package

As before we said, now we can import on demand, if we want component_a, only require(‘xxx/xxx/component_a.js’). It is ugly
we use babel to transfer es6 grammer to commonjs grammer


another difficulty is that at the end of stage one, we find the package size is big(补充具体数据) do performance optimization，we tried different ways including using webpack config（补充具体配置），then we found we need manually added an individual entry for common css, because we use mutiple entry, so all the component are individual, no common entry, hard to split the common css


e-verification

getUserMedia to call the device camera, ssr Service(ssr 原理)

2. basic knowledge
# use html css, div vertically align center, text inside div vertically center, div height is equal to half of body width

horizontal center approaches:
justify-content
magin: 0 auto
position absolute, then left 50%, transition translatex

(补充flex几种概念)

# containing block
concept: padding box, content box
for calculate dom element postion and size when we use percentage
  position absolute element, the parent node use padding box

  position static relative element's containing block, its parent node is content box

# bfc and margin collapse

vertical direction, adjacent element margin will be collapsed


# vertical align

# requestAnimationFrame and setTimeout setInterval
requestAnimationFrame (补充定义)
setTimeout setInterval (补充定义)

# 判断if([] == false) {} , if({} == false) {} , if([]) {}

隐式类型转换 [] == false // true, {} == false // false, [1] == [1] // false, {} == {} // false

==的隐式转换
/*
不同类型需要转换
boolean转成number
string转成number
object转成原始值，可能先valueOf，再toString
*/

# event loop
宏任务（补充定义）
微任务（补充定义）
调用栈（补充定义）

# hoist

# this
this point to context, which object call this function
call bind apply

# closure
A closure is the combination of a function and the lexical environment within which that function was declared

