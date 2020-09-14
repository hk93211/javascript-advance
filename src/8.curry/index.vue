<template>
  <div>看 console.log</div>
</template>

<script>
function currying (fn, args) {
  args = args || []

  return function () {
    var _args = Array.prototype.slice.call(arguments)

    _args = args.concat(Array.prototype.slice.call(_args))
    if (_args.length < fn.length) {
      return currying(fn, _args)
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

</script>
