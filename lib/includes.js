define(function(require) {

  var utils = require('./utils'),
      SLICE = Array.prototype.slice;

  var includes = {};
  function getOrSetInclude(dest) {
    var key = dest._includes_id || (dest._includes_id = utils.id());
    return includes[key] || (includes[key] = {
      dest: dest,
      initializers: []
    });
  }
  
  var actions = {
    
    add: function() {
      var include = this.include;
      SLICE.call(arguments).forEach(function(ext) {
        if (typeof ext === 'function') {
          utils.extend(include.dest, ext, { except: [ '_includes_id' ] });
          utils.extend(include.dest.prototype, ext.prototype);
          include.initializers.push(ext);
        } else {
          utils.extend(include.dest.prototype, ext);
        }
      });
    },

    initialize: function(instance, args) {
      var include = this.include;
      include.initializers.forEach(function(i) { i.apply(instance, args); });
    }
  };

  return function(dest) {
    var include = getOrSetInclude(dest);
    actions.include = include;
    return actions;
  }
});
