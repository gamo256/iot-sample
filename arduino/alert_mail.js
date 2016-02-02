var sendgrid = require ("sendgrid")("<your API Key>");
var to = "<to address>"
var from = "<from address>"
var five = require("johnny-five");
five.Board().on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 10000
  });
  temperature.on("data", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
    // 温度が30より大きいなら、メールを送信
    if (this.celsius > 30) sendmail(to, from);
  });
});
// メールを送信する関数
function sendmail (to , from){
  sendgrid.send({
    to:       to,
    from:     from,
    subject:  'alert!!!',
    text:     'to HOT!!!'
  }, function(err, json) {
     if (err) { return console.error(err); }
     console.log(json);
  });
}
