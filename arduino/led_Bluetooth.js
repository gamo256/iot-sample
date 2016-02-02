var five = require("johnny-five");
var board = new five.Board({port:'COM29'});
board.on("ready", function() {
  var led = new five.Led(5);
  led.blink(500);
});
