var utils = require('util'),
  Emitter = require('events').EventEmitter,
  Agenda = require('agenda'),
  unirest = require('unirest');

/**
 * Create Job object from data
 * @param {Object} agenda
 * @param {Object} jobData
 * @return {Job}
 * @private
 */
var MonitorAnnouncer = module.exports = function(config, cb) {
  if (!(this instanceof MonitorAnnouncer)) return new MonitorAnnouncer(config);
  if (!config) config = {};
  this._when = config.when;
  this._cb = config.cb || function() {};
  this._url = config.url;
  this._body = config.body || {};
  this._started = false;

  var agenda = new Agenda();
  this._agenda = agenda;

  agenda.define('announce', function(job, payload) {
    this.announce();
  });
};

utils.inherits(MonitorAnnouncer, Emitter);


MonitorAnnouncer.prototype.announce = function() {
  unirest.post(this._url)
    .headers({
      'Accept': 'application/json'
    })
    .send(this._body)
    .end(function(response) {
      this._cb(response.error, response);
    });
}

MonitorAnnouncer.prototype.start = function() {
  if (this._started) return;

  agenda.start();
}

MonitorAnnouncer.prototype.stop = function() {
  if (!this._started) return;

  agenda.stop();
}