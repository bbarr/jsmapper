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

    extend: function(dest) {
      SLICE.call(arguments, 1).forEach(function(src) {
        for (var key in src) dest[key] = src[key];
      });
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
    }
  }
});
