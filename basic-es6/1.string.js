// "字符的 Unicode 表示法", 
// "字符串的遍历器接口", 
// "直接输入 U+2028 和 U+2029", 
// "JSON.stringify() 的改造", 
// "模板字符串", 

// "实例：模板编译", 
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

function compile(template) {
  const evalExpr = /<%=(.+?)%>/g
  const expr = /<%([\s\S]+?)%>/g
  
  template = template.replace(evalExpr, '`) \n echo($1) \n echo(`')
                     .replace(expr, '`) \n $1 \n echo(`')
  template = 'echo(`' + template +'`)'
  let script = 
  `(function parse(data) {
    let output = ''
    function echo(html) {
      output += html
    }
    ${template}
    return output
  })
  `
  return script
}

let parse = eval(compile(template))
let res = parse({
  supplies: [
    'a',
    'b',
    'c'
  ]
})

console.log(res)
// "标签模板", 

// 讲各个参数拼回去
// let total = 30
// let msg = passthru`The total is ${total} (${total*1.05} with tax)`
// function passthru(literals) {
//   let res = ''
//   let i=0
//   while(i<literals.length) {
//     res += literals[i++]
//     if(i<arguments.length) {
//       res += arguments[i]
//     }
//   }
//   return res
// }
// msg // "The total is 30 (31.5 with tax)"

// “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容
// let sender = '<script>alert("abc")</script>'
// let message = SaferHtml`<p>${sender} has sent you a message.</p>`
// function SaferHtml(template) {
//   let s = template[0]
//   for(let i=1; i<arguments.length; i++) {
//     let arg = String(arguments[i])

//     s+=arg.replace(/&/g, '&amp;')
//           .replace(/</g, '&lt;')
//           .replace(/>/g, '&gt;')

//     s += template[i]
//   }
//   return s
// }
// console.log(message)

// 国际化处理
// i18n`${homepage.hello}, world`

// let libraryHtml = hashTemplage`
//   <ul>
//     #for book in ${myBooks}
//       <li>#{book.title}</li>
//     #end
//   </ul>
// `


// "模板字符串的限制"