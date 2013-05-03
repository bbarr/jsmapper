define(function() {

  var observed = [],
      nextChecks = [];

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
      } else if (o.obj.unobservable) {
        observed.splice(i, 1);
      }
    }

    while (nextChecks[0]) nextChecks.pop()();
  };

  setInterval(check, 1000);

  return {

    nextCheck: function(cb) {
      nextChecks.push(cb);
    },

    nextCheckOnce: function(cb) {
      if (nextChecks.indexOf(cb) > -1) return;
      nextChecks.push(cb);
    },

    watch: function(prop, cb) {
      if (arguments.length === 3) {
        observed.push({ obj: prop, prop: cb, cb: arguments[2] });
      } else {
        observed.push({ obj: this, prop: prop, cb: cb });
      }
    },

    watchOnce: function(prop, cb) {

      function cbOnce() {
        cb.apply(this, arguments);
        this.unwatch(prop, cbOnce);
      }

      observed.push({ obj: this, prop: prop, cb: cbOnce });
    },

    unwatch: function(prop, cb) {

      var obj;
      if (arguments.length === 3) {
        obj = prop;
        prop = cb;
        cb = arguments[2];
      } else {
        obj = this;
      }

      var i, o;
      for (i = observed.length - 1; i >= 0; i--) {
        o = observed[i];
        if (o.obj !== obj) continue;
        if (o.prop !== '*' && o.prop !== prop) continue;
        if (cb && o.cb !== cb) continue;
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
