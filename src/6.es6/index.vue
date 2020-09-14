<template>
  <div>看 console.log</div>
</template>

<script>
// es5的类实现继承是通过  call + Object.create 来做的
// 等价于 es6 extends

var Animal = function () {
  this.name = '动物'
}

Animal.prototype.say = function () {
  console.log('说话')
  return 'say'
}

function Tiger() {
  Animal.call(this)
}

Tiger.prototype = new Animal()
var tiger = new Tiger()
console.log(tiger.name, tiger.say)

export default {

}
</script>
