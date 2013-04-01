define(function(require) {

  var $ = require('jquery'),
      utils = require('./utils');

  function ajax(config) {
    return $.ajax(utils.extend({
    }, config))
  }

  function urlFor(obj) {
    var root = obj.url || obj.constructor.url,
        id = obj[obj.idAttribute || 'id'];
    if (id) {
      return root + '/' + id;
    } else {
      return root;
    }
  }

  function Syncer() {};

  Syncer.prototype = {
    
    sync: function(type, obj, options) {
      var _this = this; 

      switch(type) {
        case 'read':
          return ajax(
            utils.extend({
              type: 'GET',
              url: urlFor(obj),
              converters: {
                'text json': function(data) {
                  data = JSON.parse(data);
                  if (data.length) {
                    data = data.map(function(d) { return new _this(d); });
                  } else {
                    data = _this.fromJSON(data);
                  }
                  return data;
                }
              }
            }, options)
          )
      }
    }
  }

  Syncer.sync = Syncer.prototype.sync;

  return Syncer;
});
