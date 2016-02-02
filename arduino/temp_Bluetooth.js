var five = require("johnny-five");
var board = new five.Board({port:'COM29'});
board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
  });
  temperature.on("change", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
  });
});
