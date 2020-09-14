<template>
  <div>看 console.log</div>
</template>

<script>
/* eslint-disable */
// 发布订阅模式
let e = {
  _obj: {},
  _callback: [],

  // 订阅就是将callback函数放到数组中
  on (callback) {
    this._callback.push(callback)
  },

  // 发布就是让订阅的的数组中的方法 依次执行
  emit (key, value) {
    this._obj[key] = value
    this._callback.forEach(method => method(this._obj))
  }
}

// 每次发布(emit) 都会触发此函数 (发布应该触发订阅)
e.on(function (obj) {
  // ... 可以写对应的逻辑 (根据 obj 来写自己需要的逻辑)
  console.log(obj)
})

// 多个类之间可以解除耦合关系
setTimeout(() => {
  e.emit('time1', 123)
}, 1000)

setTimeout(() => {
  e.emit('time2', 222)
}, 2000)
</script>