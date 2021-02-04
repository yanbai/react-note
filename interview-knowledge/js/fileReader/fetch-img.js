// http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
// response.blob()用于获取二进制文件。
async function fetchImg(url) {
  const res = await fetch(url)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const img = document.createElement(img)
  img.src = url
}


// response.arrayBuffer() 用于获取流媒体文件
const audioCtx = new window.AudioContext()
const source = audioCtx.createBufferSource()

const response = await fetch('song.ogg')
const buffer = await response.arrayBuffer()

// const decodeData = await audioCtx.decodeAudioData(buffer)
source.buffer = buffer
source.connect(audioCtx.destination)
source.loop = true

// 分块读取内容，显示下载进度
const response = await fetch('flower.jpg')
const reader = response.body.getReader()

while(true) {
  const {
    done,
    value
  } = await reader.read()

  if(done) 
    break
  
    console.log(`received ${value.length} bytes`)
}

