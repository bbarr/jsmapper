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
    },
    
    clone: function(o) {
      
      // give everythign a chance to clone itself.. usually more efficient
      if (o.clone) return o.clone();

      // screw you, null
      if (!o) return o;

      // screw you, HTMLCollection
      if (o.cloneNode) return o.cloneNode(true);

      if (typeof o === 'object') {

        // handle {}
        if (typeof o.length === 'undefined') {
          var c = {};
          for (var k in o) {
            c[k] = clone(o[k]);
          }
          return c;
        } else {

          // handle []
          return o.map(function(i) { return clone(i); } );
        }
      }

      // return something passed by value
      return o;
    },

    compare: function(a, b) {
      
      // low hanging fruit
      if ((!a && b) || (a && !b)) return false;

      // dont try to stringify a DOM node!
      if ((a && a.nodeType) || (b && b.nodeType)) return a == b;

      return JSON.stringify(a) == JSON.stringify(b);
    }
  }
});
