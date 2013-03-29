define(function(require) {

  var utils = require('./utils'),
      HasSchema = require('./schema'),
      Observable = require('./observable'),
      Eventful = require('./events'),
      Persistable = require('./persistence'),
      IsCollection = require('./collection');

  function Document() {
    HasMeta.call(this);
    HasSchema.call(this);
    Events.call(this);
    Persistable.call(this);
    IsCollection.call(this);

  }

  utils.extend(Document, Collection.prototype);
  utils.extend(Document.prototype, 
    HasMeta.prototype,
    HasSchema.prototype, 
    Observable, 
    Events.prototype, 
    Router.prototype
  )

  return function(Subject) {

    var Wrapped = function() {
      Document.apply(this, arguments);
      Subject.apply(this, arguments);
    };

    utils.extend(Wrapped, Subject, Document);
    utils.extend(Wrapped.prototype, Subject.prototype, Document.prototype);

    return Wrapped;
  };
});
