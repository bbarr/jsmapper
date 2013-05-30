define(function(require) {

  var utils = require('jsmapper/utils'),

      // provides watchability
      observable = require('jsmapper/observable'),

      // provides pub/sub
      Events = require('jsmapper/events'),

      // provides persistability
      Resource = require('jsmapper/resource'),

      // default jQuery-style AJAX persistance adapter
      sync = require('jsmapper/sync');

  function Document(data) {
    data = data || {};

    this._meta = {
      id: utils.id(),
      keys: {},
      validations: [],
      errors: [],
      events: []
    };

    Resource.apply(this, arguments);
    Events.apply(this, arguments);
    Schema.apply(this, arguments);

    this.fromJSON(data);
  };

  utils.extend(Document, Resource, sync);

  Document.prototype = {
    
    meta: function(name, value) {
      return typeof value === 'undefined' ? this._meta[name] : (this._meta[name] = value);
    }

    key: function(name, options) {
      options = options || {};

      this._meta.keys[name] = options;
      this[name] = options.default;

      return this;
    },

    validate: function(key, rule, message) {
      this._meta.validations.push({
        key: key,
        rule: rule,
        message: message
      });

      return this;
    },

    isValid: function() {

      var errors = [];

      this._meta.validations.forEach(function(validation) {
        if (!validation.rule(this[validation.key]) {
          errors.push({ key: validation.key, message: validation.message });
        }
      }, this);

      this._meta.errors = errors;

      return !errors.length;
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

  utils.extend(Document.prototype, Resource.prototype, Events.prototype, Schema.prototype, observable, sync);

  return function(Subject) {

    function DocumentWrapper() {
      Document.apply(this, arguments);
      Subject.apply(this, arguments);
    };

    utils.extend(DocumentWrapper, Document, Subject);
    utils.extend(DocumentWrapper.prototype, Document.prototype, Subject.prototype);

    return DocumentWrapper;
  };
});
