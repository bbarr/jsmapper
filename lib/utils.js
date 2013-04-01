define(function() {

  var utils,
      SLICE = Array.prototype.slice;
  
  return utils = {

    id: (function() {
      var id = 0;
      return function() {
        return (id++).toString();
      }
    })(),

    extend: function(dest, options) {
      SLICE.call(arguments, 1).forEach(function(src) {
        for (var key in src) {
          if (options && options.except && options.except.indexOf(key) > -1) continue;
          dest[key] = src[key];
        }
      });
      return dest;
    },

    mixin: function(subject) {
      SLICE.call(arguments, 1).forEach(function(mixer) {
        mixer.call(subject);
      });
      return subject;
    },

    asMixer: function(mixer, cached) {
      cached = cached || {};
      return function(subject) {
        mixer.call(subject);
        utils.extend(subject, cached);
      }
    },

    include: function(dest) {

      dest.initializers || (dest.initializers = []);
      dest.initialize || (dest.initialize = function() { 
        ext.initializers.forEach(function(i) { i.call(this); }); 
      }); 

      SLICE.call(arguments, 1).forEach(function(ext) {
        if (typeof ext === 'function') {
          utils.extend(dest, ext);
          utils.extend(dest.prototype, ext.prototype);
          dest.initializers.push(ext);
        } else {
          utils.extend(dest.prototype, ext);
        }
      });
    },

    inclusive: function(fn) {
      
      inclusive_fn = function() {
        fn.apply(this, arguments);
        
      }
       
      fn.include = function() {
      }

      return fn;
    }
  }
});
