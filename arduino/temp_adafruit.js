var five = require("johnny-five");
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://io.adafruit.com', {
  port:1883,
  username:'<USER NAME>',
  password:'<YOUR AIO KEY>'
});
client.on('connect', function () {
  five.Board().on("ready", function() {
    var temperature = new five.Thermometer(
      controller: "LM35",
      pin: "A0",
      freq: 10000
  });
  temperature.on("data", function() {
    var temp = this.celsius.toFixed(2);
      console.log(temp+ "��C");
      // Topic Name(�g�s�b�N��)�́u<user name>/feeds/<feed name>�v�̌`���Ŏw��
      client.publish('[Topic Name]',String(temp));
    });
  })
});
