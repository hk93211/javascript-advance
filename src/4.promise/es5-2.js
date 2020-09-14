// 升级版
// promise可以返回一个普通值
// promise实现链式调用就是通过返回一个新的promise

var PENDING = 'pending'
var FULLFILLED = 'fullfilled'
var REJECTED = 'rejected'

/**
 * 
 * @param {Object} promise promise
 * @param {Any} x onFUll
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('死循环了'))
  }
  if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    try {
      var then = x.then
      var called = false
      if (typeof then === 'function') { // 只能认为他是promise了
        then.call(x, function (y) { // y可能是promise, 所以要继续解析, 直到y为普通值
          if (called) return called = true
          resolvePromise(promise, y, resolve, reject)
        }, function (r) {
          if (called) return called = true
          reject(r)
        }, x)
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return called = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

function Promise(excutor) {
  var that = this
  this.state = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFullfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(value) {
    if (value instanceof Promise) {
      value.then(resolve, reject)
      return
    }
    if (that.state === PENDING) {
      that.state = FULLFILLED
      that.value = value
      that.onFullfilledCallbacks.forEach(function (fn) {
        fn && fn()
      })
    }
  }

  function reject(reason) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.reason = reason
      that.onRejectedCallbacks.forEach(function (fn) {
        fn && fn()
      })
    }
  }

  try {
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
  onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : function (data) { return data }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err }
  var that = this
  var newPromise = new Promise(function (resolve, reject) {
    if (that.state === FULLFILLED) {
      setTimeout(function () {
        try {
          var x = onFullfilled(that.value)
          console.log(newPromise)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    } else if (that.state === REJECTED) {
      setTimeout(function () {
        try {
          var x = onRejected(that.reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    } else if (that.state === PENDING) {
      that.onFullfilledCallbacks.push(function () {
        try {
          var x = onFullfilled(that.value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      that.onRejectedCallbacks.push(function () {
        try {
          var x = onRejected(that.reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
  })

  return newPromise
}

function isPromise(x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    if (typeof x.then === 'function') return true
  }
  return false
}

Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) {
    resolve(value)
  })
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value)
  })
}

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var arr = []
    var idx = 0
    function processData(value, index) {
      arr[index] = value
      if (++idx === promises.length) {
        resolve(arr)
      }
    }
    for (var i = 0; i < promises.length; i++) {
      // es5的写法, 由于没有let声明变量, 所以使用闭包
      (function (i) {
        var currentValue = promises[i]
        if (isPromise(currentValue)) {
          currentValue.then(function (y) {
            processData(y, i)
          }, reject)
        } else {
          processData(currentValue, i)
        }
      })(i)
    }
  })
}

module.exports = Promise