// 观察者模式

class Subject {
  // 被观察者

  constructor(name) {
    this.name = name
    this.state = '开心'

    this.observers = [] // 存放观察者的数组
  }

  attach (o) {
    // 需要将注册者放到自己的身上

    this.observers.push(o)
  }

  setState (state) {
    // 更新被观察者的状态  要通知所有观察者 ()
    this.state = state
    this.observers.forEach(o => {
      o.update(this)
    })
  }

}

class Observer {
  // 观察者

  constructor(name) {
    this.name = name

  }

  update (s) {
    // 被观察者的状态发生变化要调用这个方法
    // console.log(s)

    console.log(this.name, '收到了', s.name, '当前的状态是', s.state)
  }
}

// 观察者要等待 被观察者 状态有变化的时候 拿到新的状态


let baby = new Subject('宝宝')

let father = new Observer('爸爸')
let mother = new Observer('妈妈')

baby.attach(father)
baby.attach(mother)

baby.setState('不开心')
setTimeout(() => {
  baby.setState('很不开心')
}, 2000)