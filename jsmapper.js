
// namespace to global/window
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

jsm.Constructor = function() {};
jsm.Constructor.include = function(obj) { jsm.util.extend(this.prototype, obj); };
jsm.Constructor.mixin = jsm.Constructor.prototype.mixin = function(obj) { jsm.util.extend(this, obj); };
jsm.Constructor.extend = function(Constructor, prototype, statics) {
 
  var self = this;

  var NewConstructor = function() {
    self.apply(this, arguments);
    if (Constructor) Constructor.apply(this, arguments);
  };
  
  jsm.util.extend(NewConstructor, this);
  if (statics) jsm.util.extend(NewConstructor, statics);
  NewConstructor.Parent = this;

  NewConstructor.prototype = jsm.util.extend({}, this.prototype);
  if (prototype) jsm.util.extend(NewConstructor.prototype, prototype);
  NewConstructor.prototype.Constructor = NewConstructor;

  return NewConstructor;
}

jsm.Collection = jsm.Constructor.extend(function(Model) {
  this.array = [];
  this._array = _(this.array);
  this.Model = Model || jsm.Model;
}, {

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
});

jsm.Model = jsm.Constructor.extend(function() {
  this._jsm_id = jsm.util.uid();
  this.keys = [];
  this.data = {};
}, {

  key: function(name) {
    this.keys.push(name);
  },

  set: function(key, val) {
    this.data[key] = val;
  },

  get: function(key) {
    return this.data[key];
  }

}, {

  extend: function(name, Constructor, prototype, constructor_properties) {
    var NewConstructor = this.Parent.extend.call(this, Constructor, prototype, constructor_properties);
    NewConstructor.model = name;
    return NewConstructor;
  }
});
