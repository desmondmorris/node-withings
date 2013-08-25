var VERSION = 0.0.0
Withings = function() {

}

Withings.prototype.request = function(method, action, params, callback){
  callback();
  return this;
}

Withings.prototype.get = function(action, params, callback){
  this.request('GET', action, params, callback);
  return this;
}

Withings.prototype.post = function(action, params, callback){
  this.request('POST', action, params, callback);
  return this;
}

// CONVENIENCE METHODS

// User

Withings.prototype.user_getbyuserid = function(params, callback) {
  this.get('getbyuserid', params, callback);
  return this;
}

// Measure

Withings.prototype.measure_getmeas = function(params, callback) {
  this.get('getmeas', params, callback);
  return this;
}

Withings.prototype.measure_getactivity = function(params, callback) {
  this.get('getactivity', params, callback);
  return this;
}

// Notify

Withings.prototype.notify_subscribe = function(params, callback) {
  this.get('subscribe', params, callback);
  return this;
}

Withings.prototype.notify_get = function(params, callback) {
  this.get('get', params, callback);
  return this;
}

Withings.prototype.notify_list = function(params, callback) {
  this.get('list', params, callback);
  return this;
}

Withings.prototype.notify_revoke = function(params, callback) {
  this.get('revoke', params, callback);
  return this;
}

module.version = VERSION
module.exports = Withings;
