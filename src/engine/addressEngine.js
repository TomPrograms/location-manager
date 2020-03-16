const EasyGeocoder = require("easy-geocoder");
const Geocoder = new EasyGeocoder({
  useragent: "Location Manager Application"
});

module.exports = class AddressEngine {
  addressToCoords(address) {
    return new Promise(function(resolve, reject) {
      Geocoder
        .search({ q: address.address })
        .then(response => {
          resolve([response[0].lat, response[0].lon]);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
