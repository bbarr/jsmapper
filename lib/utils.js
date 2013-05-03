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
        for (var key in src) {
          if (src.hasOwnProperty(key)) {
            dest[key] = src[key];
          }
        }
      });
      return dest;
    }
  }
});
