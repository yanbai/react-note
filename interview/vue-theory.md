vue
1. 有个双向绑定
2. 有个compiler（sfc?）

设计理念
vue有点像dom 操作，dom api,有属性相关 有联动
react 有点像innerHTML


# dependcy collect
## will collect dependency in get
```js
const dep = new Dep()
...
dep.depend()
```
## Dep
src/core/observer/dep.js

```js
class Dep{
  static target
}
```
Dep.target is the current watcher need to be collected

```js
dep.depend
depend () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}
```
collect current global watcher into this dep list
every state getter method has a dep, when this state getter is emit, it will fire dep.depend()

### wathcher.addDep(dep)
will add watcher into argument dep list
arugument dep will subscribe to this watcher

### watcher.deps watcher.depIds watcher.newDeps watcher.newDepIds
used in cleanupDeps

### computedWatcher.dep


# when to do dependency collection
存疑?
当render函数(createElement) 读取状态的时候 触发state的get
在beforeMount和mounted之间?

# distrubute update in setter
dep.notify
in src/core/observer/dep.js
```js
class Dep {
  // ...
  notify () {
  // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

## 如果是computed watcher的话
this.dep.notify()
computedWatcher 也有dep

## 一般watcher
queueWatcher


# 计算属性
computed 原理
新：
computed的 dep 里面有 组件watcher，computed改变 通知 组件 render（createElement）
computed 本身有 dirty， 执行 createElemnt 时候，如果dirty为 false，不用重新求值

## computed property getter
```js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      watcher.depend()
      return watcher.evaluate()
    }
  }
}
```
when computed watcher getter is trigger(for example, when render function access this.fullname)
it will trigger watcher.depend() and return watcher.evaluate()

computedWatcher.depend() is for render watcher subscribe to computed watcher change (this time, Dep.target is a render watcher, this.dep.depend is equal to
render watcher subscribe this computed watcher)

in watcher.evaluate: if dirty is true, then calculate (exec computed property getter, for example return this.firstname + this.lastname), check dirty property, only calculate when dirty is true


这里有一段不是很懂 可以先忽略
这里需要特别注意的是，由于 this.firstName 和 this.lastName 都是响应式对象，这里会触发它们的 getter，根据我们之前的分析，它们会把自身持有的 dep 添加到当前正在计算的 watcher 中，这个时候 Dep.target 就是这个 computed watcher
get
for example
return this.firstName + this.lastName

at this time, it will trigger these state getter, 会把自身持有的dep添加到
当前watcher中，这时Dep.target就是computed watcher


## when computed property dependency change
state change -> watcher.update()
in computed watcher:
```js
this.getAndInvoke(() => {
  this.dep.notify()
})
```
when the computed property change, then trigger this.dep.notify

in computed watcher, dep is including render watcher

## computed 惰性求值
state change -> watcher.update()
in computed watcher:
```js
// A computed property watcher has two modes: lazy and activated.
// It initializes as lazy by default, and only becomes activated when
// it is depended on by at least one subscriber, which is typically
// another computed property or a component's render function.
if (this.dep.subs.length === 0) {
  // In lazy mode, we don't want to perform computations until necessary,
  // so we simply mark the watcher as dirty. The actual computation is
  // performed just-in-time in this.evaluate() when the computed property
  // is accessed.
  this.dirty = true
} else {
  // In activated mode, we want to proactively perform the computation
  // but only notify our subscribers when the value has indeed changed.
  this.getAndInvoke(() => {
    this.dep.notify()
  })
}
```
如果 this.dep.subs.length === 0 成立，则说明没有人去订阅这个 computed watcher 的变化，仅仅把 this.dirty = true，只有当下次再访问这个计算属性的时候才会重新求值。
另一种情况，渲染 watcher 订阅了这个 computed watcher 的变化，那么它会执行getAndInvoke
# watcher

# life cycle
src/core/instance/init.js:

new vue

init event, life cycle

beforecreated

init state

create

compile template -> createElement

beforemounted

patch + render vdom
https://github.com/snabbdom/snabbdom
mounted

## init state flow
init props
init methods
init data
init computed
init watch

# template 解析
这块需要compiler
template -> AST -> createElement(渲染函数)
how?


# vue如何监听一个不会触发render的数据
watch?
forceupdate?
__ob__.dep.notify() ?


# vue diff
will use diff to improve the compare performance, reduce dom change
will have some principles:
1. compare in same hiracky
2. compare same key
3. compare same type same tag or same component


# vs v3

# vue bug
1. runtime beforemount 已经有el了

2. 响应式在mounted之前到底有没有用？
