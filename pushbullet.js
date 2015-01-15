var fs = require('fs');
var path = require('path');

var async = require('async');
var osenv = require('osenv');
var PushBullet = require('pushbullet');

var home = osenv.home();
var key = process.env.PUSHBULLET_KEY;

if (!key) {
  try {
    key = fs.readFileSync(path.join(home, '.pushbulletkey')).toString();
  } catch (err) {
    failedKey();
  }
}

if (!key) {
  failedKey();
}

var pusher = new PushBullet(key);

module.exports = function(cb) {

  var text = '';

  if (process.argv.length > 2) {
    text = process.argv[2];
  }

  pusher.devices(function(error, response) {
    if (error) {
      throw error;
    }
    if (response.devices) {
      response.devices.forEach(function (device) {
        if (device.active && device.kind === 'android') {
          pusher.note(device.iden, 'Terminal Note', text.toString(), function(error, response) {
            if (error) {
              throw error;
            }
          });
        }
      });
    }
  });
};


function failedKey() {
  throw new Error('Failed to get PushBullet Key. Create a file in ~/.pushbulletkey with the key or set an ENV variable PUSHBULLET_KEY');
}