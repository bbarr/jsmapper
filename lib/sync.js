define(function(require) {

  var $ = require('jquery'),
      utils = require('./utils');

  // partial application to dry up sync
  function createAjax(obj, options) {
    return function(type_options) {
      return $.ajax(
        utils.extend({
          url: urlFor(obj),
          contentType: 'application/json; charset=utf-8',
          converters: {
            'text json': function(data) { 
              data = JSON.parse(data);
              return (data.length) ? data.map(function(d) { return new (typeof obj === 'function' ? obj : obj.constructor)(d); }) : obj.fromJSON(data);
            }
          }
        }, type_options, options)
      )
    }
  }

  function urlFor(obj) {
    var root = typeof obj === 'function' ? obj.url : obj.constructor.url,
        id = obj[obj.idAttribute || 'id'];
    return (id) ? root + '/' + id : root;
  }

  function Syncer() {};

  Syncer.prototype = {
    
    sync: function(type, obj, options) {

      var options = options || {},
          ajax = createAjax(obj, options);

      switch(type) {

        case 'delete':
          return ajax({ type: 'DELETE' });

        case 'create':
          return ajax({
            type: 'POST',
            data: JSON.stringify(obj)
          });

        case 'update':
          return ajax({
            type: 'PUT',
            data: JSON.stringify(obj)
          });

        case 'read':
          return ajax({
            type: 'GET',
            data: options.data
          });
      }
    }
  }

  Syncer.sync = Syncer.prototype.sync;

  return Syncer;
});
