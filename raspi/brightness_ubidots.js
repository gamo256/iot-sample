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
    // A1:Thermistor
    // A2：NC
    // A3:Potentiometer
    pin:"A0",
    board:virtual,
    freq: 10000
  });
  var ubidots = require('ubidots');
  var client = ubidots.createClient('<Your API Key>');
  client.auth(function () {
    this.getDatasources(function (err, data) {
    console.log(data.results);
  });
  // データ保存先のVariableを取得
  var v = this.getVariable('<Variable ID>')
  a.on("data", function(){
    v.saveValue(this.value); // Variableにデータを保存
      console.log(this.value);
    });
  });
});
