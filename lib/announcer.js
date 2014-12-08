var humanInterval = require('human-interval'),
  unirest = require('unirest');

var Announcer = module.exports = function(config, cb) {
  if (!(this instanceof Announcer)) return new Announcer(config);
  if (!config) config = {};
  this._when = config.when || '30 minutes';
  this._cb = cb || function() {};
  this._url = config.url;
  this._body = config.body || {};
  this._query = config.query || {};
  this._enabled = false;
  this._method = config.method || 'post';
  this._debug = config.debug || false;

  this._method = this._method.toUpperCase();

  if (config.rawBody) {
    this._body = config.rawBody;
  }

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
  if (self._debug) {
    console.log(self._method + ': ' + self._url);
    console.log(JSON.stringify(self._query));
    console.log(JSON.stringify(self._body));
  }

  var request = unirest.post(self._url);

  if (self._method == 'PUT')
  {
    request = unirest.put(self._url);
  }
  else if (self._method == 'GET') {
    request = unirest.get(self._url);
  }
  else if (self._method == 'DELETE') {
    request = unirest.delete(self._url);
  }

  request
    .headers({
        'Accept': 'application/json'
      })
    .qs(self._query)
    .send(self._body)
    .end(function(response) {
        if (self._debug) {
          console.log(response.body);
        }
        self._cb(response.error, response);
      });
  
}

Announcer.prototype.start = function() {

  this._enabled = true;
}

Announcer.prototype.stop = function() {
  this._enabled = false;
}

Announcer.autoInstance = function() {
  return require('./auto');
}
