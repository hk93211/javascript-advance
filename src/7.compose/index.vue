<template>
  <div>看 console.log</div>
</template>

<script>
// 会用reduce
// 前置知识, 实现一个数组扁平化的方法
const fla = function (arr) {
  return arr.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return prev.concat(fla(curr))
    }
    return prev.concat(curr)
  }, [])
}

const arr = [1, [2, [3, [4, [5]]]]]

console.log(fla(arr))

// 练习: 实现一个 compose 函数, 将 a(b(c('1', '2')))  转化成 compose(a, b, c)('1', '2') 结果跟原来一样
function c(a, b) {
  return String(a) + String(b)
}

function b(str) {
  if (!str) return 0
  return str.length
}

function a(len) {
  return '长度为: ' + len
}

console.log(a(b(c('1', '222'))))

// 第一种写法
// const compose = (...fns) => (...args) => fns.reduceRight((prev, curr) => curr(prev), fns.pop()(...args))

// 第二种写法:
const compose = (...fns) => fns.reduce((prev, curr) => (...args) => prev(curr(...args)))

console.log(compose(a, b, c)('2333', '222'))

// 作业: 自己实现数组的 reduce 方法

Array.prototype.mockReduce = function (callback, initialValue) {
  if (!this || !this.length) throw new Error('需要传入数组且数组需要有长度')
  const array = this.concat()

  let isUndefined = initialValue === undefined
  let prev = isUndefined ? array[0] : initialValue
  const initialI = initialValue === undefined ? 1 : 0

  for (let i = initialI; i < array.length; i++) {
    prev = callback(prev, array[i])
  }

  return prev
}

let temp = [1, 2, 3]

const r = temp.reduce((prev, curr) => {
  console.log(prev, curr)
  return prev + curr
}, 0)

const r1 = temp.mockReduce((prev, curr) => {
  console.log(prev, curr)
  return prev + curr
}, 0)

console.log(r, r1)

export default {

}
</script>

<style>
</style>