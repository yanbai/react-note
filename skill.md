# in JSX
```bash
let Button = props => {
  const {type, ...other} = props
  const className = type==='primary' ? 'primary-button' : 'secondary-button'
  return <button className={className} {...other} />
}
```

# bind this
## options 1 在 constructor 中绑定方法。
```bash
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```
## options 2 createReactClass
如果使用 createReactClass() 方法创建组件，组件中的方法会自动绑定至实例，所以不需要像上面那样做：

## options 3 babel-plugin-transform-class-properties
https://babeljs.io/docs/en/babel-plugin-transform-class-properties/

那么可以尝试使用目前还处于试验性阶段的 Babel 插件 Class Properties。
babel-plugin-transform-class-properties
语法随时可能改变 不建议用
```bash
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // 警告：这种语法还处于试验性阶段！
  // 在这里使用箭头函数就可以把方法绑定给实例：
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```
# 箭头函数
```bash
render() {
  return (
    <button onClick={(e) => this.handleClick(e)}>
      Say hello
    </button>
  );
}
```
