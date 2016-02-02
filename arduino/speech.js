var publishKey = 'pub-c-d1172091-ff3a-4e21-ba44-8ccff8959af3';
var subscribeKey = 'sub-c-c8f6cb7e-a505-11e5-a586-0619f8945a4f';
var channel = "speech";


var five = require("johnny-five");
var board = new five.Board();
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
      var message = message.replace(/^[\s　]+|[\s　]+$/g, "");
      console.log('>', message);
      if(message === 'スイッチオン') {
        led.on()
      } else {
        led.off();
      }
    }
  });
});
