1. can you introduce yourself
Hi I am Yanbai Zhang from China, I am an Frontend engineer.
in university, my major is infomation and computing science
After graduated I was workign at a travel internet startups in china, mainly focus on mobile web application developing

Then I move to current company, this is a outsourcing company, mainly focus on client from europ
At begining in this company, I was responsible for a CMS developing, including an online style editor and then some other e-commerce project such as ink-online,
which is an angular js project, also a e-commerce platform sell ink and printer.

In the past two years Ive been serving for Gobear which is a singaporean economic platform,
gobear is a vue web application project with mobile and desktop version, deployed in 7 countries,
every country has 6 or 7 similar product, such as personal loan, different kinds of insurances

gobear is one of our client, my company's contract with gobear ends up at the end of last september,after gobear, I am responsible for a multiple platform project, which is an online education project， a chat system, 埋点
using uni-app

company also ask me to do research for an electron project, gm
electron project target is to automatically login a Tax website, help the enterprise to declare tax， include two parts:
one part is login, we need to recognize the verification code
another part is to fill in the form and then give a screen shot

how to recognize the verification code
Binarization
dirty point cleaning
Template library matching

electron: BrowserWindow
gm: threshold, colors


also I learn react and react native by my-self

<!-- My role is a lead engineer of a frontend team
in gobear, we have developer team based in singapore, vietnam and china. In china we around 30 developers
all the developers from different country were divided into more than ten small team, each team has 4-5 people, each team has their own focus -->

<!-- , but I consider myself as a normal developer
My mainly responsiblity is coding, -->
gobear is a vue web application project with mobile and desktop version, deployed in 7 countries,
every country has 6 or 7 similar product, such as personal loan, different kinds of insurances
my team focus on 3 parts: 1. building a Vue component library 2. help maintain the current gobear website
3.to implement a new online service which would privide personal identity verification

我叫张岩柏 目前在中国，担任前端开发已经差不多9年了。

刚毕业不久 我作为一个前端开发 为一个线上旅游平台工作

在现有的公司 我已经工作了将近五年了，这是一家外包公司
我起初负责一个CMS系统开发，然后参与了一些其他电商平台的开发，比如ink online，一个卖油墨打印机的线上平台
在过去的两年多的时间里，我为gobear 服务
gobear有中国和越南团队，大概有十几个小组 我们叫他scrum team，我在gobear的role是一个小组的LE，但是我自己认为我是一个senior developer
帮助gobear建立web端网上比价平台，以及vue 组件库的开发


2.1 更详细说下你的工作成就\
# vue 组件库
## nut shell
	• this is a CSS library + Vue UI component library，it is a npm package
  why we don't use current UI component, (we are inspired from element UI alot) since we develop UI library after the web application is stable, so if we develop based on current third-party library, there would be alot of problem when we do integrate
  and also we have some special user interact
## deploy plan
deployment plan, use CICD to automatically deploy, use CICD to do PR checking when create PR to check code coverage, 80%
Jest + TC + sonar cloud

## SSR ready
tech Solution
do research for one or two component, figure out some problem when implement SSR ready, like
1. how to check server env or client in component(compile or runtime?)
const isServer = Vue.prototype.$isServer
this.$isServer
2. use feature check
bodyEl: typeof document === 'undefined' || document.body
3. use life cycle
If (typeof window !== 'undefined')
mounted
created

setup an ssr env for
## Theamify
Solution
  sass themify mixin, themed function
  a. define global theme ns like: $theme-button: (dark: ())
  b. use @include themify($theme-button) { padding: themed('xxxx') }
  总结：themify生成 .dp-theme-dark { selector { padding: 'xxxx' }}
## better solution ? use context, create a ThemeProvider component, return <ThemeContext.Provider value={style}>{props.children}</ThemeContext.Provider>
### how to use
```js
<Provider theme={{theme: "dark", defaultFontSize: 18}}>
  <Text />
  <List />
</Provider>

<Consumer>
  {
    (themeStyle) => {
      return (
        <Text style={{fontSize: themeStyle.defaultFontSize}}>
          Text 组件
        </Text>
      )
    }
  }
</Consumer>
```
### priority: style > custom theme color > default theme color
```js
<Provider theme={{ defaultFontSize: "#666" }}><Provider>
<Provider style={{ backgroundColor: "#666" }}><Provider>
```
### generate style config in provider, get style config in consumer

```js
const ThemeProvider = (props) => {
  let style = getStyle(props.value)
  return <ThemeContext.Provider value={style}>{props.children}</ThemeContext.Provider>
}

class ThemeConsumer extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {
          style => {
            return this.props.children(style)
          }
        }
      </ThemeContext.Consumer>
    )
  }
}
```
### theme default usage
```js
const ThemeContext = React.createContext('light')
class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        )
    }
}
// 不用通过中间组件传递prop
function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    )
}

class ThemedButton extends React.Component {
    static contextType = ThemeContext
    render() {
        return <Button theme={this.contxt} />
    }
}

```

## Partly import
  Diffuculties
    register component globally performance issue
    register in two data structure:
	 a. {key: 'route-string'} for multiple entry
	 b. {key: require('route-string')} for global install
    import js and css is ugly, we need one line to import both

        if we want component_a, only require(‘xxx/xxx/component_a.js’). It is ugly
        What if we do like ‘import { a } from componentLibrary’, can we only import code about ‘a’? Answer is No, it will still import the whole component code. Because ‘componentLibrary’ still must have included all the code so that user can import whatever they want.

