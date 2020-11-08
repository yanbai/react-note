function swapStr(str, first, last){
  return str.substr(0, first)
         + str[last]
         + str.substring(first+1, last)
         + str[first]
         + str.substr(last+1);
}
function swapStr(str, first, last){
  var arr = str.split('');
  swap(arr, first, last); // Your swap function
  return arr.join('');
}
"mandarin".replace(/^(\w)(.*)(\w)$/,"$3$2$1")// outputs nandarim ==> m is last character and n is first letter
