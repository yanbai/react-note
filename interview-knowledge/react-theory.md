# life cycle
componentDidMount
componentDidUpdate
componentWillUnmount
getDerivedStateFromProps
  每次render都会调用
  场景：表单控件获取默认值
getSnamshotBeforeUpdate
  场景：获取render之前的dom(旧dom)
  getSnamshotBeforeUpdate() {
    return this.rootNode.scrollHeight
  }
shouldComponentUpdate
  check if the UI need tobe re-render
  一般可以由PureComponent自动实现
  场景：性能优化


## 生命周期
  constructor
  getDrivedStateFromProps()
  render()
  componentDidMount()

# React Interview Questions 2020 (7 Questions)
https://www.youtube.com/watch?v=JOa41r3Fr4s
undirectional data flow
props vs state
lift state up
controlled component vs uncontrolled component
refs: use ref to manipulate the DOM node: focus
importance of keys
context
HOC
render props
hooks
what hook can do 



5.
# React16的新特性、生命周期

# React组件之间如何通信
props, context, redux

# +React setState 异步更新
这是react的一种优化策略, 状态改变后不会马上更新，会延迟调用，不用频繁更新dom
theory:
if batch flag is true, put component in dirtyComponents, no update immediatelly
if batch flag is false, update immediatelly

https://juejin.im/post/6844903715921477640
https://juejin.im/post/6844903942539706375

class SomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick = async() => {
    this.increaseCount();
    this.increaseCount();
    await fetch();
    this.increaseCount();
    this.increaseCount();
    setTimeout(() => {
      console.log('count:', this.state.count);
    });
  }

  increaseCount = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1
    });
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}
# react如何进行性能优化
pureComponent
# react fiber 了解多少
# React DomDiff算法
https://zhuanlan.zhihu.com/p/20346379
# Element abcd 变为badc过程
https://zhuanlan.zhihu.com/p/20346379
# +React与Vue，各自做了些什么事情
toy-react
A jsx
1. parse jsx via createElement, 生成vdom
如何解析jsx，createElement具体做了什么
解析class，html tag， text， style， attribute， children 生成dom树
2. 生成vdom 给 reactDom.render(vdom, element)
(3. vdom里面有什么？mountTo render)

B 生命周期
1. mountTo(range) {
  this.range = range
  this.update()
}
update() {
  range = document.getRange()
  range.setStart()
  range.setEnd()
  range.insertNode()

  this.range.deleteContents()
  let vdom = this.render()
  vdom.mountTo(this.range)
}
note: range里面存的实dom，虚实dom比对靠这个
C 虚拟DOM
1. root改成vdom
2. mountTo的时候 做一个对比 看实dom和vdom是不是一致
note: mountTo和render

D diff算法
render的时候 会创建vdom，然后和之前的vdom做diff比对
不同类型root dom 销毁
同一类型root dom 仅仅更新attribute
children dom 更新,
  如果尾部新增，之前的children不用重新创建
  如果头部新增，所有children都重新创建
  就是只会child一一对比
keys提升diff性能
组件更新 递归执行render 不代表会卸载组件 有规则来决定差异



# browser process, vue process, react process
浏览器解析一个html大致分为五步：创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting

# router
https://mp.weixin.qq.com/s/h6rKfXINQKB0499ZK5beTQ