Solution for partly import
  create two data structure for multiple entry and global install
   a. {key: 'route-string'} for output
   b. {key: require('../src/components/' + components[key])} for global install
 use babel-plugin-component, to transfer
‘import { a, b, c } from componentLibrary’ to ‘a = require(“xx/xx/a”); b = require(“xx/xx/b”); c = require(“xx/xx/c”)’


# ssr
## ssr theory
vue-server-renderer, render the same components into HTML strings on the server, send them directly to the browser, and finally "hydrate" the static markup into a fully interactive app on the client

Better SEO, as the search engine crawlers will directly see the fully rendered page.
Server-rendered markup doesn't need to wait until all JavaScript has been downloaded and executed to be displayed, so your user will see a fully-rendered page sooner.

# vue application
fallback system:
for example, from component level, we have country level folder and common folder, when we import a specific component, we will find in country level folder at first, then common folder, this rule also happens in style and services, store


2.2. 之前遇到过什么问题
themify improvement ?
runtime env ?


2.3 after gobear and in free time
after gobear, I am responsible for a wechat programme using uni-app, a chat system, 埋点

company also ask me to do research for an electron project, gm
how to recognize the verification code

also I learn react and react native by my-self

3. some tech stack

## uni-app
two kind of render engin: webview(web) and weex(native)
webview(in Andoid SDK): It uses the WebKit rendering engine to display web pages embed in app
在Android手机中内置了一款高性能webkit内核浏览器，在SDK中封装为一个叫做WebView组件

nvue use weex

## weex
A framework for building Mobile cross-platform UI.
client use js Core/v8 to compile JS,
<!-- has a weex-framework to compile vue into DOM  -->
then use weex bridge to communicate with native render engin (callJS  callNative, can do two way communicate)
so it is not browser render, it is native render
Weex 渲染引擎与 DSL 语法层是分开的，Weex 并不强依赖任何特定的前端框架。


## electron will carry own v8 engin in package ?


## rn compile to native ios or android language ? fb
IOS: JSCore can run js
Android: jsc.so

## code split?
optimization.splitChunks

4. how to study
从知识架构上分, css（一二代布局，难点概念，原生使用，框架研究） js（难点概念，原生使用，框架研究）
从tech stack上分, vue react rn uniapp electron webpack

根绝重点看，比如某个技术站点里面搜所有组件开发的文章

开发先处理核心功能，比如做主题化，我会先不处理 强制模式 暴露样式表
学习也一样 先学main flow，这样代码比较少

平常会根据这个体系来看，并且在实际项目中应用









tips:
working history
make your mini-stories achievement-oriented
tell the employer what you know about this role
  I understand that for this position you are hiring for, you are lookign for someone with...
tell teh employer why you are the right fit for what they need
  ... overall due to my strong background and achievements in
  successfully identifying gaps and creating efficiencies, I am
  confident I will be able to succeed in this role you are hiring for

2. 目前中国疫情如何
The conona virus is servere at January and Feburary
but now the scenario became better and better, I mean like the normal days, schools open, super mall open, but we still wear mask on street
一月份 二月份非常严重，现在基本恢复正常，学校 商店。不过我们还是带着口罩上街。

2. what is your role in Gobear, can you introduce your project

When I was at gobear, I am an LE of a frontend team, in the team we have 5 people. I see my self just as a senior developer
I am responsible for the vue UI component develop
when gobear start to spread micro service, I am responsible for an SSR service which provide online Identity verify

My main working scope is coding, coding for individual ticket. When we have difficult tech issues in grooming meeting or planning meeting,
I will do research for the difficulty before sprints start.

我在gobear是其中一个前端团队的LE，一个团队大概有4-5人
我在刚刚进入gobear的时候， lead vue组件库的开发，
后来 gobear 推广微服务架构，我负责其中一个ssr 微服务，该微服务负责线上校验贷款申请者身份真实性
平常的工作范围包括 coding, code review（斟酌一下要不要说），scrum planning meeting的时候 负责排查疑难杂症。

4. 为什么想离开中国 (to sg)
拥抱多元文化的工作环境 diversified culture, muliple culture working environment


5. 为什么想离开现在的公司
6. why you want to join Ninja

I search for new opportun in linkin, and I searched Ninja
I know ninja is a express delivery company， providing service across southeast asia, among 6 countries
and it begins at 2014, now grows very fast
China delivery and courior, logistic also grows very fast, many big companies, so I see a big potential in this field

Now I see myself as a senior developer, I have my career plan, my next step, I wanna make an achievement in some technic field
Ninja van grows fast and very young, the tech stack is suitable, can provide the platform for me to achive my next step in career

And according to my last two years working experience in Gobear, I am confident to work in SG

我知道 Ninja是一个express delivery company， providing service across southeast asia
Ninja Van 建立于2014年，发展的很快。

其实中国的快递行业也发展得非常快, market competition is very intense, 但是也证明了这个行业很有前景，
所以会有那么多公司做这行。

我目前的职业阶段，
接下来的职业规划

NV很多人使用 我可以在RN实现自己下一阶段的职业目标，RN 比较新，技术栈也会比较新

根据我前两年和gobear合作经验 我也对自己在新加坡工作有信心

7. have any questions about ninja?
4.1 how many people are there in Ninja Van technic department now?
4.2 how is the visa policy in SG now? Could you please introduce the process of applying for visa? What kind of visa I can apply for
4.3 how many rounds of interview in Ninja van

ninja van技术部门有多少人，人员架构是怎么划分的
前端部门的工作范围有哪些

如果应聘成功 签证办理现在政策如何
