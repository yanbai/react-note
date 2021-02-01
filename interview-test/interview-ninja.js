// function combinations(str, total) {
//   let divide = 1
//   let left = str.slice(0, divide)
//   let right = str.slice(divide)
//   combinations(right, total - parseInt(left, 10))
//   if(parseInt(left, 10) + parseInt(right, 10) === total)
//       return `${left}+${right}`
//   if (parseInt(left, 10) - parseInt(right, 10) === total)
//       return `${left}-${right}`
// }

// combinations('123456789', 100)

// function calcAllPossibilities(n) {
//     let dp = {}
//     dp[1] = 1
//     dp[2] = 2
//     for(let i=3; i<=n; i++) {
//         dp[i] = dp[i-1]*3
//     }
//     return dp[n] + 1
// }

// function calc(n) {
//     let dp = {}
//     dp[1] = [1]
//     dp[2] = [3, -1, 12]
//     dp[3] = dp[1].map(i=>[i+23, i-23]).concat(dp[2].map(i=>[i+3, i-3])).concat(123).flat()
//     dp[4] = dp[1]
//         .map(i=>[i+234, i-234])
//         .concat(dp[2].map(i=>[i+34, i-34]))
//         .concat(dp[3].map(i=>[i+4, i-4]))
//         .concat(1234).flat()
//     dp[5] = dp[1]
//         .map(i=>[i+2345, i-2345])
//         .concat(dp[2].map(i=>[i+345, i-345]))
//         .concat(dp[3].map(i=>[i+45, i-45]))
//         .concat(dp[4].map(i=>[i+5, i-5]))
//         .concat(12345).flat()
//     dp[6] = dp[1]
//         .map(i=>[i+23456, i-23456])
//         .concat(dp[2].map(i=>[i+3456, i-3456]))
//         .concat(dp[3].map(i=>[i+456, i-456]))
//         .concat(dp[4].map(i=>[i+56, i-56]))
//         .concat(dp[5].map(i=>[i+6, i-6]))
//         .concat(123456).flat()
//     dp[7] = dp[1]
//         .map(i=>[i+234567, i-234567])
//         .concat(dp[2].map(i=>[i+34567, i-34567]))
//         .concat(dp[3].map(i=>[i+4567, i-4567]))
//         .concat(dp[4].map(i=>[i+567, i-567]))
//         .concat(dp[5].map(i=>[i+67, i-67]))
//         .concat(dp[6].map(i=>[i+7, i-7]))
//         .concat(1234567).flat()
//     dp[8] = dp[1]
//         .map(i=>[i+2345678, i-2345678])
//         .concat(dp[2].map(i=>[i+345678, i-345678]))
//         .concat(dp[3].map(i=>[i+45678, i-45678]))
//         .concat(dp[4].map(i=>[i+5678, i-5678]))
//         .concat(dp[5].map(i=>[i+678, i-678]))
//         .concat(dp[6].map(i=>[i+78, i-78]))
//         .concat(dp[7].map(i=>[i+8, i-8]))
//         .concat(12345678).flat()
//     dp[9] = dp[1]
//         .map(i=>[[i+23456789, i+'+23456789'], [i-23456789, i+'-23456789']])
//         .concat(dp[2].map(i=>[[i+3456789, i+'+3456789'], [i-3456789, i+'-3456789']]))
//         .concat(dp[3].map(i=>[[i+456789, 'i+456789'], [i-456789, '-456789']]))
//         .concat(dp[4].map(i=>[[i+56789, i+'+56789'], [i-56789, i+'-56789']]))
//         .concat(dp[5].map(i=>[[i+6789, i+'+6789'], [i-6789, i+'-6789']]))
//         .concat(dp[6].map(i=>[[i+789, i+'+789'], [i-789, i+'-789']]))
//         .concat(dp[7].map(i=>[[i+89, i+'+89'], [i-89, i+'-89']]))
//         .concat(dp[8].map(i=>[[i+9, i+'+9'], [i-9, i+'-9']]))
//         .concat([123456789, '123456789']).flat()
//     return dp[9].filter(v => v[0]===100)
// }

