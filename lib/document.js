define(function(require) {

  var utils = require('./utils');

  function Document() {
    this.keys = {};
  }

  Document.prototype = {

    key: function(name, options) {
      this.keys[name] = options;
    }
  };
  
  return utils.asMixin(Document);
});


return defineDocument(Event);

function Event() {
  asDocument.call(this);

  this.key('title');
  this.key('short_desc');
  this.key('long_desc');
};

Event.prototype = {
  
};
