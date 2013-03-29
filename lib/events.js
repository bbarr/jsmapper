define(function(require) {

  function Event() {
    this.meta('events', {});
  }

  Event.prototype = {
    
    on: function(name, cb, scope) {
      cb.scope = scope || this;
      (this.queues[name] || (this.queues[name] = [])).push(cb);
    },

    off: function(name, cb) {

      var queue = this.queues[name];
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
        delete this.queues[name];
      }
    },

    trigger: function(name, data) {

      var queue = this.queues[name];
      if (!queue || !queue.length) return;

      for (var i = queue.length - 1; i--; ) {
        queue[i].call(queue[i].scope, data);
      }
    }
  }

  return Event;
});
