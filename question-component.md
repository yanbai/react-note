# button
1. primary and ghost
2. how to write dynamic className
```bash
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
```bash
let Button = props => {
  const {type, ...other} = props
  const className = type==='primary' ? 'primary-button' : 'secondary-button'
  return <button className={className} {...other} />
}
```
3. icon font practise
https://fontawesome.com/

https://medium.com/@kevinyckim33/copy-and-paste-these-lines-of-code-to-get-sass-and-fontawesome-up-and-running-on-your-create-react-95e6c626e73b#:~:text=Go%20to%20the%20index.,%2Fcss%2Ffont%2Dawesome.

https://stackoverflow.com/questions/41676054/how-to-add-fonts-to-create-react-app-based-projects

https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css

# checkbox
1. why id is required

```bash
error scenario: if resolve.module and resolve.alias is not defined

ERROR in ./src/common.js
Module not found: Error: Can't resolve 'assets/style/entry' in 'C:\work\workspace_2020\zen-design-react\src'
resolve 'assets/style/entry' in 'C:\work\workspace_2020\zen-design-react\src'
  Parsed request is a module
  using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./src)
    Field 'browser' doesn't contain a valid alias configuration
    resolve as module
      C:\work\workspace_2020\zen-design-react\src\node_modules doesn't exist or is not a directory
      C:\work\workspace_2020\node_modules doesn't exist or is not a directory
      C:\work\node_modules doesn't exist or is not a directory
      C:\node_modules doesn't exist or is not a directory
      looking for modules in C:\work\workspace_2020\zen-design-react\node_modules
        using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./node_modules)
          Field 'browser' doesn't contain a valid alias configuration
          using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./node_modules/assets/style/entry)
            no extension
              Field 'browser' doesn't contain a valid alias configuration
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry doesn't exist
            .wasm
              Field 'browser' doesn't contain a valid alias configuration
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.wasm doesn't exist
            .mjs
              Field 'browser' doesn't contain a valid alias configuration
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.mjs doesn't exist
            .js
              Field 'browser' doesn't contain a valid alias configuration
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.js doesn't exist
            .json
              Field 'browser' doesn't contain a valid alias configuration
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.json doesn't exist
            as directory
              C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry doesn't exist
[C:\work\workspace_2020\zen-design-react\src\node_modules]
[C:\work\workspace_2020\node_modules]
[C:\work\node_modules]
[C:\node_modules]
[C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry]
[C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.wasm]
[C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.mjs]
[C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.js]
[C:\work\workspace_2020\zen-design-react\node_modules\assets\style\entry.json]

```

```bash
error scenario: if resolve.module is not defined, resolve.alias is defined

ERROR in ./src/common.js
Module not found: Error: Can't resolve 'assets/style/entry' in 'C:\work\workspace_2020\zen-design-react\src'
resolve 'assets/style/entry' in 'C:\work\workspace_2020\zen-design-react\src'
  Parsed request is a module
  using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./src)
    aliased with mapping 'assets': 'C:\work\workspace_2020\zen-design-react\src\assets' to 'C:\work\workspace_2020\zen-design-react\src\assets/style/entry'
      using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./src)
        Field 'browser' doesn't contain a valid alias configuration
        using description file: C:\work\workspace_2020\zen-design-react\package.json (relative path: ./src/assets/style/entry)
          no extension
            Field 'browser' doesn't contain a valid alias configuration
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry doesn't exist
          .wasm
            Field 'browser' doesn't contain a valid alias configuration
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry.wasm doesn't exist
          .mjs
            Field 'browser' doesn't contain a valid alias configuration
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry.mjs doesn't exist
          .js
            Field 'browser' doesn't contain a valid alias configuration
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry.js doesn't exist
          .json
            Field 'browser' doesn't contain a valid alias configuration
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry.json doesn't exist
          as directory
            C:\work\workspace_2020\zen-design-react\src\assets\style\entry doesn't exist
[C:\work\workspace_2020\zen-design-react\src\assets\style\entry]
[C:\work\workspace_2020\zen-design-react\src\assets\style\entry.wasm]
[C:\work\workspace_2020\zen-design-react\src\assets\style\entry.mjs]
[C:\work\workspace_2020\zen-design-react\src\assets\style\entry.js]
[C:\work\workspace_2020\zen-design-react\src\assets\style\entry.json]

```

# collapse
1. 如何传入expanded状态 同时又保证内部state正常

# icon
1. pass classname to container
```bash

function Icon(props) {
  let { name, ...other } = props
  let propsClass = ''
  if ('className' in other) {
    propsClass = other.className
    delete other.className
  }
  return (
    <i className={'fas fa-' + name + ' ' + propsClass} {...other}></i>
  )
}
```

2. how about use npm package to import fontawsome

# select
1. log rocket blog思路 Dogacan Bilgili
https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1/
## 视觉分析组件, 确定HTML

## 实现样式

## functional or class
1. differs
functional fast
class support state and lifecycle hook

2. change parent component props from child component
we will also be using functions as props in order to control the parent state

## 确定state props
1. 确定完了之后写出接口
比如props有title list
state有listOpen和headerTitle
```bash
<Dropdown
  title="Select location"
  list={this.state.location}
/>

constructor(props){
  super(props)
  this.state = {
    listOpen: false,
    headerTitle: this.props.title
  }
}
```

## 实现交互
handleClickOutside
  https://github.com/Pomax/react-onclickoutside
toggleList
## change parent component props in user interaction
selected 是由外围传进来(by passing item list)
交互改变的时候，要改 selected
```bash
<Dropdown
  title="Select location"
  list={this.state.location}
  toggleItem={this.toggleSelected}
/>
```
```bash
<li className="dd-list-item" key={item.title} onClick={() => toggleItem(item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
```
## 监听props, 改变组件状态
```md
static getDerivedStateFromProps(nextProps, prevState)
(componentWillReceiveProps)
```
```bash
static getDerivedStateFromProps(nextProps){
    const count = nextProps.list.filter(function(a) { return a.selected; }).length;
    console.log(count)

if(count === 0){
      return {headerTitle: nextProps.title}
    }
    else if(count === 1){
      return {headerTitle: `${count}`}
    }
    else if(count > 1){
      return {headerTitle: `${count}`}
    }
  }
```
## 和组件无关 介绍一下log rocket
```md
https://www2.logrocket.com/react-performance-monitoring
logRocket 就像app的录像，纪录app发生的一切，用来做性能分析（cpu负载，内存使用）
logRocket 用来做用户体验问题排查
logRocket redux 中间件显示所有redux状态和action

2. cherry pick lodash? treeshaking lodash?
```

## cherry pick
```md
https://lodash.com/
https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark
```
## treeshaking lodash
```md
https://www.cnblogs.com/binglove/p/11082146.html

3. cherry pick zendesign? treeshaking zendesign?
https://www.cnblogs.com/fundebug/archive/2018/08/15/reduce_js_payload_with_tree_shaking.html
```
# autocomplete
## 计算属性
```md
https://daveceddia.com/computed-properties-in-react/

React没有“计算属性”，但是您可以通过函数实现相同的效果
如果计算又短又快，请在render（或直接在功能组件中）进行计算
如果计算复杂但难以读取或需要重用，请将其提取到函数中。
如果计算运行昂贵，请考虑将其记忆化。
```
## chain call

# themify

https://medium.com/@dmitriy.borodiy/easy-color-theming-with-scss-bc38fd5734d1
