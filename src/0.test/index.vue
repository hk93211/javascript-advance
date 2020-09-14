<template>
  <div>
    1
  </div>
</template>

<script>
function currying (fn, args) {
  args = args || []
  var arity = fn.length
  console.log(args)

  return function (..._args) {
    Array.prototype.unshift.call(_args, ...args)

    if (_args.length < arity) {
      return currying.call(null, fn, _args)
    }

    return fn.apply(null, _args)
  }
}

const _filter = (handle, array) => array.filter(handle)
const _map = (handle, array) => array.map(handle)

const _find = currying(_filter)

const _mapNewArray = currying(_map)

const filterGreater100 = _find(item => item > 5)

const mapNewArray = _mapNewArray(item => item + '%')

console.log(filterGreater100([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(mapNewArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

export default {

}
</script>

<style>
</style>
