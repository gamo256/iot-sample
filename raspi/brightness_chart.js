var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';
var channel = "brightness"; // channel名の設定
var raspi = require('raspi-io');
var five = require("johnny-five");
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
  // PubNub初期化
  var pubnub = require("pubnub")({
    ssl : true,
    publish_key   : publishKey,
    subscribe_key : subscribeKey
  });
  a.on("data", function() {
    console.log(this.value)
    // パブリッシュ(送信)するデータを変数dataに格納
    var data = {eon:{'brightness' : this.value}};
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
