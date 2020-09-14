import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vconsole from 'vconsole'
import * as dd from 'dingtalk-jsapi'

new Vconsole();

dd.ready(function () {
  Vue.prototype.$dd = dd
  // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
  dd.runtime.permission.requestAuthCode({
    corpId: 'dingdd8b2c5ed21ab5e324f2f5cc6abecb85',
    onSuccess: function (result) {
      // {
      //   code: 'hYLK98jkf0m' //string authCode
      // }
      console.log(result)
    },
    onFail: function (err) {
      console.log(err)
    }
  })
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
