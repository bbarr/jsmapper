define(function(require) {

  var utils = require('jsmapper/utils');

  function Resource() {
  };

  Resource.prototype = {

    idProperty: 'id',

    isNew: function() {
      return this[this.idProperty];
    },
    
    save: function(options) {
      if (this.isNew()) {
        return this.sync('create', this, options);
      } else {
        return this.sync('update', this, options);
      }
    },

    load: function(options) {
      return this.sync('read', this, options).success(function(data) {
        this.fromJSON(data); 
      });
    },

    destroy: function(options) {
      return this.sync('delete', this, options);
    }
  };

  Resource.url = '';

  Resource.load = function(options) {
    return this.sync('read', this, options);
  };
  
  return Resource;
});
