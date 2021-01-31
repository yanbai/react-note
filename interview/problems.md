1. 基础
# 1e-323
最小的科学技术法就是这个数，后面就是0，参考ie754

# 利用html css 编写样式，div垂直body居中、div内的text垂直居中，div高度等于body宽度的一半
justify-content: main-axis 上剩余空间的分配(可用来水平居中)
align-content: cross-axis 上剩余空间的分配
align items: 垂直轴上的对其方式 (上对齐 or 下对齐)
flex-basis 用在flex item上面，定义基准宽度
flex grow
flex shrink
align self: 重写align items
flex 包括 flex-grow, flex-shrink, flex-basis

# 谈一谈 containing block
https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block
作用：用来计算元素size position，主要有percentage value, 绝对定位时offset properties
两种可能：
  1. 绝对定位元素的containing block，是父节点的padding box, 该父节点非static定位，或者有transform will-change contain filter等属性
  2. static relative sticky元素的containing block, 是父节点的content box, 该父节点或者是 block container，或者建立了fc
# bfc和margin塌陷
块级格式化上下文，要先弄清楚block container和block level box，
A:
block container：block inline-block table-cell
block level box：block flex table grid
B:
1.block containers 中除去block，和2.block的overflow不是visible的元素 3. 浮动，绝对定位元素 会产生bfc
C:
垂直排版中相邻的 block-level box 和 父子 block-level box 会有边距折叠
D:
bfc和其他盒模型不会有边距折叠（似乎block overflow hidden和table-cell不生效）
D:
block-level box内部如果有bfc 则不会折叠（似乎block overflow hidden和table-cell不生效）
E: border也不会边距折叠

# vertical align

# requestAnimationFrame 和setTimeout 、setInterval的关系
requestAnimationFrame 定义下一次浏览器重绘之前更新动画帧所调用的函数,大约16ms执行一次
setTimeout setInterval 会生成一个宏任务

# transform transition与animation
# export import做了什么 environment

# 判断if([] == false) {} , if({} == false) {} , if([]) {}

# 隐式类型转换 [] == false // true, {} == false // false, [1] == [1] // false, {} == {} // false
+1
# 数据类型转换的原理
+1
# js基础类型
==的隐式转换
/*
不同类型需要转换
boolean转成number
string转成number
object转成原始值，可能先valueOf，再toString
*/

# EventLoop
+1
# 利用宏任务，微任务的知识点判断程序输出
+1 +1
当前在调用栈(call stack)内的所有函数会被执行
当调用栈是空的时，所有排队的微任务会一个接一个从微任务任务队列中弹出进入调用栈中，然后在调用栈中被执行（promise中then方法）
如果调用栈和微任务队列都是空的，事件循环会检查宏任务队列里是否还有任务。任务会从宏任务队列中弹出进入调用栈，被执行后会从调用栈中弹出
```js
0. winter example
new Promise(resolve => resolve()).then(() => this.a=3)
setTimeout(function() {
  console.log(this.a)
})
1.
new Promise(resolve => resolve()).then(() => console.log('1'))
setTimeout(()=>{
  console.log(2)
}, 0)
console.log(3)
// 312

2.
new Promise(resolve => resolve()).then(() => console.log('1'))
setTimeout(()=>{
  console.log(2)
  new Promise(resolve => resolve()).then(() => console.log('3'))
}, 0)
console.log(4)
// 4123

3.
async function foo() {
  console.log('-1')
}
new Promise(resolve => (console.log('0'), resolve())).then(() => console.log('1'))
setTimeout(()=>{
  console.log(2)
  new Promise(resolve => resolve()).then(() => console.log('3'))
}, 0)
console.log(4)
console.log(5)
foo()
//045-1 1
//23

3.
async function foo() {
  console.log('-2')
  await new Promist(res => res())
  console.log('-1')
}
new Promise(resolve => (console.log('0'), resolve())).then(() => console.log('1'))
setTimeout(()=>{
  console.log(2)
  new Promise(resolve => resolve()).then(() => console.log('3'))
}, 0)
console.log(4)
console.log(5)
foo()
//045-2 1 -1
//23
```

