vue
1. 有个双向绑定
2. 有个compiler（sfc?）

设计理念
vue有点像dom 操作，dom api,有属性相关 有联动
react 有点像innerHTML

# 总体梳理，何时getter，何时setter, getter是执行dep.depend, setter是执行dep.notify

# 当状态改变时, 比如first name(dependency property)改变，影响 1. full name(computed property)， 2. full name的界面和 3. first name自己的界面，发生了什么

first name有一个dep list，dep list里面有两个watcher，
1. 一个是组件watcher负责更新first name自己的界面
## 一般watcher
queueWatcher或者叫做 组件watcher

2. 一个是computed watcher，可以理解为full name，computed watcher有自己的dep list，里面有full name的组件watcher
## 如果是computed watcher的话，computed watcher就是computed property
this.dep.notify()
computedWatcher 也有dep

3. 总结计算属性 原理
新：
computed property 的 dep 里面有 组件watcher，computed改变 通知 组件 render（createElement）
computed property 本身有 dirty， 执行 createElemnt 时候，如果dirty为 false，不用重新求值

4. computed property 惰性求值, 如果computed property 的dep里面没有component render function or computed watcher，代表没有人订阅他， 不会触发getAndInvoke，也不会去更新dom


# 比较简答的一般property getter, dep.depend

## status getter
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

## dep.depend
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

收集当前全局watcher到dep list，每个状态都有一个dep，当状态getter触发，会触发dep.depend
dep.depend实际上是把当前全局watcher添加到dep list

## wathcher.addDep(dep)
will add watcher into argument dep list
arugument dep will subscribe to this watcher

把watcher加入到参数的dep list里面，参数的dep会订阅这个watcher



# 比较复杂的computed property getter， 这里有比较绕 可以先忽略
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
这里需要特别注意的是，由于 this.firstName 和 this.lastName 都是响应式对象，这里会触发它们的 getter，根据我们之前的分析，它们会把自身持有的 dep 订阅当前正在计算的 watcher 中，这个时候 Dep.target 就是这个 computed watcher(wathcher.addDep(dep)/Dep.target.addDep(this))

get
for example
return this.firstName + this.lastName

at this time, it will trigger these state getter, 会把自身持有的dep订阅当前watcher中，这时Dep.target就是computed watcher(wathcher.addDep(dep)/Dep.target.addDep(this))


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



# vue如何监听一个不会触发render的数据
watch?
forceupdate?
__ob__.dep.notify() ?

# vs v3

# when to do dependency collection
存疑?
猜想一：当render函数(createElement) 读取状态的时候 触发state的get
在beforeMount和mounted之间?
有证据显示，在执行渲染函数的时候，会触发getter

猜想二：感觉答案是在init的时候收集（执行状态的getter）
在挂载，状态改变的时候触发状态的setter

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
