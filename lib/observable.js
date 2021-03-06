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

  function generateConfig(scope, args) {
    if (typeof args[0] === 'string') {
      return { obj: scope, prop: args[0], cb: args[1] };
    } else {
      return { obj: args[0], prop: args[1], cb: args[2] };
    }
  }

  setInterval(check, 1000);

  return {

    nextCheck: function(cb) {
      nextChecks.push(cb);
    },

    nextCheckOnce: function(cb) {
      if (nextChecks.indexOf(cb) > -1) return;
      nextChecks.push(cb);
    },

    watch: function() {
      var config = generateConfig(this, arguments);
      observed.push(config);
    },

    watchOnce: function() {
      var config = generateConfig(this, arguments);

      function cbOnce() {
        config.cb.apply(this, arguments);
        this.unwatch(prop, cbOnce);
      }

      observed.push({ obj: config.obj, prop: config.prop, cb: cbOnce });
    },

    unwatch: function() {
      var config = generateConfig(this, arguments);

      var i, o;
      for (i = observed.length - 1; i >= 0; i--) {
        o = observed[i];

        if (config.obj) {
          if (o.obj !== config.obj) continue;

          if (config.prop) {
            if (o.prop !== '*' && o.prop !== config.prop) continue;

            if (config.cb) {
              if (o.cb !== config.cb) continue;
            }
          }
        }

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
