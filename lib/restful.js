define(function(require) {

  function Restful() {
    
  }

  Restful.prototype = {

    save: function() {
      if (this._meta.id) {
        this.sync('update');
      } else {

      }
    },

    load: function() {

    }
  }

  Restful.save = function() {

  };

  Restful.load = function(options) {

  };
});
