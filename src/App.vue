<template>
  <div id="app">
    <button @click="handleClick">handleClick</button>
    <button @click="datepick">datepick</button>
    <button @click="wifi">wifi</button>
    <!-- <hr /> -->
    <div v-for="link in links" :key="link.path">
      <router-link :to="link.path">{{ link.name }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import '@/3.observer/index.js'
export default {
  data () {
    return {
      links: [
        { name: '首页', path: '/' },
        { name: 'test', path: '/test' },
        { name: '高阶函数', path: '/high-order' },
        { name: '发布订阅模式', path: '/pub-sub' },
        { name: '观察者模式', path: '/observer' },
        { name: '实现promise', path: '/promise' },
        { name: 'generator', path: '/generator' },
        { name: 'es6', path: '/es6' },
        { name: 'compose', path: '/compose' },
        { name: 'curry', path: '/curry' }
      ]
    }
  },

  methods: {
    handleClick () {
      this.$dd.device.notification.alert({
        message: '测试',
        title: '提示', // 可传空
        buttonName: '收到',
        onSuccess: function () {
          // onSuccess将在点击button之后回调
          /* 回调 */
        },
        onFail: function (err) { }
      })
    },

    datepick () {
      this.$dd.biz.util.datepicker({
        format: 'yyyy-MM-dd', // 注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: '2015-04-17', // 默认显示日期
        onSuccess: function (result) {
          // onSuccess将在点击完成之后回调
          /* {
              value: "2015-02-10"
          }
          */
        },
        onFail: function (err) { }
      })
    },

    wifi () {
      this.$dd.device.base.getPhoneInfo({
        onSuccess: function (data) {
          /*
          {
              ssid: 'alibaba-inc',
              macIp: '3c:12:aa:09'
          }
          */
          console.log(data)
        },
        onFail: function (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
