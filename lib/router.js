define(function(require) {

  function route(name, template) {
    var _this = this;
    _this[name] = function() {
      return request(template, arguments)
        .success(function() { _this.trigger.apply(_this, [ name + 'Success'].concat(arguments)) })
        .error(function() { _this.trigger.apply(_this, [ name + 'Error'].concat(arguments)) })
        .complete(function() { _this.trigger.apply(_this, [ name + 'Complete'].concat(arguments)) });
    }
  }

  function request(uri_template, args) {
    
  }

  function Router() {
    this.route('read', 'GET /{{urlRoot}}/{{id}}');
    this.route('create', 'POST /{{urlRoot}}/{{id}}', function() { return this.toJSON(); });
    this.route('update', 'PUT /{{urlRoot}}/{{id}}', function() { return this.toJSON(); });
    this.route('delete', 'DELETE /{{urlRoot}}/{{id}}');
  }



    save: function() {

    }
  }

  return {
    route: route,
    persistence: HTTP
  }
});