// function calc(n) {
//     let dp = {}
//     dp[1] = [1]
//     dp[2] = [3, -1, 12]
//     dp[3] = dp[1].map(i=>[i+23, i-23]).concat(dp[2].map(i=>[i+3, i-3])).concat(123).flat()
//     dp[4] = dp[1]
//         .map(i=>[i+234, i-234])
//         .concat(dp[2].map(i=>[i+34, i-34]))
//         .concat(dp[3].map(i=>[i+4, i-4]))
//         .concat(1234).flat()
//     dp[5] = dp[1]
//         .map(i=>[i+2345, i-2345])
//         .concat(dp[2].map(i=>[i+345, i-345]))
//         .concat(dp[3].map(i=>[i+45, i-45]))
//         .concat(dp[4].map(i=>[i+5, i-5]))
//         .concat(12345).flat()
//     dp[6] = dp[1]
//         .map(i=>[i+23456, i-23456])
//         .concat(dp[2].map(i=>[i+3456, i-3456]))
//         .concat(dp[3].map(i=>[i+456, i-456]))
//         .concat(dp[4].map(i=>[i+56, i-56]))
//         .concat(dp[5].map(i=>[i+6, i-6]))
//         .concat(123456).flat()
//     dp[7] = dp[1]
//         .map(i=>[i+234567, i-234567])
//         .concat(dp[2].map(i=>[i+34567, i-34567]))
//         .concat(dp[3].map(i=>[i+4567, i-4567]))
//         .concat(dp[4].map(i=>[i+567, i-567]))
//         .concat(dp[5].map(i=>[i+67, i-67]))
//         .concat(dp[6].map(i=>[i+7, i-7]))
//         .concat(1234567).flat()
//     dp[8] = dp[1]
//         .map(i=>[i+2345678, i-2345678])
//         .concat(dp[2].map(i=>[i+345678, i-345678]))
//         .concat(dp[3].map(i=>[i+45678, i-45678]))
//         .concat(dp[4].map(i=>[i+5678, i-5678]))
//         .concat(dp[5].map(i=>[i+678, i-678]))
//         .concat(dp[6].map(i=>[i+78, i-78]))
//         .concat(dp[7].map(i=>[i+8, i-8]))
//         .concat(12345678).flat()
//     dp[9] = dp[1]
//         .map(i=>[i+23456789, i-23456789])
//         .concat(dp[2].map(i=>[i+3456789, i-3456789]))
//         .concat(dp[3].map(i=>[i+456789, i-456789]))
//         .concat(dp[4].map(i=>[i+56789, i-56789]))
//         .concat(dp[5].map(i=>[i+6789, i-6789]))
//         .concat(dp[6].map(i=>[i+789, i-789]))
//         .concat(dp[7].map(i=>[i+89, i-89]))
//         .concat(dp[8].map(i=>[i+9, i-9]))
//         .concat(123456789).flat()
//     return dp[9].filter(v => v===100)
// }
// let res = calc(9)
// console.log(res.length)
// function findSum(str, sum, final) {
//     if(str.length === 0 && sum === 0) {
//         console.log('found'+final)
//         return
//     }
//     for(let i=1; i<=str.length; i++) {
//         let left = str.slice(0, i)
//         let number = parseInt(left)
//         findSum(str.slice(i), sum-number, `${left}+${final}`)
//         findSum(str.slice(i), number-sum, `${left}-${final}`)
//     }
// }

// findSum('123456789', 100, '')

var findSequences = function(str, total) {
    var recurse = function(string, sum, result) {
        if(string == '' && sum == 0) {
            console.log(result);
            return;
        }
        for(let i = 1; i <= string.length; i++) {
            let left = parseInt(string.slice(0, i));
            let right = string.slice(i)
            recurse(right, sum - left, result + '+' + left);
            recurse(right, sum + left, result + '-' + left);
        }
    };
    recurse(str, total, '');
};
findSequences('123456789', 100);
