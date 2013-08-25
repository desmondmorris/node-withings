var VERSION = 0.0.0

function merge(defaults, options) {
  defaults = defaults || {};
  if (options && typeof options === 'object') {
    var keys = Object.keys(options);
    for (var i = 0, len = keys.length; i < len; i++) {
      var k = keys[i];
      if (options[k] !== undefined) defaults[k] = options[k];
    }
  }
  return defaults;
}

Withings = function(options) {
  if (!(this instanceof Withings)) return new Withings(options);

  var defaults = {
    headers: {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'node-withings/' + VERSION
    },
    rest_base: 'http://wbsapi.withings.net/',
  };
  this.options = merge(defaults, options);
}

Withings.prototype.request = function(method, service, action, params, callback){

  if (url.charAt(0) == '/')
    url = this.options.rest_base + service;

  callback();
  return this;
}

Withings.prototype.get = function(service, action, params, callback){
  this.request('GET', action, params, callback);
  return this;
}

Withings.prototype.post = function(service, action, params, callback){
  this.request('POST', action, params, callback);
  return this;
}

// CONVENIENCE METHODS

// User

Withings.prototype.user_getbyuserid = function(params, callback) {
  this.get('user', 'getbyuserid', params, callback);
  return this;
}

// Measure

Withings.prototype.measure_getmeas = function(params, callback) {
  this.get('measure', 'getmeas', params, callback);
  return this;
}

Withings.prototype.measure_getactivity = function(params, callback) {
  this.get('measure', 'getactivity', params, callback);
  return this;
}

// Notify

Withings.prototype.notify_subscribe = function(params, callback) {
  this.get('notify', 'subscribe', params, callback);
  return this;
}

Withings.prototype.notify_get = function(params, callback) {
  this.get('notify', 'get', params, callback);
  return this;
}

Withings.prototype.notify_list = function(params, callback) {
  this.get('notify', 'list', params, callback);
  return this;
}

Withings.prototype.notify_revoke = function(params, callback) {
  this.get('notify', 'revoke', params, callback);
  return this;
}

module.version = VERSION
module.exports = Withings;
