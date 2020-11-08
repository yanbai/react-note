function newPassword(a, b) {
  // Write your code here
  let res = []
  let currentA = a.length > b.length
  let l = a.length + b.length
  let arrA = a.split('')
  let arrB = b.split('')

  for(let i=0; i<l; i++) {
      if(currentA && arrA.length) {
          res[i] = arrA.shift()
          currentA = false
      } else if(!currentA && arrB.length) {
          res[i] = arrB.shift()
          currentA = true
      } else if(currentA && arrA.length===0) {
          res = res.concat(arrB)
          break
      } else if(!currentA && arrB.length===0) {
          res = res.concat(arrA)
          break
      }
  }
  return res.join('')
}

a = 'zbxnsjdns'
b = 'idowdk'

newPassword(a, b)
