<template>
  <div>看 console.log</div>
</template>

<script>
// 定义发布者类
function DataHub() { }

DataHub.prototype.notify = function (url, callback) {
  callback(url)
}

// 定义事件通道类
function DownloadManager() {
  this.events = {}
  this.uId = -1
}

DownloadManager.prototype.publish = function (eventType, url) {
  if (!this.events[eventType]) return false

  var subscribers = this.events[eventType]
  var count = subscribers ? subscribers.length : 0

  while (count--) {
    var subscriber = subscribers[count]
    subscriber.handler(eventType, subscriber.taskId, url)
  }
}

DownloadManager.prototype.subscribe = function (eventType, handler) {
  if (!this.events[eventType]) {
    this.events[eventType] = []
  }

  var taskId = (++this.uId).toString()

  this.events[eventType].push({
    taskId,
    handler
  })

  return taskId
}

// 创建一个数据中心(发布者)
var dataHub = new DataHub()

// 创建一个下载事件管理器(数据中心)
var downloadManager = new DownloadManager()

// 创建一个下载器(订阅者)
var dataLoader = function (eventType, taskId, url) {
  console.log('taskId: ', taskId, 'loading from', url)
}

var dataLoader2 = function (eventType, taskId, url) {
  console.log('dataLoader2: 订阅', eventType, taskId, url)
}

// 用户来请求数据了
downloadManager.subscribe('dataReady', dataLoader)
downloadManager.subscribe('dataReady', dataLoader2)

// 数据打包完成了
setTimeout(() => {
  dataHub.notify('http://haha.com', function (url) {
    downloadManager.publish('dataReady', url)
  })
}, 3000)

</script>
