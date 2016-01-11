describe('Model Factory', function () {
  beforeEach(function () {
    $factory.define('myModel', function (f) {
      return {
        name: f.name.findName()
      }
    });
  });

  it('can make models', function () { 
    var result = $factory('myModel').create(1).toArray();

    expect(a.length).toBe(result);
  });

  it('can loop over models', function () {
    var numberOfModels = 0;

    $factory('myModel').create(10).each(function (m) {
      numberOfModels++;
    });

    expect(numberOfModels).toBe(10);
  });

  it('can define models by name', fucntion () {
    $factory.define('myModel', 'anotherName', function (f) {
      return {
        name: 'wow'
      }
    });

    var result = $factory('myModel', 'anotherName').create(1).toArray();

    expect(a.length).toBe(1);
    expect(a[0]).toBe('wow');
  });

  
});