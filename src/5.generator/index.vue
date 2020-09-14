<template>
  <div>看 console.log</div>
</template>

<script>
function* read() {
  yield 1
  yield 2
  yield 3
  return 4
}

const it = read()

let done = false
while (!done) {
  const obj = it.next()
  done = obj.done
  console.log(obj)
}

function* read2() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
  const c = yield 3
  console.log(c)
  return 4
}

let it2 = read2()
it2.next('hello') // 第一次传参是无意义的
it2.next('world') // next传参会传给上一次 yield 的返回值
it2.next('a') // next传参会传给上一次 yield 的返回值
it2.next('b') // next传参会传给上一次 yield 的返回值


export default {

}
</script>
