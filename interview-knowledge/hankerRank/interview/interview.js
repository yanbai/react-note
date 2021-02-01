function newPassword(a, b) {
  // Write your code here
  let res = []
  let aShifted = a.length < b.length
  let l = a.length + b.length
  let arrA = a.split('')
  let arrB = b.split('')

  for(let i=0; i<l; i++) {
      if(aShifted && arrB.length) {
          res[i] = arrB.shift()
          aShifted = false
      } else if(!aShifted && arrA.length) {
          res[i] = arrA.shift()
          aShifted = true
      } else if(aShifted && arrB.length===0) {
          res = res.concat(arrA)
          break
      } else if(!aShifted && arrA.length===0) {
          res = res.concat(arrB)
          break
      }
  }
  return res.join('')
}

a = 'zbxnsjdns'
b = 'idowdk'

newPassword(a, b)
