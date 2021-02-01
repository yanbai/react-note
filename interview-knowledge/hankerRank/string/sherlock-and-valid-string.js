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

// Complete the isValid function below.
function isValid(s) {
  let map = {}
  let occur = []
  let diff = 0
  for(let c of s) {
    if(!map[c]) {
      map[c] = 1
    } else {
      map[c] ++
    }
  }
  for(let key in map) {
    if(occur.indexOf(map[key]) < 0) {
      occur.push(map[key])
      if(occur.length > 2) {
        return 'NO'
      }
      if(occur.length > 1) {
        if(Math.abs(occur[0] - occur[1]) > 1) {
          return 'NO'
        }
      }
    }
  }
  return 'YES'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
