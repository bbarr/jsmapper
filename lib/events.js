define(function(require) {

  function Event() {
    this.meta('events', {});
  }

  Event.prototype = {
    
    on: function(name, cb, scope) {
      var qs = this.meta('events');
      cb.scope = scope || this;
      (qs[name] || (qs[name] = [])).push(cb);
    },

    once: function(name, cb, scope) {
      var _this = this,
          cbAndRemove = function() {
            _this.off(name, cb);
            cb.apply(scope, arguments);
          }
      this.on(name, cbAndRemove, scope);
    },

    off: function(name, cb) {

      var queue = this.meta('events')[name];
      if (!queue) return;

      if (cb) {
        var index = queue.indexOf(cb);
        if (index > -1) {
          queue.splice(index, 1); 
          if (queue.length === 0) {
            delete this.queues[name];
          }
        }
      } else {
        delete this.meta('events')[name];
      }
    },

    trigger: function(name, data) {

      var queue = this.meta('events')[name];
      if (!queue || !queue.length) return;

      for (var i = queue.length - 1; i >= 0; i--) {
        queue[i].call(queue[i].scope, data);
      }
    }
  }

  return Event;
});
