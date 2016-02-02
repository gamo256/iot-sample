var request = require('request');
var event = '<Event Name>';
var key = '<Your Key>';
var url = 'https://maker.ifttt.com/trigger/' + event + '/with/key/' + key;
var options = {
  uri: url,
  form: {},
  json: true
};
var five = require("johnny-five");
five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000 // サンプリング間隔(ms)
  });
  temperature.on("data", function() {
    options.form.value1= this.celsius;
    options.form.value2= this.fahrenheit;
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
    // データをPOSTメソッドで送信
    request.post(options, function(error, response, body){
      if (!error && response.statusCode == 200) {
        console.log('success');
      } else {
        console.log('error: '+ response.statusCode);
      }
    });
  });
});
