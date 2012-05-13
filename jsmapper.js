
// project namespace
var jsm = this.jsm = {};

jsm.util = {
  
  extend: function(dest, src) {
    for (var key in src) dest[key] = src[key];
    return dest;
  },

  uid: function() {
    var id = 0;
    return function() {
      return (id++).toString();
    }
  }(),

  naming: {
    
    singular: [],
    plural: [],
    
    register: function(s, p) {
      this.singular.push(s);
      this.plural.push(p);
    },
    
    singularize: function(name) {
      var index = this.plural.indexOf(name);
      return index > -1 ? this.singular[index] : name.replace(/s$/, '');
    },
    
    pluralize: function(name) {
      var index = this.singular.indexOf(name);
      return index > -1 ? this.plural[index] : (name + 's');
    }
  }
};

// Simple inheritance helper
jsm.Constructor = function() {};
jsm.Constructor.include = function(obj) { jsm.util.extend(this.prototype, obj); };
jsm.Constructor.mixin = function(obj) { jsm.util.extend(this, obj); };
jsm.Constructor.extend = function(Constructor, prototype, constructor_properties) {
 
  var self = this;

  var NewConstructor = function() {
    self.apply(this, arguments);
    if (Constructor) Constructor.apply(this, arguments);
  };
  
  jsm.util.extend(NewConstructor, this);
  if (constructor_properties) jsm.util.extend(NewConstructor, constructor_properties);
  NewConstructor.Parent = this;

  NewConstructor.prototype = jsm.util.extend({}, this.prototype);
  if (prototype) jsm.util.extend(NewConstructor.prototype, prototype);
  NewConstructor.prototype.Constructor = NewConstructor;

  return NewConstructor;
}

// Collection for models
// coerces to given Model or jsm.Model
// utilizes underscore methods, a la backbone.js
jsm.Collection = function(Model) {
  this.array = [];
  this._array = _(this.array);
  this.Model = Model || jsm.Model;
};

jsm.Collection.prototype = {

  add: function(obj) {
    if (obj._jsm_id) {
      this._array.contains(obj) || this.array.push(obj);
    }
    else {
      this.array.push(new this.Model(obj));
    }
  },

  remove: function(obj) {
    var index = this._array.indexOf(obj);
    if (index > -1) this.array.splice(index, 1);
  },

  all: function() {
    return this.array.slice();
  },

  find: function(id) {
    return this._array.find(function(model) { return model._jsm_id === id });
  },

  where: function(query) {
    return this._array.filter(function(model) {
      for (var key in query) if (query[key] != model[key]) return false;
      return true;
    });
  }
};

jsm.Model = jsm.Constructor.extend(function() {
  this._jsm_id = jsm.util.uid();
  this.keys = [];
  this.data = {};
  this.errors = {};
  this._errors = _(this.errors);
}, {

  key: function(name) {
    this.keys.push(name);
  },

  set: function(key, val) {
    this.data[key] = val;
  },

  get: function(key) {
    return this.data[key];
  },

  save: function() {
    if (this.valid()) {
      jsm.util.extend(this.data, this.changes);
      this.trigger('saved', this);
      return true;
    }
    else {
      this.trigger('errored', this);
      return false;
    }
  },

  valid: function() {
    this.errors = {};
    this.validate();
    return this._errors.isEmpty();
  }

}, {

  extend: function(name, Constructor, prototype, constructor_properties) {
    var NewConstructor = this.Parent.extend.call(this, Constructor, prototype, constructor_properties);
    NewConstructor.model = name;
    return NewConstructor;
  }
});
