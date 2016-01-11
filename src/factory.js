$factory = function (collection, collectionName) {
  var factoryData;

  if (collectionName != null) {
    factoryData = $factory._collections[collectionName];
  } else {
    factoryData = $factory._collections[collection];
  }

  if (typeof factoryData === 'undefined') {
    throw new Error('That collection could not be found!');
  }

  var create = function (number) {
    number = number || 1;

    var data = _.map(_.range(number), function () {
      return factoryData.generator(faker);
    });

    // Use closure!
    return {
      insertAll: function () {
        _.each(data, function (datum) {
          collection.insert(datum);
        });
      },
      each: function (callback) {
        _.each(data, callback);
      },
      toArray: function () {
        return data;
      }
    }
  }

  return {
    create: create
  }
};

$factory._collections = {};

$factory.define = function (collection, generator) {
  $factory._collections[collection] = {
    generator: generator,
    collection: collection
  };
};

$factory.defineAs = function (collection, collectionName, generator) {
  $factory._collections[collectionName] = {
    generator: generator,
    collection: collection
  };
};

/**
 * Developers beware! Raw will not look at your regEx fields!
 * It will only generate Strings, Numbers, Booleans, and Arrays of those types!
 */
$factory.raw = function (collection) {
  var fieldGenerator = function (type) {
    if (type === String) {
      return faker.lorem.words(1);
    } else if (type === Number) {
      return faker.random.number();
    } else if (type === Boolean) {
      return faker.random.boolean();
    } else if (type instanceof Array) {
      var randomNumber = faker.random.number();
      var innerType = type[0];
      var data = [];

      _.each(_.range(randomNumber), function() {

        data.push(fieldGenerator(innerType));
      })

      return data;
    } else {
      return null;
    }
  }

  // Using "private" variables, careful!
  var schema = collection._c2._simpleSchema._schema;
  var data = {};

  for (var prop in schema) {
    if (schema.hasOwnProperty(prop)) {
      data[prop] = fieldGenerator(schema[prop].type);
    }
  }

  return data;
};