# 又是一道考异步执行顺序的题，需要了解 Node 的 nexttick 以及事件循环每个 stage 做了啥。比如 poll 阶段， timer阶段， check阶段之间的差异，有点难，最后还是错了一点
process.nextTick 是 Nodejs 的 API，比 Promise 更早执行。

事实上，process.nextTick 是不会进入异步队列的，而是直接在主线程队列尾强插一个任务，虽然不会阻塞主线程，但是会阻塞异步任务的执行，如果有嵌套的 process.nextTick，那异步任务就永远没机会被执行到了。

# +变量提升
+1 +1
var name = 'B';
function name() {}
function log() {
 console.log(name);
 // let name = 'A';
}
log();
/*
变量提升，声明但不赋值
函数提升，声明且赋值，优先级比变量高
在函数中使用let或const声明变量，如声明前使用，会报变量not defind，暂时性锁区
*/
# +this指向
+1
+1
window.name = 'ByteDance';
function A () {
 this.name = 123;
}
A.prototype.getA = function(){
 console.log(this);
 return this.name + 1;
}
let a = new A();
let funcA = a.getA;
funcA(); // 'ByteDance1'
/*
funcA只是一个引用，按照默认的情况，getA中的this指向的是window，this.name的值是ByteDance
如果直接a.getA()的话，this指向是a实例，this.name值为123
*/
# +闭包
+1
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
定义
A closure is the combination of a function and the lexical environment within which that function was declared


# H5的新特性，语义化
# ecma 新特性
# BOM与DOM，及BOM相关的一些属性
# 设计一个Select组件，API有哪些
# input属性相关，以及怎样做的文件上传



2. 新特性
# 函数式编程
# fetch
https://www.jianshu.com/p/b8030145a29e
# Web Workers API
https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API

# node child_process 模块 父子进程通信机制

# web worker，web storage，怎样验证本地数据的有效性

3.
# api example
https://api.nuxtjs.dev/posts
https://ssr-mock.getsandbox.com/sg/apis/jsonapi/taxonomy_term/menu?include=field_dp_menu_items&filter[parents-filter][condition][path]=field_dp_menu_parent.id&filter[parents-filter][condition][operator]=IN&sort=field_dp_menu_weight&&
# function request(urls, maxNumber, callback) 要求编写函数实现，根据urls数组内的url地址进行并发网络请求，最大并发数maxNumber,当所有请求完毕后调用callback函数(已知请求网络的方法可以使用fetch api)
# 编程，5个feach请求，请求完成后要求立即执行，但最终的输出顺序要按照要求输出ABCDE（思路是：将每个feach的回调通过a/a的方式输出，但最后没有run出来）
# 实现柯里化方法
+1
function curry(fn) {
 var limit = fn.length
 return function currying (...args) {
  if (args.length >= limit) {
   return fn.apply(null, args)
  } else {
   return function(...args2) {
    return currying.apply(null, args.concat(args2))
   }
  }
 }
}
# sum(100, 200)(300)(...)...(...)() curring化实现
# 实现flatten方法
+1
# trottle函数实现（ok， 可以用任务队列也可以只维护一个function， 我用的队列）
+1
防抖和节流
# +bind函数实现
+1
# 双向绑定怎么实现
# 设计模式：发布订阅、观察者
+1 编程题：实现一个简单的 EventEmitter，然后基于此聊了一会
# 简单介绍一下 body-parser 的作用和原理（没答好）
https://segmentfault.com/a/1190000016707134

body-parser 是一个解析请求体的第三方包
1. data是流（二进制数组）
req.on('data', data => arr.push(data))
    req.on('end', () => { let result = Buffer.concat(arr).toString() })
2. 针对content-type做处理 比如urlecoded和json两种
# 写一个response body parser
# 基于 http 模块，写一个 http server，并且处理 POST 请求
这个问题和上个问题一样 还是解析请求体，请求体是流
这里 req 实际上是个 stream，获取 body 的方法是基于注册 on data 事件实现的，当时脑子短路没说上来。。错了整道题
# 响应式方案
http://www.html-js.com/article/2402


4.
# O(N), O(logN)是什么
# getSum getResult
// getSum([1, '2', [3, [4, 5]]])
// => 13
function getSum(arr) {
}

