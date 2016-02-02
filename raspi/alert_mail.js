  var sendgrid = require ("sendgrid")("<your API Key>");
  var to = "<to address>"
  var from = "<from address>"
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
      pin:"A3",
      board:virtual,
    });
    a.on("change", function() {
      console.log(this.value);
      // 値が500より大きいなら、メールを送信
      if (this.value > 500) sendmail(to, from);
    });
  });
  // メールを送信する関数
  function sendmail (to , from){
    sendgrid.send({
      to:       to,
      from:     from,
      subject:  'alert!!!',
      text:     '500 over!!!'
    }, function(err, json) {
       if (err) { return console.error(err); }
       console.log(json);
    });
  }
