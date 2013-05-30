define(function(require) {

  var utils = require('jsmapper/utils');

  function Resource() {
    this.meta('filters', {
      beforeSave: []
    })
  };

  Resource.prototype = {

    idProperty: 'id',

    isNew: function() {
      return !this[this.idProperty];
    },
    
    save: function(options) {

      this.meta('filters').beforeSave.forEach(function(f) {
        f.call(this);
      }, this);

      if (this.isNew()) {
        return this.sync('create', this, options);
      } else {
        return this.sync('update', this, options);
      }
    },

    load: function(options) {
      return this.sync('read', this, options);
    },

    destroy: function(options) {
      return this.sync('delete', this, options);
    },

    beforeSave: function(fn) {
      this.meta('filters').beforeSave.push(fn);
    }
  };

  Resource.url = '';

  Resource.load = function(options) {
   return this.sync('read', this, options);
  };
  
  return Resource;
});
