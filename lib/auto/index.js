var Announcer = require('../announcer');
var url = require('url');

var start = function() {

  var date = new Date();

  if (!process.env.ANNOUNCE_ID ||
      !process.env.ANNOUNCE_URL ||
      !process.env.ANNOUNCE_INTERVAL) {
    console.log('Announce missing env paramenters ANNOUNCE_ID, ANNOUNCE_URL or ANNOUNCE_INTERVAL');
    return;
  }

  var announceURL = process.env.ANNOUNCE_URL;
  announceURL  = announceURL + process.env.ANNOUNCE_ID;

  var announceMillSeconds = parseInt(process.env.ANNOUNCE_INTERVAL) * 1000;

  var opts = {
    when: process.env.ANNOUNCE_INTERVAL+' seconds',
    method: 'put',
    url: announceURL,
    debug: true,
    body: {
        startedAt: date.toISOString(),
        interval: announceMillSeconds
    }
  };

  var announce = new Announcer(opts);
  announce.start();
}

module.exports.start = start;
