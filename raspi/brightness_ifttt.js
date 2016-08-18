var request = require('request');
var event = '<Event Name>';
var key = '<Your Key>';
var url = 'https://maker.ifttt.com/trigger/' + event + '/with/key/' + key;
var options = {
  uri: url,
  form: {},
  json: true
};
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
  a.on("data", function() {
    options.form.value1= this.value;
    console.log(this. value);
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
