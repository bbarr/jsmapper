define(function(require) {

  function HasMeta() {
    this._meta = {
      id: utils.id()
    }
  }

  HasMeta.prototype = {

    meta: function(name, value) {
      return typeof value === 'undefined' ? this._meta[name] : (this._meta[name] = value);
    }
  }
});
