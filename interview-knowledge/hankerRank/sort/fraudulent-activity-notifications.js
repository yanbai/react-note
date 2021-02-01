// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
  function calcAverage(arr, d) {
    let sorted = arr.map(i=>parseInt(i, 10)).sort((a, b) => (a-b))
    if(d%2 === 1) {
      return sorted[Math.floor(d/2)]
    } else {
      return (sorted[d/2-1] + sorted[d/2]) / 2
    }
  }
  let res = 0
  for(let i=0,l=expenditure.length; i<l; i++) {
    if(i>=d) {
      let pre = expenditure.slice(i-d, i-1)
      if(expenditure[i] >= 2*calcAverage(pre, d))
        res ++
    }
  }
  return res
}
