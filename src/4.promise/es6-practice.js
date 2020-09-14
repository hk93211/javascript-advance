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

      this.onFullfilledCallbacks.forEach(callback => {
        callback && callback()
      })
    }

    const reject = reason => {
      if (this.state !== PENDING) return
      this.state = REJECTED
      this.reason = reason

      this.onRejectedCallbacks.forEach(callback => {
        callback && callback()
      })
    }

    try {
      excutor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onFullfilled, onRejected) {
    if (this.state === FULLFILLED) {
      onFullfilled(this.value)
    } else if (this.state === REJECTED) {
      onRejected(this.reason)
    } else {
      this.onFullfilledCallbacks.push(() => {
        onFullfilled(this.value)
      })

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}