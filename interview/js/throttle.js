function throttle(fn, wait) {
  let timeout
  return function(...args) {
    let context = this
    if(!timeout) {
      timeout = setTimeout(() => {
        fn.apply(context, args)
        timeout = null
      }, wait)
    }
  }
}
