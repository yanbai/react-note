// 1. 
function parse(text) {
	//let arr = new Array()
  return text.split(/\n/).map(i=>i.split(','))
}
let res = parse(`"1,",2,3 
4,5`)

function parse(text) {
	//let arr = new Array()
  return text.replace(/(\".*),(.*\")/g, '$1#$2').split(/\n/).map(i=>i.split(',').map(i=>i.replace('#', ',')))
}

// 2 串行执行本身的promise

// 3 间隔汇总promise参数 并且统一执行