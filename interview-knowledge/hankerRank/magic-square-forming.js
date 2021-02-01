function processData(input) {
  // Make our 2D array...
  var myArr = input.split('\n').map(n => n.split(' ').map(Number));
  // Flatten array for ease of access
  myArr = [].concat.apply([], myArr);
  // We know a 3x3 magic square has all sums === 15
  // We also know that there are 8 unique solutions to a 3x3 magic square
  var squares = [
    [8, 1, 6, 3, 5, 7, 4, 9, 2],
    [4, 3, 8, 9, 5, 1, 2, 7, 6],
    [2, 9, 4, 7, 5, 3, 6, 1, 8],
    [6, 7, 2, 1, 5, 9, 8, 3, 4],
    [6, 1, 8, 7, 5, 3, 2, 9, 4],
    [8, 3, 4, 1, 5, 9, 6, 7, 2],
    [4, 9, 2, 3, 5, 7, 8, 1, 6],
    [2, 7, 6, 9, 5, 1, 4, 3, 8]
  ];
  // Now we just track which given magic square is the least distance from our matrix
  // This will report the least cost (abet, brute force-y)
  var cost = Math.min();
  for (let magicSquareEntry = 0; magicSquareEntry < squares.length; magicSquareEntry += 1) {
    let currCost = 0;
    for (i = 0; i < 9; i += 1) {
      currCost += Math.abs(squares[magicSquareEntry][i] - myArr[i]);
    }
    if (currCost < cost) {
      cost = currCost;
    }
  }
  console.log(cost);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
