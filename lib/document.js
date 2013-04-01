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
    this.meta('id', utils.id())
  };

  includes(Document).add(Meta, Resource, Schema, observable, Events, sync);

  return function(Subject) {

    function Wrapped() {
      includes(Wrapped).initialize(this, arguments); 
    };

    includes(Wrapped).add(Document, Subject);

    return Wrapped;
  };
});
