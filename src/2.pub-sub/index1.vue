<template>
  <div>看 console.log</div>
</template>

<script>
class Publisher {
  constructor(...args) {
    // super(...args)
  }

  notify(url, cb) {
    cb(url);
  }
}

class EventChannel {
  constructor(...args) {
    // super(...args)
    this.events = {};
    this.uId = -1;
  }

  publish(eventType, url) {
    if (!this.events[eventType]) return false;

    const subscribers = this.events[eventType];
    let count = subscribers ? subscribers.length : 0;

    while (count--) {
      const subscriber = subscribers[count];
      subscriber.handler(eventType, subscriber.taskId, url);
    }
  }

  subscribe(eventType, handler) {
    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }

    const taskId = (++this.uId).toString();
    this.events[eventType].push({
      taskId,
      handler
    });

    return taskId;
  }
}

const Publisher1 = new Publisher();

const EventChannel1 = new EventChannel();

const subscriber = (eventType, taskId, url) => {
  console.log(eventType, taskId, url);
};

EventChannel1.subscribe("test", subscriber);
EventChannel1.subscribe("test1", subscriber);
EventChannel1.subscribe("test", subscriber);
EventChannel1.subscribe("test", subscriber);

setTimeout(() => {
  Publisher1.notify("123321123", url => {
    EventChannel1.publish("test", url);
  });
}, 1000);
</script>
