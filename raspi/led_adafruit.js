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
  // Topic name(トピック名)を「<user name>/feeds/<feed name>」の形式で指定する
  var feed = '<Topic name>';
  client.subscribe(feed);
  client.publish(feed,'OFF');
});
board.on("ready", function() {
  var led = new five.Led('P1-7');
  // メッセージの受信
  client.on('message', function (topic, message) {
    console.log(message.toString());
    if(message.toString() === 'ON'){  
      led.on();
    } else {
      led.off();
    }
  });
});
