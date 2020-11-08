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
## 箭头函数
```bash
render() {
  return (
    <button onClick={(e) => this.handleClick(e)}>
      Say hello
    </button>
  );
}
```

# reuse - composition(slot)
not recommend creating component inheritance hierarchies
only use composition(slot): components may accept arbitrary props, including primitive values, React elements, or functions

## container type: dialog / sidebar
```bash
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

## special cases: WelcomeDialog from Dialog, SignUpDialog from Dialog
In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props:

```bash
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

```bash
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```
## reuse non-UI functionality
extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class.
without extending it.


# classnames

```bash

const classes = classnames({
  'class-name-1': state_1,
  'class-name-2': true,
  'class-name-3': state_3,
})

<div className={ classes }>
```

# ...others
```bash
const {
  label,
  id,
  checked,
  handleChanged,
  ...others
} = this.props

<div { ...others }>
```

```bash
// className can be replaced by "classnames" npm package
let Button = props => {
  const {type, ...other} = props
  const className = type==='primary' ? 'primary-button' : 'secondary-button'
  return <button className={className} {...other} />
}
```

# merge config
```bash
const path = require('path');

const custom = require('../webpack.config.js');

module.exports = {
  webpackFinal: (config) => {
    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
};
```

# config Array item

```bash
let arr = [
  state_1 && { ...options_1 },
  state_2 && { ...options_2 },
  { ...staticOptions_3 }
].filter(Boolean)

```
