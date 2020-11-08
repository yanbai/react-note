// Complete the isValid function below.
function isValid(s) {
  let map = {}
  // let occur = []
  let reverseMap = {}
  let diff = 0
  for(let c of s) {
    if(!map[c]) {
      map[c] = 1
    } else {
      map[c] ++
    }
  }
  // for(let key in map) {
  //   // if(occur.indexOf(map[key]) < 0) {
  //   //   occur.push(map[key])
  //   //   if(occur.length > 2) {
  //   //     return 'NO'
  //   //   }
  //   //   if(occur.length > 1) {
  //   //     if(Math.abs(occur[0] - occur[1]) > 1) {
  //   //       return 'NO'
  //   //     }
  //   //   }
  //   // }
  //   if(!reverseMap[map[key]]) {
  //     reverseMap[map[key]] = 0
  //     if()
  //   } else {
  //     reverseMap[map[key]] ++
  //   }
  //   if(Object.keys(reverseMap).length > 2)
  //     return 'NO'
  // }
  return 'YES'
}

isValid('aabbcd')
