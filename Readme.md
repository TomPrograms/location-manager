<div align="center">
  <img src="./docs/assets/logo.png" alt="Location Manager logo">

  <p>Location manager is the easiest solution to maintain service areas and check whether physical locations of various types are within certain defined areas.</p>

  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue">
  </a>
</div>

<br>

> Example: Create circumference of 50km around 10 Downing Street and check if Buckingham Place falls within the circumference.

```js
await LocationManager.addCircumference({
  centre: new LM.Address("10 Downing Street, London"),
  range: 50
});

// evaluates to true
const isInRange = await LocationManager.checkInRange(
  new LM.Address("Buckingham Palace, London")
);
```

## Inspiration

We at Shopolivery needed a way to manage the service area of the Shopolivery service; the Shopolivery service isn't available in all locations, so we needed a convenient, robust library to verify whether user locations of all types (such as postcodes and addresses) were within irregular, defined-by-us service areas, so we created location manager. Location manager helps check whether physical locations are within defined areas such as circumferences and bounds.

## Example Usage

You can install location-manager from NPM:

```
$ npm i location-manager
```

You can then initialise the library in Node:

```js
const LM = require("location-manager");
const LocationManager = new LM();
```

You can then add a valid area to the manager using functions on the LocationManager:

```js
await LocationManager.addBounds({
  bounds: [
    new LM.Address("10 Downing Street, London"),
    new LM.Address("Imperial War Museum, London")
    new LM.Address("Buckingham Palace, London"),
  ]
});
```

This will in effect create a triangle with the three locations as the points, with any address inside the triangle being a valid location for `LocationManager.checkInRange()`.

<img style="max-width: 50%;" src="./docs/assets/exampleImageOne.png">

You can then check for a valid address within the bounds like:

```js
const bigBenLocation = new LM.Address("Big Ben, Westminster");
await LocationManager.checkInRange(bigBenLocation); // evaluates to true
```

Which evaluates to `true` because Big Ben is within the area defined by the bounds above.

<img style="max-width: 50%;" src="./docs/assets/exampleImageTwo.png">

An address such as Victoria Station will evaluate to `false` because it is outside the bounds above.

```js
const victoriaStationLocation = new LM.Address("Victoria Station, London");
await LocationManager.checkInRange(victoriaStationLocation); // evaluates to false
```

<img style="max-width: 50%;" src="./docs/assets/exampleImageThree.png">

## Credit

Made with 💖 by <img src="./docs/assets/shopoliveryLogo.png" width="10%">. We at Shopolivery love open source software - we recognise the internet (and by extent Shopolivery) is only possible with the hard work of open source maintainers - so we are committed to contribute by maintaining and creating open source software under permissive licenses.

Lead Maintainer: [Tom](https://github.com/TomPrograms)

## License

[MIT](./LICENSE)
