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

const isInRange = await LocationManager.checkInRange(
  new LM.Address("Buckingham Palace, London")
);
```

## Inspiration

We at Shopolivery needed a way to manage to manage the service area of the Shopolivery service; the Shopolivery service isn't available in all locations, so we needed a convenient, robust library to verify whether user locations of all types (such as postcodes and addresses) where within irregular, defined-by-us service areas, so we created location manager. Location manager helps check whether physical locations are within defined areas such as circumferences and bounds.

## Credit

Made with 💖 by <img src="./docs/assets/shopoliveryLogo.png" width="10%">. We at Shopolivery love open source software - we recognise the internet (and by extent Shopolivery) is only possible with the hard work of open source maintainers - so we are committed to contribute by maintaining and creating open source software under permissive licenses.

Lead Maintainer: [Tom](https://github.com/TomPrograms)

## License

[MIT](./LICENSE)
