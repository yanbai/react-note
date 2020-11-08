'use strict';

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

// Complete the minimumBribes function below.
function minimumBribes(q) {
  for(let current_pos = 0; current_pos < q.length; current_pos++) { // o(n)
    // getting original postion using 0 indexing
    const original_pos = q[current_pos] - 1
    // diff = how far person has moved
    const diff = original_pos - current_pos
    // if person has moved more than 2 spots, then impossible
    if(diff > 2)
      return console.log('too chaotic')

    // if statement not required, but shows understanding
    if(diff <= 0) {
      // check each person starting from one person ahead of original pos
      // up until current position
      for(let i=Math.max(0, original_pos-1); i<current_pos; i++) { // o(logn)
        const start_pos_of_forward_person = q[i] - 1
        // if a person in front of current person started BEHIND
        // current person, then current person MUST have been bribed by them
        if(start_pos_of_forward_person > original_pos) {
          total++
        }
      }
    }
  }

  // time complexity = o(n) * o(logn)
  console.log(total)

}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
