require('./spec_helper.js');

describe(jsm.Constructor, function() {
  
  var ConstructorClone;

  beforeEach(function() {
    ConstructorClone = _(function() {}).extend(jsm.Constructor);
  });

  describe(jsm.Constructor.include, function() {

    it ('should extend the constructor\'s prototype', function() {
      ConstructorClone.include({ a: 1 });
      var obj = new ConstructorClone;
      expect(ConstructorClone.prototype.a).toBe(1);
      expect(obj.a).toBe(1);
    });
  });

  describe(jsm.Constructor.mixin, function() {
    
    it ('should extend the constructor itself', function() {
      ConstructorClone.mixin({ foo: 'bar' });
      expect(ConstructorClone.foo).toBe('bar');
    });
  });

  describe(jsm.Constructor.extend, function() {

    describe('with no arguments passed', function() {
      
      it ('should create simple empty object with mixin capabilities and Parent/Constructor links', function() {
        var Maker = jsm.Constructor.extend();
        expect(Maker.Parent).toBe(jsm.Constructor);
        expect(new Maker().Constructor).toBe(Maker);
      });

    });

    describe('extending instance variables', function() {

      it ('should create instance variables for new instances', function() {
        var Maker = jsm.Constructor.extend(function() { this.a = 2 });
        expect(new Maker().a).toBe(2);
      });

      it ('should be inherited', function() {
        var Maker = jsm.Constructor.extend(function() { this.a = 2 }),
            AnotherMaker = Maker.extend();
        expect(new Maker().a).toBe(2);
        expect(new AnotherMaker().a).toBe(2);
      });
    });

    describe('extending prototype properties', function() {
      
      it ('should create prototype properties for new instances', function() {

        var Maker = jsm.Constructor.extend(function() {}, { b: '3' }),
            made = new Maker;

        expect(made.b).toBe('3');
        made.b = '4';
        expect(new Maker().b).toBe('3');
      })

      it ('should be inherited', function() {

        var Maker = jsm.Constructor.extend(function() {}, { b: '3' }),
            AnotherMaker = Maker.extend(),
            made = new Maker,
            another_made = new AnotherMaker;

        expect(made.b).toBe('3');
        expect(another_made.b).toBe('3');

        made.b = '4';

        expect(another_made.b).toBe('3');
      });
    });

    describe('extending constructor properties', function() {
      
      it ('should create constructor properties', function() {
        var Maker = jsm.Constructor.extend(function() {}, {}, { c: '5' });
        expect(Maker.c).toBe('5');
      });

      it ('should be inherited', function() {
        var Maker = jsm.Constructor.extend(function() {}, {}, { c: '5' }),
            AnotherMaker = Maker.extend();
        expect(AnotherMaker.c).toBe('5');
      });
    });
  });
});

