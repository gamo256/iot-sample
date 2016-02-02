var publishKey = '<your Publish Key >'; 
var subscribeKey = '<your Subscribe Key>';
var channel1 = "shutter";
var channel2 = "pic";
var base64Img = require('base64-img');
var filename = "picam.jpg";
var raspistillOption = [ "-w", "320", "-h", "240", "-o", filename, "-t", "999999999", "-tl", "1000"];
var jpegoptimOption = ["--strip-all", "--max=30", filename];
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var pid;
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
    getpid();
    if(message.action === 'start'){
      fs.watchFile(filename, function(current, previous) {
        var jpegoptim = spawn('jpegoptim', jpegoptimOption);
        jpegoptim.on('close', function(code, signal){
          base64Img.base64(filename,function(err, data){
            if (!err){ publish(data);}
          });
        });
      });
    } else { exec('kill -9 '+ pid);}
  }
});
function publish(data){
  pubnub.publish({
    channel : channel2,
    message : data,
    callback: function(m){ console.log(m);},
    error: function(m){ console.log(m);}
  });
}
function getpid(){
  exec('ps aux | grep [r]aspistill', function(err, stdout, stderr) {
    if (stdout) {
      try {
        pid = stdout.match(/\s+(\d{4,6})+\s+/gi)[0].trim();
        if (pid) {
          console.log('Raspistill running. PID:' + pid);
        }
      } catch (e) {
        console.log('Raspistill PID not found');
      }
    } else {
      console.log('Raspistill PID not found');
    }
  });
}
