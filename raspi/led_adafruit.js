var raspi = require('raspi-io'); 
var five = require("johnny-five");
  var board = new five.Board({
    io: new raspi()
  });
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://io.adafruit.com', {
  port:1883,
  username:'<USER NAME>',
  password:'<YOUR AIO KEY>' });
client.on('connect', function () {
  // Topic name(�g�s�b�N��)���u<user name>/feeds/<feed name>�v�̌`���Ŏw�肷��
  var feed = '<Topic name>';
  client.subscribe(feed);
  client.publish(feed,'OFF');
});
board.on("ready", function() {
  var led = new five.Led('P1-7');
  // ���b�Z�[�W�̎�M
  client.on('message', function (topic, message) {
    console.log(message.toString());
    if(message.toString() === 'ON'){  
      led.on();
    } else {
      led.off();
    }
  });
});
