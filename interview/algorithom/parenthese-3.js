function generate(left, right, n, s) {
  // terminator
  if(left === n && right === n) {
    console.log('ouput all parenthese:', s)
    return
  }

  // process current

  // dill down
  if(left<n) {
    generate(left+1, right, n, s + '(')
  }
  if(right<left) {
    generate(left, right+1, n, s + ')')
  }
}
generate(0, 0, 2, '')

