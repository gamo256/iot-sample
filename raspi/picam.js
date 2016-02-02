var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';
var channel1 = "shutter";
var channel2 = "pic";
var base64Img = require('base64-img');
var filename = "picam.jpg";
var raspistillOption = [ "-w", "320", "-h", "240", "-o", filename];
var jpegoptimOption = ["--strip-all", "--max=30", filename];
var spawn = require('child_process').spawn;
var pubnub = require("pubnub")({
  ssl : true,
  publish_key : publishKey,
  subscribe_key : subscribeKey
});
pubnub.subscribe({
  channel : channel1,
  callback : function(message){
    console.log('>', message);
    var raspistill = spawn('raspistill', raspistillOption);
    raspistill.on('close', function(code, signal){
      var jpegoptim = spawn('jpegoptim', jpegoptimOption);
        jpegoptim.on('close', function(code, signal){
          base64Img.base64(filename,function(err, data){
            if (!err){ publish(data);}
          });
        });
      });
    }
  }
});
function publish(data){
  pubnub.publish({
    channel : channel2,
    message : data,
    callback: function(m){console.log(m);},
    error: function(m){console.log(m);}
  });
}
