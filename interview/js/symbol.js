let global = {}
function Symbol(str) {
  if(this instanceof Symbol)
    throw new Error('Symbol is not constructable')
  return Math.random()
}
Symbol.for = function(str) {
  for(let key in global) {
    if(str === key)
      return global[str]
  }
  global['str'] = Math.random()
}

a = Symbol('an')
b = Symbol('an')
console.log(a === b)

c = Symbol.for('b')
d = Symbol.for('b')
console.log(c === d)
