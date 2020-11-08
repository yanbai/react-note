function flatten(arr) {
  return arr.reduce((acc, cur) => {
    if(Array.isArray(cur)) {
      return acc.concat(flatten(cur))
    } else {
      return acc.concat(cur)
    }
  }, [])
}

console.log(flatten([[1 , 2], [3, 4], [5, 6]]))
console.log(flatten([[1 , 2], [3, [4, 4.5]], [5, 6]]))

function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(cur)
  })
}
