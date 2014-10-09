var humanInterval = require('human-interval'),
  unirest = require('unirest');

var Announcer = module.exports = function(config, cb) {
  if (!(this instanceof Announcer)) return new Announcer(config);
  if (!config) config = {};
  this._when = config.when || '30 minutes';
  this._cb = cb || function() {};
  this._url = config.url;
  this._body = config.body || {};
  this._enabled = false;

  var self = this;
  var milliseconds = humanInterval(this._when);
  setInterval(function() {
    self.announce();
  }, milliseconds);
};

Announcer.prototype.announce = function() {
  console.log(this._enabled);
  // Don't execute unless started
  if (!this._enabled) return;

  console.log('announcing');

  var self = this;
  unirest.post(self._url)
    .headers({
      'Accept': 'application/json'
    })
    .send(self._body)
    .end(function(response) {
      self._cb(response.error, response);
    });
}

Announcer.prototype.start = function() {

  this._enabled = true;
}

Announcer.prototype.stop = function() {
  this._enabled = false;
}