const fetch = require('node-fetch')
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const getData = async url => {
  let res = await fetch(url)
  let json = await res.json()
  console.log(json)
}

getData(url)
