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
    if([b[i]]) {
      if(!map[b[i]]) {
        map[b[i]] = -1
      } else {
        map[b[i]] --
      }
    }
  }
  for(let key in map) {
    if(map[key] !== 0)
      res++
  }
  return res
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
