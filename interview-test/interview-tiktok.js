1. 实现函数接受任意二叉树，求二叉树所有  根到叶子节点路径上所有节点，组成的数字之和。
function sumTree(node) {
  if(!node.left || !node.right)
  	return node.val
  
  if(node.left)
  	return node.val + sumTree(node.left)
  if(node.right)
  	return node.val + sumTree(node.right)
}


==============================================
3. 实现一个 Symbol，需要满足以下需求
1、返回的值不能相同
2、无法作为构造函数调用，否则抛出异常
3、如果我们希望使用同一个 Symbol 值，可以使用 Symbol.for。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则返回一个新的 Symbol 值。
ex:
var s1 = Symbol('foo');
var s2 = Symbol.for('foo');
var s3 = Symbol.for('foo');

console.log(s1 === s2); // false
console.log(s2 === s3); // true


let map = {}

function Symbol(str) {
	let flag = Math.random()
  map[str] = flag
  return flag
}

Symbol.for = function(str) {
	for(let key in map) {
    if(key === str)
    	return map[key]
  }
  return null
}





===========================
Semantic Versioning 是一个前端通用的版本定义规范。格式为“{MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number}”，要求实现 compare(a, b) 方法，比较 a, b 两个版本大小。
  1. 当 a > b 是返回 1；
  2. 当 a = b 是返回 0；
  3. 当 a < b 是返回 -1；
  4. 其中，rc > beta > alpha，major > minor > patch；
  5. 例子，1.2.3 < 1.2.4 < 1.3.0-alpha.1 < 1.3.0-alpha.2 < 1.3.0-beta.1 < 1.3.0-rc.1 < 1.3.0





function parse(str) {
    let regexp = /(\d)\.(\d)\.(\d)(-([alpha|beta|rc]))?\.(\d)?/
    let matched = str.match(regexp)
    let [major, minor, patch, version, number] = [matched[1], matched[2], matched[3], matched[5], matched[6]]
    return {
    	major, minor, patch, version, number
    }
  }
  
function compareVersion(a, b) {
	let map = {
    rc: 3,
    beta: 2,
    alpha: 1
  }
  let resA = map[a]
  let resB = map[b]
  if(resA > resB)
  	return 1
  if(resA < resB)
  	return -1
  return 0
}

function compare(a, b) {
  let resA = parse(a)
  let resB = parse(b)
  let res
  if(resA.major > resB.major)
  	return 1
  if(resA.major < resB.major)
  	return -1
  if(resA.minor > resB.minor)
  	return 1
  if(resA.minor < resB.minor)
  	return -1
  if(resA.patch > resB.patch)
  	return 1
  if(resA.patch < resB.patch)
  	return -1
  return compareVersion(resA.version, resB.version)
  if(resA.number > resB.number)
  	return 1
  if(resA.number < resB.number)
  	return -1
  return 0
}

