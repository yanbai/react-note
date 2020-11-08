function debounce(fn, wait) {
  let timeout
  return function() {
    let context = this
    if(timeout)
      clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(context, arguments)
    }, wait)
  }
}
