var raspi = require('raspi-io');
var five = require("johnny-five");
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://io.adafruit.com', {
  port: 1883,
  username: '<USER NAME>',
  password: '<YOUR AIO KEY>'
});
client.on('connect', function () {
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
    a.on("data", function(){
      console.log(this.value / 10);
      // Topic name(�g�s�b�N��)���u<user name>/feeds/<feed name>�v�̌`���Ŏw��
      client.publish('[Topic name]',String(this.value / 10));
    });
  });
});
