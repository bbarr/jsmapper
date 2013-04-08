define(function() {

  var observed = [];

  function clone(o) {
    if (typeof o === 'object') {
      if (typeof o.length === 'undefined') {
        var c = {};
        for (var k in o) {
          c[k] = clone(o[k]);
        }
        return c;
      } else {
        return o.map(function(i) { return clone(i); } );
      }
    }
    return o;
  }

  function compare(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  function check() {
    var o, i, len;
    for (i = observed.length - 1; i >= 0; i--) {
      o = observed[i];
      a = o.last
      b = o.obj[o.prop];

      if (!compare(a, b)) {
        o.cb.call(o.obj, b, a);
        o.last = clone(o.obj[o.prop]);
      }
    }
  };

  setInterval(check, 1000);

  return {

    watch: function(prop, cb) {

      if (!cb) {
        cb = prop;
        prop = '*';
      }
      
      observed.push({ obj: this, prop: prop, cb: cb });
    },

    unwatch: function(prop, cb) {

      if (typeof prop !== 'string') {
        cb = prop;
        prop = '*';
      }

      var i, o;
      for (i = observed.length - 1; i >= 0; i--) {
        o = observed[i];
        if (o.obj !== this) continue;
        if (o.prop !== prop) continue;
        observed.splice(i, 1);
      } 
    },

    link: function(from, to, through) {
      this.watch(from, function(new_val) { 
        this[to] = through.call(this, new_val); 
      });
    }
  };
});
