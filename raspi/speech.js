var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';
var channel = "speech";
var raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
  io: new raspi()
});
board.on("ready", function() {
  var led = new five.Led('P1-7');
  // PubNub初期化
  var pubnub = require("pubnub")({
    ssl : true,
    publish_key : publishKey,
    subscribe_key : subscribeKey
  });
  // channel購読(データの受信)
  pubnub.subscribe({
    channel  : channel,
    callback : function(message) {
      var message = message.replace(/^[\s　]+|[\s　]+$/g, "");
      console.log('>', message);
      if(message === 'スイッチオン') {
        led.on()
      } else {
        led.off()
      }
    }
  });
});
