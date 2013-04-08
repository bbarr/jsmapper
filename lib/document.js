define(function(require) {

  var utils = require('jsmapper/utils'),
      includes = require('jsmapper/includes'),
      Schema = require('jsmapper/schema'),
      Meta = require('jsmapper/meta'),
      observable = require('jsmapper/observable'),
      Events = require('jsmapper/events'),
      Resource = require('jsmapper/resource'),
      sync = require('jsmapper/sync');

  function Document() {
    includes(Document).initialize(this, arguments);
  };

  includes(Document).add(Meta, Resource, Events, Schema, observable, sync);

  return function(Subject) {

    function Wrapped() {
      includes(Wrapped).initialize(this, arguments); 
      this.trigger('initialized');
    };

    Wrapped.include = function() { 
      var i = includes(Wrapped);
      i.add.apply(i, arguments);
      return this;
    };

    includes(Wrapped).add(Document, Subject);

    return Wrapped;
  };
});
