const {EtherPortClient} = require("etherport-client");
const {Board, Button} = require('johnny-five');
const TogglClient = require('toggl-api');
const toggl = new TogglClient({apiToken: ''});

const board = new Board({
  port: new EtherPortClient({
    host: "192.168.1.144",  // IP ESP8266
    port: 3030
  }),
  timeout: 10000,
  repl: false
});

board.on('ready', onReady);

function onReady() {
  const mainTask = new Button(16);
  const interruption = new Button(5);
  mainTask.on("press", () => {
    toggl.startTimeEntry({
    description: 'Work, work.'
    }, function(err, timeEntry) {})
  });
  interruption.on("press", () => {
    toggl.startTimeEntry({
      description: 'Interrupted'
    }, function(err, timeEntry) {})
  });
}