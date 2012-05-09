require('./spec_helper.js');

describe(jsm.Model, function() {

  describe('keys', function() {

    it ('should add a key to the keys array', function() {
      var Person = jsm.Model.extend('person', function() { this.key('name'); });
      expect(new Person().keys.indexOf('name')).toBeGreaterThan(-1);
    });
  });

  describe('setting and getting', function() {

    it ('should set an attribute to the changes object', function() {
      var person = new (jsm.Model.extend('person'));
      person.set('a', 1);
      expect(person.data.a).toBe(1);
    });

    it ('should get an attribute from the data object', function() {
      var person = new (jsm.Model.extend('person'));
      person.data.a = 1;
      expect(person.get('a')).toBe(1);
    });
  });

  describe('relationships', function() {
  });

});