给定无序、不重复的数组 data，取出 n 个数，使其相加和为 sum
```js function getResult(data, n, sum) { } ```
# 写代码：回文数，数组去重，自定义log，判断数据类型
# 写个函数反转字符串
# 给定一个不含重复数字的数组arr,指定个数n,目标和sum,判断是否含有由n个不同数字相加得到sum的情况（ok, leetcode 40 变种， 数字不得重复使用）
# +二叉树路径总和（leetcode 112) path sum
# +如何判断是不是完全二叉树（没答出来）
满二叉树：一棵深度为k且有 个结点的二叉树称为满二叉树
完全二叉树：如果对满二叉树的结点进行编号, 约定编号从根结点起, 自上而下, 自左而右。则深度为k的, 有n个结点的二叉树, 当且仅当其每一个结点都与深度为k的满二叉树中编号从1至n的结点一一对应时, 称之为完全二叉树
https://baike.baidu.com/item/%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91/7773232?fr=aladdin

BST: 二叉排序树（Binary Sort Tree），又称二叉查找树（Binary Search Tree），亦称二叉搜索树.
（1）若左子树不空，则左子树上所有结点的值均小于它的根结点的值；
（2）若右子树不空，则右子树上所有结点的值均大于它的根结点的值；
（3）左、右子树也分别为二叉排序树；
（4）没有键值相等的结点。

AVL：又叫平衡二叉树，在计算机科学中，AVL树是最先发明的自平衡二叉查找树。在AVL树中任何节点的两个子树的高度最大差别为1，所以它也被称为高度平衡树。增加和删除可能需要通过一次或多次树旋转来重新平衡这个树。AVL树得名于它的发明者G. M. Adelson-Velsky和E. M. Landis，他们在1962年的论文《An algorithm for the organization of information》中发表了它。

红黑树：红黑树（Red Black Tree） 是一种自平衡二叉查找树，是在计算机科学中用到的一种数据结构，典型的用途是实现关联数组。
红黑树是在1972年由Rudolf Bayer发明的，当时被称为平衡二叉B树（symmetric binary B-trees）。后来，在1978年被 Leo J. Guibas 和 Robert Sedgewick 修改为如今的“红黑树”。
# +二叉树的前中后序遍历，已知前中序，求原有的二叉树
# 各类排序算法介绍，冒泡，快排，堆排，以及相应的算法复杂度
# 编程题：判断一个链表是否有环
# 介绍基本的数据结构及其应用，队列，栈，堆。函数的执行栈和堆内存
实战题目解析：
70. 爬楼梯
https://leetcode-cn.com/problems/climbing-stairs/
22. 括号生成
https://leetcode-cn.com/problems/generate-parentheses/

实战题目：
226. 翻转二叉树
https://leetcode-cn.com/problems/invert-binary-tree/
98. 验证二叉搜索树
https://leetcode-cn.com/problems/validate-binary-search-tree/
104. 二叉树的最大深度
https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
111. 二叉树的最小深度
https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
297. 二叉树的序列化与反序列化
https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/

homework:
236. 二叉树的最近公共祖先
https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
105. 从前序与中序遍历序列构造二叉树
https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
77. 组合
https://leetcode-cn.com/problems/combinations/
46. 全排列
https://leetcode-cn.com/problems/permutations/
47. 全排列 II
https://leetcode-cn.com/problems/permutations-ii/

239
offer 48
minimum window substring
construct binary tree from preorder and post

AVL 红黑树


6.
# 页面加载问题，JS的异步加载

网络基础：
# restful: is a API standard, uses HTTP to access and use data, method type could be get post put delete to handle recource.
# 怎样做的登录，接着就是session，cookie，token等等, # cookie和session的联系
1. http无状态 cookie帮忙储存会话状态，用户登陆后服务器会set cookie，浏览器端有了登录cookie，后续访问服务器端校验cookie

2. session is a kind of approach to make request tobe stateful, 是把会话信息存在服务端，客户端会有一个sessionID，服务端收到sessionID，来判断用户是否有效

3. token: for example, third party want to access user account, but you definitely don't want give third party your account and password, so you can use token instead, token can see as aternative of account/password with expire time

