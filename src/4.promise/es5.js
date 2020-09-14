var PENDING = 'pending'
var FULLFILLED = 'fullfilled'
var REJECTED = 'rejected'

function Promise(excutor) {
  var that = this
  this.state = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFullfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(value) {
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

Promise.prototype.then = function (onFulfilled, onRejected) {
  var _this = this
  if (this.state === FULLFILLED) {
    onFulfilled(this.value)
  } else if (this.state === REJECTED) {
    onRejected(this.reason)
  } else if (this.state === PENDING) {
    this.onFullfilledCallbacks.push(function () {
      onFulfilled(_this.value)
    })
    this.onRejectedCallbacks.push(function () {
      onRejected(_this.reason)
    })
  }
}

module.exports = Promise