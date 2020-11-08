// process.stdin.on('end', function() {
//   process.stdout.write('end')
// })

// function get(cb) {
//   process.stdin.setEncoding('utf8')
//   process.stdin.resume()

//   process.stdin.on('data', function(chunk) {
//     console.log('start')
//     // process.stdin.pause()
//     // cb(chunk)
//     process.stdin.emit('end')
//   })

//   console.log('please input')
// }

// get(function(result) {
//   console.log("["+result+"]")
// })



// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
//     console.log('emit data')
// });

// process.stdin.on("end", function () {
//    console.log(123)
// });

// process.stdin.resume()
// process.stdin.setEncoding('utf-8')
// process.stdout.write('please input')
// process.stdin.on('data', function(data) {
//   let str = data.slice(0, -2)
//   process.stdin.emit('end')
//   process.stdout.write('you input: ' + str)
// })
// process.stdin.on('end', function() {
//   console.log('emit end')
//   process.stdin.pause()
// })

// const readline = require('readline')
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// rl.question('how do you think of node.js', (answer) => {
//   console.log(`thanks for your reply ${answer}`)
//   rl.close()
// })
