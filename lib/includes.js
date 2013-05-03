define(function(require) {

  var SLICE = Array.prototype.slice,
      extend = function(d, s) {
        for (var k in s) if (s.hasOwnProperty(k) && k !== '_includes') d[k] = s[k];
      }

  return function withIncludes() {

    if (!(this instanceof Function)) return withIncludes.call(arguments[0]);

    this._includes = {
      initializers: []
    }

    this.include = function() {
      SLICE.call(arguments).forEach(function(inc) {
        if (typeof inc === 'function') {
          extend(this, inc);
          extend(this.prototype, inc.prototype);
          this._includes.initializers.push(inc);
        } else {
          extend(this.prototype, inc)
        }
      }, this);

      return this;
    }

    this.applyIncludes = function(instance, args) {
      this._includes.initializers.forEach(function(init) { init.apply(instance, args); });
    }

    return this;
  }

});
