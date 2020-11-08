function generate(level, max, s) {
  // terminator
  if(level >= max) {
    // filter the invalid
    let stack = []
    for(item of s) {
      if(item === '(') {
        stack.push(item)
      }else if(item === ')') {
        if(!stack.length)
          return
        stack.pop()
      }
    }
    if(stack.length !== 0)
      return
    console.log(s)
    return
  }

  // process current

  // dill down
  generate(level + 1, max, s + '(')
  generate(level + 1, max, s + ')')
}
generate(0, 6, '')

