define(function() {

  return {

    id: (function() {
      var id = 0;
      return function() {
        return (id++).toString();
      }
    })(),
    
    asMixin: function(constructor) {

      return function() {
        var proto = constructor.prototype, name;
        constructor.call(this);
        for (name in proto) this[name] = proto[name];
      }
    }
  }
});