4. oauth,JWT,openID都是一种token机制

5. difference between token and session-based token
token is a standard can have limited permission and expire time, token usually in header not cookie, can not only used in browser
session-based token is implemented in server

# localstorage sessionstorage cookie 大小 （一定要记得）
cookie 4k killobyte: send with request, often used to keep session.
ls 10m megabyte
ss 5m (only available in same tab)

# oauth
https://www.ruanyifeng.com/blog/2019/04/github-oauth.html
## 流程
```js
A 网站让用户跳转到 GitHub。
GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？"
用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。
A 网站使用授权码，向 GitHub 请求令牌。
GitHub 返回令牌.
A 网站使用令牌，向 GitHub 请求用户数据。
```
# JWT
JWT是在客户端存加密过的token：头部 负载 签名(Bearer <token>)
服务端收到客户端发出的token 会解密看下token是否有效
JWT keep session data in client
session keep session data in server

# Process和Thread是什么
+1 +1
1. 进程：程序的一次执行,进程是一个容器,进程与进程之间有独立的内存空间，一个进程里面可以有多个线程
chrome的主进程（调度）
chrome的每个tab都是一个进程，这个进程叫做渲染进程（渲染页面，执行js）
2. 线程：CPU的基本调度单位
浏览器渲染进程包括：GUI线程，js引擎线程，事件触发线程
# http 1.1/2.0
IETF发布
如何优雅的谈论HTTP／1.0／1.1／2.0
https://www.jianshu.com/p/52d86558ca57
1.0 每个请求一个TCP连接 而且是串行请求
1.1 通过设置keepalive实现http长连接
    请求发出，不必等返回，就可以发第二个请求
2.0 二进制协议
    在一个TCP中并发请求多个HTTP请求
    压缩头
    允许服务端在客户端放cache，服务端push
tcp: 传输层
# +http的常见method
get 获取
post 传输
options 查询支持的方法，复杂请求
head 不返回主体，确认url有效

put 上传
patch 对资源进行部分修改 put只能改全部
delete 删除

connect 代理服务器通信时 建立隧道，利用ssl tls加密
CONNECT www.example.com:443 HTTP/1.1
trace
# +http status code
200 301 302 304 401 404 5xx

# 状态码 206 307
206 partial content
307 针对get的重定向
303 可以跟随重定向get 和 post /todo
# Tcp协议怎么保证是可靠的
# 三次握手、四次挥手及标志位、time-wait
# TCP 握手，分手，拥塞控制，流量控制
+1

cache + cdn：
# 缓存相关的http头部属性，强制缓存，协商缓存，优先级，以及meta标签
<meta http-equiv="Cache-control" content="no-cache">

https://mp.weixin.qq.com/s/d2zeGhUptGUGJpB5xHQbOA?
# 浏览器缓存类型 
客户端请求资源，会先去像本地缓存查看是否有此资源，如果没有，则向服务端请求，server返回header有cache-control,和Etag,则告诉客户端这个资源要不要cache，以及要cache多久，
第二次请求相同资源，如果在时间范围内，会走强制缓存，如果超时无效，会走协商缓存

强制缓存 disk cache / memory cache
  Cache-Control(response header): max-age=xxx(second)/no-cache, no-cache means we have cache in client, but need 协商缓存 
  Expires(response header)
协商缓存 304
  Last-Modified(response header): this resource last modified time
  if-modified-since(request header): this is Last-modified last time
  Etag(response header)
  if-none-match(request header)

1) Last-Modified属性通常和Expires或Cache-Control属性配合使用, 因为即使浏览器设置缓存, 当用户点击”刷新”按钮时, 浏览器会忽略缓存继续向服务器发送请求, 这时Last-Modified将能够很好的减小回应开销.
2) ETag将返回给浏览器一个资源ID, 如果有了新版本则正常发送并附上新ID, 否则返回304， 但是在服务器集群情况下, 每个服务器将返回不同的ID, 因此不建议使用ETag.
3) vary是request header中使用的，为了在cache层验证请求头是否能使用缓存
Vary: Accept-Encoding 保证每个版本的资源在不同的压缩编码格式下都会缓存不同副本
Vary: User-Agent 保证不同针对不同设备缓存不同版本资源
4) Pragma is an HTTP/1.0 header. Pragma: no-cache is like Cache-Control: no-cache
# 浏览器缓存策略
+1（只答出了 LRU）

