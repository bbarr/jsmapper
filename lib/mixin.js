define(function() {

  return {
    
    mixin_from_constructor: function(constructor) {

      return function() {
        var proto = constructor.prototype, name;
        for (name in proto) this[name] = proto[name];
        constructor.call(this);
      }
    }
  }
});