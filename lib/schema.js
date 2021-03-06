define(function(require) {

  var utils = require('jsmapper/utils');

  function Schema(data) {
    this.meta('keys', {});
    this.meta('validations', {});
    this.meta('errors', {});

    this.once('initialized', function() { 
      this.fromJSON(data); 
    }, this);
  }
  
  Schema.prototype = {

    key: function(name, options) {
      options = options || {};
      this._meta.keys[name] = options;
      this[name] = options.default;
      return this;
    },

    validate: function(prop, rule, message) {
      (this._meta.validations[prop] || (this._meta.validations[prop] = [])).push({
        rule: rule,
        message: message
      });
      return this;
    },

   isValid: function() {

      var errors = {},
          isValid = true;

      this.each(function(v, k) {
        if (this._meta.validations[k]) {
          this._meta.validations[k].forEach(function(validation) {
            if (!validation.rule(v)) {
              isValid = false;
              (errors[k] || (errors[k] = [])).push(validation.message);
            }
          });
        }
      });

      this._meta.errors = errors;

      return isValid;
    },

    each: function(fn) {
      for (var key in this) {
        if (this.hasOwnProperty(key) && this._meta.keys[key]) {
          fn.call(this, this[key], key);
        }
      }
    },

    toJSON: function() {

      var data = {};

      this.each(function(v, k) {
        data[k] = v;
      });

      return data;
    },

    fromJSON: function(data) {
      utils.extend(this, data);
    }
  };

  return Schema;
});