# CDN原理
CDN是一种缓存策略，类似朴朴前置仓，把仓库放到要买菜的小区附近。
本地访问域名，由dns服务器指向CDN服务器（cloudflare， cloudfront）中的均衡负载系统,均衡负载系统解析域名后，把最近的节点返回给用户
dns包括DNS 调度服务器和一个节点服务器

CDN有加速 防止ddos攻击的作用

把 max-age 用于本地缓存，把 s-maxage 用于 CDN 缓存时间, s是share
# CDN获取最近节点资源的算法是什么

# 缓存命中率的问题，怎样确保缓存全部数据，缓存命中率不是100%应该怎么办
对于一个缓存而言，还有一点很重要，就是你的缓存到底有没有用，衡量这个东西的就是缓存命中率。如果只是静态资源，在刷新缓存之后，可能会导致命中率下降，因此 CDN 的资源不适合经常刷新，换句话说，如果一个请求结果会经常进行变更，那么 CDN 基本就没什么存在的意义。
X-Cache

# 请求优化和渲染优化的方法
# web worker，web storage，怎样验证本地数据的有效性
# DHCP 的实现基于啥协议（UDP）


跨域:
# 跨域相关的问题
# 介绍CSRF。CSRF会不会有跨域的问题（不会，这里涉及到跨域的一些原理，跨域请求会被后端接口执行，但是返回的时候会被浏览器拦截）

# 跨域
【第2027期】图解CORS
卤代烃 前端早读课
https://mp.weixin.qq.com/s/6BPYgnTOw-cOysMp-otfbQ
跨域资源共享 CORS 详解
http://www.ruanyifeng.com/blog/2016/04/cors.html
1. 什么是跨域
浏览器网络请求时，有一个同源策略的机制。默认情况下只允许同个origin的程序请求http资源。
三种行为受限：cookie，跨域操作dom（iframe），xhr和fetch
2. 不允许跨域的原因：安全原因
3. 解决方案 cors
request header: origin
response header:
  access-control-allow-origin
  access-control-allow-methods

4. 如果是非简单请求，会有预检 preflight, 即一个options请求
预检请求有特殊request headers:
  access-control-request-method
  access-control-request-headers
5. 如果要在跨域请求中包含cookie：
  request
    xhr中把withCredentials设为true
    fetch中把Credentials设为include
  response
    access-control-allow-credentials: true
6. CORS与JSONP的使用目的相同，但是比JSONP更强大。
JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。


安全以及授权：
# +https握手机制
+1 这个一定要烂熟
综述：
https://www.jianshu.com/p/52d86558ca57

http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html
https://github.com/CyC2018/CS-Notes/blob/master/notes/HTTP.md#%E5%85%ADhttps
https全称是通过ssl的传输协议, 解决http problem: 窃听 篡改 伪装
ssl协议包括 SSL记录协议和 ssl握手协议，握手协议在实际数据传输前，通信双方进行认证 交换密钥等

数字签名解决 伪装 篡改
https采用对称 非对称加密混合的方式
asymmetric encryption to encrypt the session key, then use session key to encripy and Decrypt the message
/ˌeɪsɪˈmetrɪk/
用非对称加密来加密session key， 用对称加密来加密报文


1.clientHello: 支持的协议版本和加密算法比如RSA, random number
2.serverRes: 确认协议版本和加密方法，random number，服务器证书(里面有公钥)
3.client 验证整数里面的数字签名， 取出公钥,  then clientHello: random number, 编码改变通知, client ending
4.serverRes: 通过三个随机数生成session key, 编码改变通知, server ending
接下来都是用session key来加密通信了



# 埋点
https://zhuanlan.zhihu.com/p/66883233
引用自百科的原话是，埋点分析网站分析的一种常用的数据采集方法。因此其本质是分析，但是靠什么分析呢？靠埋点得到的数据

