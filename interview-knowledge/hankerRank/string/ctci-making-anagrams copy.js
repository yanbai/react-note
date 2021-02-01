// Complete the makeAnagram function below.
function makeAnagram(a, b) {
  let maxLength = a.length>b.length ? a.length : b.length
  let map = {}
  let res = 0
  for(let i=0; i<maxLength; i++) {
    if(a[i]) {
      if(!map[a[i]]) {
        map[a[i]] = 1
      } else {
        map[a[i]] ++
      }
    }
    if(b[i]) {
      if(!map[b[i]]) {
        map[b[i]] = -1
      } else {
        map[b[i]] --
      }
    }
  }
  for(let key in map) {
    if(map[key] !== 0)
      res+=Math.abs(map[key])
  }
  return res
}
let a = 'showman'
let b = 'woman'
let res = makeAnagram(a, b)

