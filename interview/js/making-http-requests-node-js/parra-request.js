const fetch = require('node-fetch')

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4',
  'https://jsonplaceholder.typicode.com/posts/5',
  'https://jsonplaceholder.typicode.com/posts/6',
  'https://jsonplaceholder.typicode.com/posts/7',
  'https://jsonplaceholder.typicode.com/posts/8',
  'https://jsonplaceholder.typicode.com/posts/9',
]

const getData = async url => {
  let res = await fetch(url)
  let json = await res.json()
  console.log(json)
}

// getData(urls[0])
// getData(urls[1])
// getData(urls[2])
// getData(urls[3])

// function paraGet(urls) {
//   let limit = 4
//   let currentReqCount = 0
//   let queue = []
//   const getData = async url => {
//     let res = await fetch(url)
//     let json = await res.json()
//     console.log(json)
//   }
//   for(let i=0, l=urls.length; i<l; i++) {
//     if(currentReqCount<=limit) {
//       queue.push(getData(urls[i]))
//       currentReqCount++
//     }
//   }
//   Promise.race(queue).then()
// }


function parraReq(urls) {
  let arr_a = []
  let arr_b = []

  async function checkReq(arr) {
    if(!arr.length && urls.length)
      arr.push(urls.shift())
    if(arr.length) {
      let url = arr.pop()
      let res = await fetch(url)
      let json = await res.json()
      console.log(json)
      checkReq(arr)
    }
  }

  checkReq(arr_a)
  checkReq(arr_b)
}

parraReq(urls)

// curl -i -X GET \  "https://graph.facebook.com/me?fields=name%2Cemail%2Caddress%2Cage_range%2Cbirthday%2Cfirst_name%2Cgender%2Chometown%2Clanguage s%2Clast_name&access_token=EAAmTKhUBX6MBAFllY1BzZCjMKqb4VaZCISwGSYpjWZAj6aOZAOHv1VjGzbRqVJP6bkcgoZA3sXbZAPg86YycZAc5IgZBEg9uWUqYQWaGuQ8YImh8ZBdSSL4I0e2g4m0yLT39gsUwxWWIECrfm4s4WRS9KqOrMZC6AT9PdItT8u5VuzNceHujoSTZB3fshpMQxTMiOSf27oA2ytyNJ3qLGNZBU5KbcpcLG3AKKp0KvAZArRlMECivhUbZBqz7X7HWlOxtZAxgAoZD"

// curl: (6) Could not resolve host: \
// HTTP/1.1 200 OK
// ETag: "f2dc45a7469e27b4b06cbdea54516ea814d48f11"
// x-app-usage: {"call_count":13,"total_cputime":0,"total_time":2}
// Content-Type: application/json; charset=UTF-8
// facebook-api-version: v7.0
// Strict-Transport-Security: max-age=15552000; preload
// Pragma: no-cache
// x-fb-rev: 1002481006
// Access-Control-Allow-Origin: *
// Cache-Control: private, no-cache, no-store, must-revalidate
// x-fb-trace-id: DPsOqE2Ubys
// x-fb-request-id: AV0GLCT7Ncn-pOkJg0pkQMR
// Expires: Sat, 01 Jan 2000 00:00:00 GMT
// X-FB-Debug: xdaMt4RWDXuyYwi6rfeYiOpxXtf5eLhOMBab6J4+LMLW3MDVh1uGj/qp5+V+3NL2ScvB0liTJcUJSMD9MEfO4w==
// Date: Fri, 07 Aug 2020 10:06:51 GMT
// Alt-Svc: h3-29=":443"; ma=3600,h3-27=":443"; ma=3600
// Connection: keep-alive
// Content-Length: 138

// {"name":"\u5f20\u5ca9\u67cf","email":"zhang_yanbai\u0040163.com","first_name":"\u5ca9\u67cf","last_name":"\u5f20","id":"3069584513089090"}
