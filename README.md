# Model Factories for Meteor

[![Build Status](https://travis-ci.org/CapsuleCat/MeteorModelFactories.svg?branch=master)](https://travis-ci.org/CapsuleCat/MeteorModelFactories) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

## Documentation

Model factories allows you to quickly generate a lot of data for your collections. You simply define your data generators, and then create
models from those generators.

Uses [digilord:faker](https://atmospherejs.com/digilord/faker). See [the faker docs](https://github.com/Marak/faker.js) for more information.

### Define Your Model Factories

You define a model by associating a generator callback with the collection (faker is passed in as a callback parameter):

```js
$factory.define(Todos, function (faker) {
  return {
    text: faker.lorem.words(1, 5),
    createdAt: faker.date.past(),
    checked: faker.random.boolean()
  }
});
```

You can define multiple model factories for the same collection by using `defineAs`:

```js
$factory.defineAs(Todos, 'todos that are not checked', function (faker) {
  return {
    text: faker.lorem.words(1, 5),
    createdAt: faker.date.past(),
    checked: false
  }
});
```

If you have attached a [Simple Schema ](https://github.com/aldeed/meteor-simple-schema) to your collection, you can use the helper utility `raw` to generate a best-guess of your model:

```js
$factory.define(Todos, function (faker) {
  return $factory.raw(Todos);
});
```

### Create Models

You can create models by specifying the collection to generate models for:

```js
$factory(Todos).create(10).each(function(todo) {
  console.log(todo);
});
```

If you have named a generator, you pass the name as the second parameter:

```js
$factory(Todos, 'todos that are not checked').create(10).each(function(todo) {
  console.log(todo);
});
```

You can transform the data into an array if you want:

```js
var todos = $factory(Todos).create(10).toArray();
```

Or just have all of the data inserted into the collection for you:

```js
$factory(Todos).create(10).insertAll();
```

## Running Tests

Tests use Jasmine. You can run tests completely from the command line using:

```sh
VELOCITY_TEST_PACKAGES=1 meteor test-packages --driver-package velocity:html-reporter --velocity ./
```