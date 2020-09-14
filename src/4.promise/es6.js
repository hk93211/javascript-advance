const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class Promise {
  constructor(excutor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFullfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.state !== PENDING) return
      this.state = FULLFILLED
      this.value = value
      this.onFullfilledCallbacks.forEach(fn => fn())
    }

    const reject = reason => {
      if (this.state !== PENDING) return
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn())
    }
    try {
      excutor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFullfilled, onRejected) {
    if (this.state === FULLFILLED) {
      onFullfilled(this.value)
    } else if (this.state === REJECTED) {
      onRejected(this.reason)
    } else if (this.state === PENDING) {
      this.onFullfilledCallbacks.push(() => {
        // do something
        onFullfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        // do something
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
