function Observer(data) {
  this.data = data

  for(let key in data) {
    if(data.hasOwnProperty(key)) {
      let val = data[key]
      if(typeof data[key] === 'object') {
        new Observer(val)
      } else {
        this.convert(key, val)
      }
    }
  }
}

Observer.prototype.convert = function(key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(key + ' reading')
      return val
    },
    set(newVal) {
      console.log(`${key} is set to ${newVal}`)
      val = newVal
    }
  })
}

let app = new Observer({
  name: 'zhangsan',
  age: 24,
  address: {
    city: 'fuzhou'
  }
})

app.data.name
app.data.age = 18
app.address.city = 'xiamen'
