// "数组的解构赋值", 

// let [arr, ...other] = [1,2,3,4]
// console.log(other)
// [2,3,4]


// let [arr = [1,2], var_a] = []
// console.log(arr)
// console.log(var_a)

// "对象的解构赋值", 

let {foo, bar } = {bar: '1', foo: '2'}

let obj = {
  p: [
    'hello',
    {y: 'world'}
  ]
}
let {p, p:[x, {y}]} = obj

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
}


// "字符串的解构赋值", 
// "数值和布尔值的解构赋值", 
// "函数参数的解构赋值", 
// "圆括号问题", 
// "用途"
