function bind(fn, context) {
  return function (arguments) {
    return fn.apply(context, arguments)
  }
}

