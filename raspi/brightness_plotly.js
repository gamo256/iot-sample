require('date-utils');
var plotly = require('plotly')('<USER NAME>','<YOUR API KEY>')
var token = '<YOUR STREAMING API TOKEN>';
var raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
  io: new raspi()
});
board.on("ready", function() {
  var virtual = new five.Board.Virtual(
    new five.Expander("PCF8591")
  );
  var a = new five.Sensor({
    // PCF8591 module YL-40
    // A0:LDR(Light Dependent Resistor)
    // A1:NC
    // A2 Thermistor
    // A3:Potentiometer
    pin:"A0",
    board:virtual,
    freq: 10000
  });
  var initdata = [{x:[], y:[], stream:{token:token, maxpoints: 500}}];
  var initlayout = {fileopt : "extend", filename : "Brightness"};
  plotly.plot(initdata, initlayout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
    var stream = plotly.stream(token, function (err, res) {
      console.log(err, res);
    });
    a.on("data", function() {
      console.log(this.value);
      var dt = new Date();
      var xaxis = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
      var streamObject = JSON.stringify({ x : xaxis, y : this.value });
      console.log(streamObject);
      stream.write(streamObject+'\n');
    });
  });
});
