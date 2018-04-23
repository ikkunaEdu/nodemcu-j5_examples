const {EtherPortClient} = require("etherport-client");
const {Board, Servo, Fn} = require('johnny-five');
const temporal = require('temporal');

const board = new Board({
  port: new EtherPortClient({
    host: "192.168.0.113",  // IP ESP8266
    port: 3030
  }),
  timeout: 10000,
  repl: false
});

board.on('ready', onReady);

function onReady() {
  var servo1 = new Servo(5);
  var servo2 = new Servo(0);
  var servo3 = new Servo(4);

  servo3.min();

  this.loop(5000, () => oc())
  function oc() {
    temporal.queue(
      [
      {
        delay: 2500,
        task: function () {
          servo1.to(0);
          servo2.to(180)
        }
      },
      {
        delay: 2500,
        task: function () {
          servo1.to(40);
          servo2.to(140);
        }
      }
  
    ])
  }

}