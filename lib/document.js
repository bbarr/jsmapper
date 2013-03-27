define(function(require) {

  var utils = require('./utils'),
      asStore = require('./store');

  function Document() {

    this._meta = {
      id: utils.id()
    }
  }
  
  Document.prototype = {

    meta: function(name, value) {
      return typeof value === 'undefined' ? this._meta[name] : (this._meta[name] = value);
    }
  };

  return utils.asParent(
    utils.inherit(Document, asStore)
  );
});