# PWA VS RN VS weex
PWA，全称为Progressive Web App，是谷歌公司在2015年提出的渐进式网页开发技术
PWA使用了 Service Worker
可通过网络应用程序Manifest为用户提供媲美原生App的使用体验
Service Worker表示离线缓存文件，其本质是Web应用程序与浏览器之间的代理服务器，网络可用作为浏览器和网络之间的代理，离线环境下使用其中的缓存内容
Manifest则是W3C的技术规范，它定义了基于JSON的清单，为开发人员提供了一个集中放置与Web应用程序关联的元数据的地点

# ssr vs spa
何时ssr 何时csr？ /todo

# 安全问题
DDoS全称:分布式拒绝服务
它利用网络协议和操作系统的一些缺陷，采用欺骗和伪装的策略来进行网络攻击，使网站服务器充斥大量要求回复的信息，消耗网络带宽或系统资源，导致网络或系统不胜负荷以至于瘫痪而停止提供正常的网络服务。
DDoS简单说就是分布式的方法，不断去请求，如果程序对用户授权没有做好的话。消耗网络带宽或系统资源。
DDoS可以用硬件防火墙来过滤攻击

CC攻击的原理是通过代理服务器或者大量肉鸡模拟多个用户访问目标网站的动态页面，制造大量的后台数据库查询动作，消耗目标CPU资源，造成拒绝服务
提供验证码

区别：
DDoS攻击打的是网站的服务器，而CC攻击是针对服务器上的网站攻击的

# md5
Md5是啥，是加密还是签名




7.
# 介绍下项目前端架构、项目难点
+1
主题化
按需加载
# 你以前做过性能优化方面的开发，介绍下
+1
组件库 样式优化
组件库 按需加载
webpack cache优化 /todo
https://mp.weixin.qq.com/s/oB5eYax_NndcM5IinPgzNQ

# 说说性能优化的通用架构方案
nuxt cache 服务端cache
lru-cache

# 介绍下项目提高点
1. 主题化优化(不要把所有主题样式都打包出来) /todo

2. 如果没有babel插件 怎么按需加载

3. md文档怎么不用手写 /todo
https://medium.com/storybookjs/rich-docs-with-storybook-mdx-61bc145ae7bc
https://reaviz.io/?path=/docs/docs-chart-types-area-chart--page
mdx
4. 提取公共css
splitChunks + enforce true
## 公共css
use optimization.splitChunks or mannually make package


# webpack 了解 应用，常用loader plugin
0.
HtmlWebpackPlugin
clean-webpack-plugin /todo
mini-css-extract-plugin
TerserPlugin /todo
optimize-css-assets-webpack-plugin /todo
DefinePlugin
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  DefinePlugin 允许在 编译时 创建配置的全局常量
CommonsChunkPlugin /todo


1. optimization
  runtimeChunk: single true
  splitChunks

  split还拓展了一个 dynamic import, cope with 'output.chunkFilename'
  chunkFilename，它决定 non-entry chunk(非入口 chunk) 的名称

2. devtool

3. externals
倾向于把 lodash 当作 peerDependency。
也就是说，consumer(使用者) 应该已经安装过 lodash 。
因此，你就可以放弃控制此外部 library ，而是将控制权让给使用 library 的 consumer

配置完externals lodash
这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在 consumer 环境中必须存在且可用

4. library/libraryTarget
library 会将你的 library bundle 暴露为名为 library 值的全局变量，consumer 通过此名称来 import
libraryTarget: 'var'/'window'/'umd'

5. manifest (在管理输出)
你可能会很感兴趣，webpack 和 webpack 插件似乎“知道”应该生成哪些文件。答案是，webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。如果你想要知道如何以其他方式来控制 webpack 输出，了解 manifest 是个好的开始。

通过 WebpackManifestPlugin 插件，可以将 manifest 数据提取为一个容易使用的 json 文件。

我们不会在此展示一个如何在项目中使用此插件的完整示例，你可以在 manifest 概念页面深入阅读，以及在 缓存 指南中，了解它与长效缓存有何关系。

# css loader 看一下

# webpack 怎么提升构建速度
1. 通过使用 include 字段，仅将 loader 应用在实际需要将其转换的模块
2. 减少使用 loader plugin
3. 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数
4. DllPlugin 为更改不频繁的代码生成单独的编译结果, 我们可以使用多进程的方式运行loader，和压缩js，社区有两个插件就是专门干这两个事的：HappyPack、ParallelUglifyPlugin
https://mp.weixin.qq.com/s/ScQdoysvLq8Pbc04LJII9w
5. 减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。

