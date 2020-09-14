<template>
  <div>看 console.log</div>
</template>

<script>
// 定义一个 DownloadTask 类作为观察者
function DownloadTask(id) {
  this.id = id
  this.loaded = false
  this.url = null
}

DownloadTask.prototype.finish = function (url) {
  this.loaded = true
  this.url = url
  console.log(`Task ${this.id} load data from ${this.url}`)
}

// 定义一个 DataHub 作为被观察目标
function DataHub() {
  this.downloadTasks = []
}

DataHub.prototype.addDownloadTask = function (downloadTask) {
  this.downloadTasks.push(downloadTask)
}

DataHub.prototype.removeDownloadTask = function (downloadTask) {
  this.downloadTasks = this.downloadTasks.filter(i => i !== downloadTask)
}

DataHub.prototype.notify = function (url) {
  const downloadTaskCount = this.downloadTasks.length
  for (let i = 0; i < downloadTaskCount; i++) {
    this.downloadTasks[i].finish(url)
  }
}

// 创建一个数据中心
var dataHub = new DataHub()

// 现在用户来取数据了，创建两个任务
var d1 = new DownloadTask(1)
var d2 = new DownloadTask(2)

// 要将观察者放到被观察者之上
dataHub.addDownloadTask(d1)
dataHub.addDownloadTask(d2)

// 数据打包完成了(模拟异步)
setTimeout(() => {
  dataHub.notify('https://baidu.com')
}, 1000)

setTimeout(() => {
  dataHub.notify('https://baidu.com')
}, 2000)

</script>

<style>
</style>