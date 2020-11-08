# File upload

## 概念介绍
```md
FILE API
  file api是HTML5中新添加在DOM中的特性，用来网络系统读取用户本地文件。选择的本地文件可以是input type=file或者dtap and drop

  input type=file元素的files属性，是一个数组。每个file对象有name（不包含path），size，type

  drag and drop:
    dragenter, dragover, and drop events
    const dt = e.dataTransfer;
    const files = dt.files;
FILEReader
  FILEReader对象使得浏览器异步读取用户本地文件（或者原始数据buffer），通过File或者BLOB描述读取的文件或者数据
  FileReader.readAsArrayBuffer(), FileReader.readAsBinaryString(), FileReader.readAsDataURL(), FileReader.readAsText()
  见blob example
FILE
  file对象从filelist中来，除了上述两种途径以外，canvas也可以获取file对象
  file对象是一种特殊的BLOB，获得file对象或者blob对象后需要给其他API读取，比如FileReader, URL.createObjectURL(), createImageBitmap(), XMLHttpRequest.send() 都支持BLOB和FILE
BLOB
  blob是一种描述文件de不可更改的原始数据对象
  可以以text，binary data，data url， array buffer的形式读取，也可以被转为ReadableStream，URL
  Blob.prototype.arrayBuffer, Blob.prototype.stream, Blob.prototype.text

data:url
  representing file data as base64 encoded string
ArrayBuffer
  raw binary data buffer 原始二进制数据缓冲区，是一个字节数组
  无法直接操作ArrayBuffer里面的内容，要创建一个typed array object或者dataview对象，用来以具体的格式表示缓冲区，然后用来读写缓冲区
```
## example 显示缩略图
in ./js/practice/File-showThumb-1.html
./js/practice/File-showThumb-2.html
## example 使用 object urls 显示图片
## example 上传用户文件
in ./js/practice/File-fileuploading.html
## example 使用 object urls 显示PDF
## example 使用 object urls 显示其他文件类型
## 储存为何种格式?
  使用FileReader读取file对象，具体哪种格式要和后端协商，可以有buffer，binary string，data url， text
  EKYC方案是：把图片的dataurl转化成file，file转成FormData，用formdata异步传输给后端
  ```js
  const formData = new FormData()
  formData.append('file', value, 'png')
  ```
  formdata 是一种方便xhr对象发送的键值对，他和编码类型为'multipart/form-data'的form表单上传格式一致
## 如何显示progress
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener("progress", function(e) {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded * 100) / e.total);
      self.ctrl.update(percentage);
    }
  }, false);

  xhr对象的upload progress事件的event里面有total 和 loaded
## 如何限制上传文件类型
  file.type

# 从multipart/form-data 到 ajax原理
request header 里面 content-type:
1. text/plain (xhr默认)
  请求体为字符串 时 以request payload形式 不会展开
2. application/x-www-form-urlencoded (jq默认)
  请求体为字符串 时 以formdata形式 会展开
  请求体若为object 请求体为[object Object]
  请求体还可以是blob和formdata
    let form = $('#form')[0]
    xhr.send(new FormData(form))
  都会转成字符串发送 以 & 分隔
3. application/json
  请求体需要stringify
  json parse比较麻烦 但是复杂请求体比较简洁
  urlencoded parse比较简单 split('&')，但是解析二维数组要拆成m*n个字段
4. multipart/form-data
  每个字段之间用一个随机字符串(boundary)隔开，内容就不需要进行转义

