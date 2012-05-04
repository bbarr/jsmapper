require('./spec_helper.js');

describe(jsm.Collection, function() {

  var col, record;

  beforeEach(function() {
    col = new jsm.Collection();
    record = new jsm.Model({ a: 1 });
  });

  it ('should add an object, coercing it into a model', function() {
    col.add({ some: 'object' });
    expect(col.array[0]._jsm_id).toBeDefined();
  });

  it ('should coerce to whatever model the collection is given', function() {
    var NewModel = jsm.Model.extend('new_model');
    col = new jsm.Collection(NewModel);
    col.add({ some: 'object' });
    expect(col.array[0].Constructor.model).toBe('new_model');
  });

  it ('should not add a model that already exists in the collection', function() {
    col.add(record);
    expect(col.array.length).toBe(1);
    col.add(record);
    expect(col.array.length).toBe(1);
  });

  it ('should remove a model', function() {
    col.add(record);
    expect(col.array.length).toBe(1);
    col.remove(record);
    expect(col.array.length).toBe(0);
  });

  it ('should return all as an array', function() {
    expect(col.all()).toEqual([]);
    col.add(record);
    expect(col.all()).toEqual([record]);
  });

  it ('should return only a copy of collection array', function() {
    col.add(record);
    var all = col.all();
    all.push(1);
    expect(col.all().length).toBe(1);
  });

  it ('should find model by id', function() {
    col.add(record);
    expect(col.find(record._jsm_id)).toBe(record);
  });

  it ('should find model by object of requirements', function() {
    col.add(record);
    col.add(new (jsm.Model.extend('new_model', function() { this.a = 1; this.b = '2' })));
    expect(col.where({ a: 1, b: '2' }).length).toBe(1);
  });
});
