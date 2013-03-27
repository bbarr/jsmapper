define(function() {

  var utils,
      SLICE = Array.prototype.slice;
  
  return utils = {

    id: (function() {
      var id = 0;
      return function() {
        return (id++).toString();
      }
    })(),

    extend: function(dest) {
      SLICE.call(arguments, 1).forEach(function(src) {
        for (var key in src) dest[key] = src[key];
      });
    },

    inherit: function(subject) {
      return SLICE.call(arguments, 1).reduce(function(younger, older) {
        return older.call(new younger);
      }, subject);
    },

    asParent: function(Parent) {

      return function(Subject) {

        var WrappedSubject = function() { 
          Parent.apply(this, arguments);
          Subject.apply(this, arguments);
        };

        utils.extend(WrappedSubject, Parent, Subject);
        utils.extend(WrappedSubject.prototype, Parent.prototype, Subject.prototype);

        return WrappedSubject;
      }
    },

    mixin: function(subject) {
      SLICE.call(arguments, 1).forEach(function(mixer) {
        mixer.call(subject);
      });
      return subject;
    },

    asMixer: function(mixer, cached) {
      return function(subject) {
        mixer.call(subject);
        utils.extend(subject, cached);
      }
    }
  }
});
