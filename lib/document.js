define(function(require) {

  var utils = require('./utils');

  function Document() {
    this.keys = {};
  }

  Document.prototype = {

    key: function(name, options) {
      this.keys[name] = options || {};
    }
  };
  
  return utils.asMixin(Document);
});
