<template>
  <div>看 console.log</div>
</template>

<script>
// let Promise = require('./es5')
// let Promise = require('./es6')
// let Promise = require('./es5-2')

// let read = () => new Promise(resolve => {
//   setTimeout(() => {
//     resolve('all 来了')
//   }, 1500)
// })

// Promise.all([1, read(), 3]).then(res => {
//   console.log(res)
// })

// var promise = new Promise((resolve, reject) => {
//   console.log('这里是立即执行的')
//   // setTimeout(() => {
//   //   resolve('这是返回的value')
//   //   reject('这是返回的error')
//   // }, 2000)
//   resolve('sssss')
// })

// p2 = promise.then(data => {
//   console.log(data)
//   // 1.一般情况 返回一般值的情况
//   // return 100

//   // 2.其他情况 返回promise的情况
//   // return new Promise((resolve, reject) => {
//   //   setTimeout(() => {
//   //     resolve('ppp')
//   //   }, 1000)
//   // })

//   // 3.返回的promise里面的resolve值还是一个promise 的情况
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//           reject(1)
//         }, 1000)
//       }))
//     }, 1000)
//   })
// })

// p2.then().then(data => {
//   console.log(data)
// }, err => console.log(err))

// promise
//   .then((data) => {
//     console.log(data)
//     return data + '~~~'
//   }, err => console.log(err))
//   .then(data => {
//     console.log(data)
//   })

// var p3 = new Promise((resolve, reject) => {
//   resolve('b')
// })

// var p1 = new Promise((resolve, reject) => {
//   resolve(p3)
// })

// var p2 = new Promise((resolve, reject) => {
//   resolve('a')
// })

// p1.then(v => {
//   console.log(v)
// })
// p2.then(v => {
//   console.log(v)
// })

function resolveLater(resolve, reject) {
  setTimeout(function () {
    resolve(10);
  }, 1000);
}
function rejectLater(resolve, reject) {
  setTimeout(function () {
    reject(new Error('Error'));
  }, 1000);
}

var p1 = Promise.resolve('foo');
var p2 = p1.then(function () {
  // Return promise here, that will be resolved to 10 after 1 second
  return new Promise(resolveLater);
});
p2.then(function (v) {
  console.log('resolved', v);  // "resolved", 10
}, function (e) {
  // not called
  console.error('rejected', e);
});

var p3 = p1.then(function () {
  // Return promise here, that will be rejected with 'Error' after 1 second
  return new Promise(rejectLater);
});
p3.then(function (v) {
  // not called
  console.log('resolved', v);
}, function (e) {
  console.error('rejected', e); // "rejected", 'Error'
});

</script>