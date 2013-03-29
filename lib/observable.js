define(function() {

  var observed = [];

  function compare(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  function check() {
    var o, i, len;
    for (i = 0, len = observed.length; i < len; i++) {
      o = observed[i];
      a = o.obj[o.prop];
      b = o.last

      if (!compare(a, b)) {
        o.cb(b, a);
      }

      o.last = o.obj[o.prop];
    }
  };

  setInterval(check, 500);

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

      var i, o, len;
      for (i = 0, len = observed.length; i < len; i++) {
        o = observed[i];
        if (o.obj !== this) continue;
        if (o.prop !== prop) continue;
        observed.splice(i, 1);
      } 
    }
  };
});
