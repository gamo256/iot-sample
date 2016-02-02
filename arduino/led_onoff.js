var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';
var channel = "led-onoff"; // channel名の設定
var five = require("johnny-five");
var board = new fiv  e.Board();
board.on("ready", function() {
  var led = new five.Led(5);
  // PubNub初期化
  var pubnub = require("pubnub")({
    ssl : true,
    publish_key	: publishKey,
    subscribe_key : subscribeKey
  });
  // channel購読(データの受信)
  pubnub.subscribe({
    channel  : channel,
    callback : function(message) {
      console.log('>', message);
      if(message.action === 'on') {
        led.on()
      } else {
        led.off();
      }
    }
  });
});
