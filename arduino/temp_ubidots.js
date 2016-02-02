  var five = require("johnny-five");
  five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 60000 // サンプリング間隔(ms)
  });
  var ubidots = require('ubidots');
  var client = ubidots.createClient('<Your API Key>');
  client.auth(function () {
    this.getDatasources(function (err, data) {
      console.log(data.results);
    });
    // データ保存先のVariableを取得
     var v = this.getVariable('<Variable ID>');
      temperature.on("data", function() {
        v.saveValue(this.celsius); // Variableにデータを保存
        console.log(this.celsius + "°C");
      });
    });
});
