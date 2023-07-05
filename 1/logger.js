const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    // raise a event message
    this.emit("myMessage", {
      id: 1,
      message: "hello, Bob",
    });
  }
}

module.exports = Logger;
