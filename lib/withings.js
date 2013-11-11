var VERSION = '0.0.0',
    http = require('http'),
    querystring = require('querystring'),
    oauth = require('oauth');


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

function Withings(options) {
  if (!(this instanceof Withings)) return new Withings(options);

  var defaults = {
    consumer_key: null,
    consumer_secret: null,
    access_token_key: null,
    access_token_secret: null,
    headers: {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'node-withings/' + VERSION
    },
    callback_url: null,
    rest_base: 'http://wbsapi.withings.net',
  };

  this.options = merge(defaults, options);

  this.oauth = new oauth.OAuth(
    this.options.request_token_url,
    this.options.access_token_url,
    this.options.consumer_key,
    this.options.consumer_secret,
    '1.0',
    this.options.callback_url,
    'HMAC-SHA1', null,
    this.options.headers
  );

}

Withings.prototype.get = function(url, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "FAIL: INVALID CALLBACK.";
    return this;
  }

  if (url.charAt(0) == '/')
    url = this.options.rest_base + url;

  this.oauth.get(
    url + '?' + querystring.stringify(params),
    this.options.access_token_key,
    this.options.access_token_secret,
    function(error, data, response) {
      if (error) {
        var err = new Error(
          'HTTP Error ' + error.statusCode + ': ' + http.STATUS_CODES[error.statusCode]
        );
        err.statusCode = error.statusCode;
        err.data = error.data;
        callback(err);
      } else {
        try {
          var json = JSON.parse(data);
          callback(json);
        } catch(err) {
          callback(err);
        }
      }
    }
  );
  return this;
}

// CONVENIENCE METHODS

/*
 * Get User By ID
 */
Withings.prototype.getbyuserid = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "FAIL: INVALID CALLBACK.";
    return this;
  }

  params.action = 'getbyuserid';

  this.get('/user', params, callback);
  return this;
}

/*
 * Get measurement
 */
Withings.prototype.getmeas = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "FAIL: INVALID CALLBACK.";
    return this;
  }

  params.action = 'getmeas';

  this.get('/measure', params, callback);
  return this;
}

/*
 * Get activity
 */
Withings.prototype.getactivity = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "FAIL: INVALID CALLBACK.";
    return this;
  }

  params.action = 'getactivity';

  this.get('/v2/measure', params, callback);
  return this;
}

module.version = VERSION
module.exports = Withings;
