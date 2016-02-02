var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';
var channel = "temperature"; // channel名の設定
var five = require("johnny-five");
var board = new five.Board({port: "COM3"});
board.on("ready", function() {
    var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  // PubNub初期化
  var pubnub = require("pubnub")({
    ssl : true,
    publish_key   : publishKey,
    subscribe_key : subscribeKey
  });
  temperature.on("data", function() {
    console.log(this.celsius)
   // パブリッシュ(送信)するデータを変数dataに格納
    var data = {eon:{'temperature' : this.celsius}};
    // データのパブリッシュ(送信)
    pubnub.publish({
      channel : channel,
      message : data,
      callback : function(message) {
        console.log(message);
      }
    });
  });
});
