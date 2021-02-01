function swap(arr, first, last){
    var temp = arr[first];    
    arr[first] = arr[last];
    arr[last] = temp;
}

function swapStr(str, first, last){
    var arr = str.split('');
    swap(arr, first, last); // Your swap function
    return arr.join('');
}

function reverse(str) {
    let start = 0
    let end = 0
    let point = 0
    for(let i=0, l=str.length; i<l; i++) {
        if(str[i] === ' ') {
            end = i
            wordLength = end - start
            str = swapStr(str, point, wordLength-point)
            start = i
            point ++
            // let str_1 = str.slice(0, start)
            // let str_2 = str.slice(end)
            // str = str_1 + reverse.reverse().join() + str_2

            // reverse = []
        }
        //     index++
    }
    return str
    // for(let i=0, l=arr.length; i<l; i++) {
    //     for(let j=0, m=arr[i].length; j<m; j++) {
    //         reverse[i].push(arr[i][j])
    //     }
    // }
    // for(let i=0, l=reverse.length; i<l; i++) {
    //     while(reverse[i].length) {
    //         res += reverse[i].pop()
    //     }
    //     // res += ' '
    // }
}
// console.log(reverse('this   is an apple'))


// function reverseWords(s) {
//     let length = s.length
//     if(!length)
//         return s
//     let left = 0
//     let right = 0
//     while(right<length){
//         while(right<length && s[right]!=' ') {
//             right++
//         }
//         let next = right-- + 1
//         while(left<right)
//             swap(s[left++], s[right--])
//         left = next
//         right = next
//     }
//     return s
// }

// console.log(reverseWords('this   is an apple'))


function reverseWords(str) {
    let arr = str.split('').reverse().join('')
    return arr.split(' ').reverse().join(' ')
}

console.log(reverseWords('this is an apple'))


var reverseWords = function(s) {
    let start = 0
    let end = 0
    for(let i  =  0; i < s.length; i ++){
        if(s[i] === " " || i === s.length - 1){
            end = i === s.length - 1 ? i + 1: i
            const str = s.slice(start, end).split("").reverse().join("")
            s = s.slice(0, start).concat(str, s.slice(end, s.length))
            start = i + 1
        }
    }
    return s
};


