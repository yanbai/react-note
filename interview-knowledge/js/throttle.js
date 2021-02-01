// function throttle(fn, wait) {
//   let timeout
//   return function(...args) {
//     let context = this
//     if(!timeout) {
//       timeout = setTimeout(() => {
//         fn.apply(context, args)
//         timeout = null
//       }, wait)
//     }
//   }
// }


function throttle(fn, time) {
  let timeout
  let context
  return function(...args) {
    context = this
    if(!timeout) {
      timeout = setTimeout(() => {
        fn.apply(context, args)
        timeout = null
      }, time)
    }
  }
}
