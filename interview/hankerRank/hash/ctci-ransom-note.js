'use strict';

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

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    let obj = {}
    let obj_magazine = {}
    for(let item of magazine) {
        if(!obj_magazine[item]) {
            obj_magazine[item] = 0
        } else {
            obj_magazine[item] ++
        }
    }

    for(let item of note) {
        if(obj_magazine[item]) {
            obj_magazine[item] --
            if(obj_magazine[item]<0) {
                console.log(false)
                return
            }
        } else {
            console.log(false)
            return
        }
    }
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
