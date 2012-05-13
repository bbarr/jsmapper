require('./spec_helper.js');

describe(jsm.Model, function() {

  describe('creation', function() {
    
    it ('should be creatable with only a name', function() {
      var Person = jsm.Model.extend('person'),
          person = new Person;
      expect(person._jsm_id).toBeDefined();
    });

    it ('should inherit from another class', function() {
      var Person = jsm.Model.extend('person');
      //Person.include({ family: 'mammal', quadroped: false });
      var Baby = Person.extend('child');
      //Baby.include({ quadroped: true });
      var baby = new Baby;
      //expect(baby.quadroped).toBeTrue();
      //expect(baby.family).toBe('mammal');
    });
  });

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
