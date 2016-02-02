var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
  io: new raspi()
});
board.on('ready', function(){
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
    board:virtual
  });
  a.on("change", function(){
    console.log(this.value);
  });
});
