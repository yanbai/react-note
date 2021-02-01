function qSort(arr) {
  if (arr.length == 0) {
    return [];
  }
  var left = [];
  var right = [];
  var pivot = arr[0];
  for (var i = 1; i < arr.length; i++) {
    // console.log(" 基准值：" + pivot + " 当前元素：" + arr[i]);
    if (arr[i] < pivot) {
      // console.log(" 移动 " + arr[i] + " 到左边 ");
      left.push(arr[i]);
    } else {
      // console.log(" 移动 " + arr[i] + " 到右边 ");
      right.push(arr[i]);
    }
  }
  return qSort(left).concat(pivot, qSort(right));
}
a = qSort([10, 8, 6, 22, 102, 35, 99])
console.log(a)

function qSort() {
  let left = []
  let right = []
  let pivot = arr[0]
  for(let i=1; i<arr.length;i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return qSort(left).concat(pivot, qSort(right))
}
