define(function(require) {
  
  var utils = require('jsmapper/utils');

  function Meta() {

    this._meta = {}
  }

  Meta.prototype = {

    meta: function(name, value) {
      return typeof value === 'undefined' ? this._meta[name] : (this._meta[name] = value);
    }
  }

  return Meta;
});
