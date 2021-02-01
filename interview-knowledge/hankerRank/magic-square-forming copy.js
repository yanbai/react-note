'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
  let possibilities = ['816357492', '438951276', '294753618', '672159834', '618753294', '276951438', '492357816', '834159672']
  let current = s.map(item=>item.join('')).join('')
  let res = +Infinity
  function calc(str1, str2) {
    let res = 0
    for(let i=0, l=9; i<l; i++) {
      res+=Math.abs(str1[i] - str2[i])
    }
    return res
  }
  for(let item of possibilities) {
    let diff = calc(item, current)
    if(diff < res)
      res = diff
  }
  return res
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
