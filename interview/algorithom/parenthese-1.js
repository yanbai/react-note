function generate(level, max, s) {
  // terminator
  if(level >= max) {
    console.log(s)
    return
  }

  // process current
  let s1 = s + '('
  let s2 = s + ')'

  // dill down
  generate(level + 1, max, s1)
  generate(level + 1, max, s2)
}
generate(0, 6, '')

