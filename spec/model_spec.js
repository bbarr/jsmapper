require('./spec_helper.js');

describe(jsm.Model, function() {

  describe('keys', function() {

    it ('should add a key to the keys array', function() {
      var Person = jsm.Model.extend('person', function() { this.key('name'); });
      expect(new Person().keys.indexOf('name')).toBeGreaterThan(-1);
    });
  });

  describe('setting, getting and saving', function() {

  });

  describe('relationships', function() {

  });

});
