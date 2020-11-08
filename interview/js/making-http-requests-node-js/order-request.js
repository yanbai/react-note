const fetch = require('node-fetch')
const url = 'https://jsonplaceholder.typicode.com/posts/1'
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4'
]

const getData = async url => {
  let res = await fetch(url)
  let json = await res.json()
  console.log(json)
}

// (async function() {
//   await getData(urls[0])
//   await getData(urls[1])
//   await getData(urls[2])
//   await getData(urls[3])
// })()

function orderRequest_1(urls) {
  // request data
  const promises = urls.map(v=>fetch(v).then(res => res.json()))
  // order output
  promises.reduce((acc, cur) => {
    return acc.then(() => cur).then(v => console.log(v))
  }, Promise.resolve())
}

async function orderRequest_2(urls) {
  for(const url of urls) {
    const res = await fetch(url)
    console.log(await res.json())
  }
}

async function orderRequest_3(urls) {
  const promises = urls.map(async url => {
    const res = await fetch(url)
    return res.json()
  })

  for (const promiese of promises) {
    console.log(await promiese)
  }
}

function requestSequence(arr) {
  return arr.reduce((arr, cur) => arr.then(cur), Promise.resolve(''))
}


function makePromise(url) {
  return new Promise((res, rej) => {
    let res = await fetch(url)
    let json = await res.json()
    res(json)
  })
}

// requestSequence([makePromise(urls[0]), makePromise(urls[1])])

// orderRequest_3(urls)


const waits = [$.ajax('/'), $.ajax('/robots.txt')];
const callback = (ix) => {
  if (ix < waits.length) {
    waits[ix]
      .then(() => {
        callback(ix + 1);
      });
  }
};

callback(0);
