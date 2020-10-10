var PENDING = 'pending'
var FULLFILLED = 'fullfilled'
var REJECTED = 'rejected'

function Promise1 (excutor) {
  var that = this

  this.state = PENDING
  this.value = undefined
  this.reason = undefined

  this.onFullfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve (value) {
    if (that.state === PENDING) {
      that.state = FULLFILLED
      that.value = value
      that.onFullfilledCallbacks.forEach(function (cb) {
        cb && cb(that.value)
      })
    }
  }

  function reject (reason) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.reason = reason
      that.onRejectedCallbacks.forEach(function (cb) {
        cb && cb(that.reason)
      })
    }
  }

  try {
    excutor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

Promise1.prototype.then = function (onFullfilled, onRejected) {
  var that = this
  if (this.state === FULLFILLED) {
    onFullfilled(this.value)
  } else if (this.state === REJECTED) {
    onRejected(this.reason)
  } else {
    this.onFullfilledCallbacks.push(function () {
      onFullfilled(that.value)
    })
    this.onRejectedCallbacks.push(function () {
      onRejected(that.reason)
    })
  }
}