function curry(fn) {
  return function recursion (...args) {
    return function(...args2) {
      recursion.apply(null, args.concat(args2))
    }
  }
}

function curry(fn) {
  let count = fn.length
  return function recursion (...args) {
    if(args.length >= count) {
      return fn.apply(null, args)
    }

    return function(...args2) {
      return recursion.apply(null, args.concat(args2))
    }
  }
}

// function curry(fn) {
//   var limit = fn.length
//   return function currying (...args) {
//     if (args.length >= limit) {
//       return fn.apply(null, args)
//     } else {
//       return function(...args2) {
//         return currying.apply(null, args.concat(args2))
//       }
//     }
//   }
// }

// user code
function abc(a, b, c) {
  return [a, b, c]
}
let curried = curry(abc)


console.log(curried(1)(2)(3))

// curried

// function recursion() {

// }