6. 使用数量更少/体积更小的 library。
在多页面应用程序中使用 SplitChunksPlugin。
在多页面应用程序中使用 SplitChunksPlugin，并开启 async 模式。
移除未引用代码。
只编译你当前正在开发的那些代码。
7. 开发环境下避免
TerserPlugin
ExtractTextPlugin
[hash]/[chunkhash]
AggressiveSplittingPlugin
AggressiveMergingPlugin
ModuleConcatenationPlugin
## webpack cache
webpack v5 cache
https://mp.weixin.qq.com/s/oB5eYax_NndcM5IinPgzNQ


# webpack 原理
webpack 是一个nodejs程序吗?
bundle your assets packages, build process
transfer module into bundle, through loader can compile module
for example we use babel loader can help translate new grammer into old grammer

Webpack uses the dependency graph to decide which modules need to be bundled, The Entry Point determines where webpack should start from to build out its internal dependency graph.

Webpack takes the dependencies and generates a dependency graph allowing web developers to use a modular approach for their web application development purposes.

webpack also provides a built-in development server called webpack Dev Server that can be used as an HTTP server for serving files while developing. It also provides the capability to use hot module replacement.

Loaders read various types of files and transforms them into valid modules that webpack can understand

plugins used to bundle optimization, minification, script injection, stats emission

notice:
optimization.splitChunks
With the optimization.splitChunks configuration option in place, we should now see the duplicate dependency removed from our index.bundle.js and another.bundle.js.
Originally, chunks (and modules imported inside them) were connected by a parent-child relationship in the internal webpack graph. The CommonsChunkPlugin was used to avoid duplicated dependencies across them


## webpack v5 vs v4
这个还不知道

# ssr原理 怎么把vue 转成 HTML
vue-server-renderer


# babel: commonjs 转 es6



项目经验 和 项目bug其实都是在于考察面试者平常的工作经验，项目bug可以很好的考察平常这个面试者到底是在处理什么级别的任务，擦什么样的屁股，以及擦屁股擦得干不干净
建议从 编程能力 架构 以及 工程化3个方面考虑
# 项目中修复的bug /todo

架构：gobear反向代理的bug

编程：bfcache的问题

ga：gobear ga bug

网络：缓存和缓存bug


## think a vue theory bug /todo



8. 很可能被问到的其他问题
# uniapp theory
# electron theory

# 多个pubsub 崩塌问题

# senium
## setup env for senium

# RN
## write a checkbox group component

# 正则匹配 version-(subversion).1.2.3 /todo
'version-alpha.1'.match(/^([^-]+)(?:-(\S+))?\.(\d)/)
// ["version-alpha.1", "version", "alpha", "1", index: 0, input: "version-alpha.1", groups: undefined]
'version.1'.match(/^([^-]+)(?:-(\S+))?\.(\d)/)
// ["version.1", "version", undefined, "1", index: 0, input: "version.1", groups: undefined]

# 实现 symbol
see in symbol.js

# 防抖和节流再自己实现一次

# electron
## use electron to open page, run script, set different cookie

# improve hackerrank homework


# Data storage: Percona XtraDB Cluster, Elasticsearch, Apache Cassandra
aiven data base
# In-Memory data grid: Hazelcast
kinda like redis, in-memory data structure store
# Real-time data pipeline: Apache Kafka
stream-processing software platform, used to handle real-time data feeds, it is a distributed message system
# Backend webservice stack: Play (Java 8), GoLang, Node.js
# Web frontend: AngularJS, React
# Mobile: Android SDK, React Native
# Containerization: Kubernetes (Docker)
manage container deployment

https://jobs.lever.co/ninjavan/0081914d-9b18-46f1-aa34-e88bf23981aa


# node
https://www.pirple.com/courses/take/the-nodejs-master-class/lessons/3809327-what-is-v8-exactly



# 英语时间复杂度
# const let 对于性能的影响 闭包
# flex
# 声网
# 前端解析
# promise es6