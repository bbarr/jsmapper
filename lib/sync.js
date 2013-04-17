define(function(require) {

  var $ = require('jquery'),
      utils = require('./utils');

  function ajax(config) {
    return $.ajax(utils.extend({
      contentType: 'application/json; charset=utf-8'
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

      var _this = this,
          options = options || {};

      switch(type) {

        case 'delete':
          return ajax({
            type: 'DELETE',
            url: urlFor(obj)
          });
          break;
        case 'create':
          return ajax(
            utils.extend({
              type: 'POST',
              url: urlFor(obj),
              data: JSON.stringify(obj),
              converters: {
                'text json': function(data) {
                  data = JSON.parse(data);
                  if (data.length) {
                    data = data.map(function(d) { return new obj.constructor(d); });
                  } else {
                    data = obj.fromJSON(data);
                  }
                  return data;
                }
              }
            }, options)
          )
          break;

        case 'update':
          return ajax(
            utils.extend({
              type: 'PUT',
              url: urlFor(obj),
              data: JSON.stringify(obj),
              converters: {
                'text json': function(data) {
                  data = JSON.parse(data);
                  if (data.length) {
                    data = data.map(function(d) { return new obj.constructor(d); });
                  } else {
                    data = obj.fromJSON(data);
                  }
                  return data;
                }
              }
            }, options)
          )
          break;

        case 'read':
          return ajax(
            utils.extend({
              type: 'GET',
              url: urlFor(obj),
              data: options.data,
              converters: {
                'text json': function(data) {
                  data = JSON.parse(data);
                  if (data.length) {
                    data = data.map(function(d) { return new obj(d); });
                  } else {
                    data = obj.fromJSON(data);
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
