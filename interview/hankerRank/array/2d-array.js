'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hourglassSum function below.
function hourglassSum(arr) {
  function calcSum(arr, start, matrixLength) {
    let resArr = [
      arr[start],
      arr[start+1],
      arr[start+2],
      arr[start+(matrixLength+1)],
      arr[start+2*(matrixLength)],
      arr[start+2*(matrixLength)+1],
      arr[start+2*(matrixLength)+2]
    ]
    return resArr.reduce((acc, cur)=> { return acc+cur}, 0)
  }
  let flatArr = arr.reduce((acc, val) => [ ...acc, ...val ], [])
  let length = arr.length
  let res = -Infinity
  for(let i=0,l=arr.length; i<l; i++) {
    for(let j=0, m=arr[i].length; j<m; j++) {
      if(j<4 && i<4) {
        let start = i*length+j
        let temp = calcSum(flatArr, start, 6)
        if(temp > res)
          res = temp
      }
    }
  }
  return res
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
