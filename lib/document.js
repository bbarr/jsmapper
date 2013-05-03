define(function(require) {

  var utils = require('jsmapper/utils'),
      withIncludes = require('jsmapper/includes'),
      Schema = require('jsmapper/schema'),
      observable = require('jsmapper/observable'),
      Events = require('jsmapper/events'),
      Resource = require('jsmapper/resource'),
      sync = require('jsmapper/sync');

  function Document() {
    this._meta = { id: utils.id() };
    Document.applyIncludes(this, arguments)
  };

  Document.prototype = {
    
    meta: function(name, value) {
      return typeof value === 'undefined' ? this._meta[name] : (this._meta[name] = value);
    }
  };

  withIncludes(Document).include(Resource, Events, Schema, observable, sync);

  return function(Subject) {
    return withIncludes(function Wrapper() {
      Wrapper.applyIncludes(this, arguments);
      this.trigger('initialized');
    }).include(Document, Subject);
  };
});
