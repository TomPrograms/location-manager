const Nominatim = require("nominatim-geocoder");
const geocoder = new Nominatim();

module.exports = class AddressEngine {
  addressToCoords(address) {
    return new Promise(function(resolve, reject) {
      geocoder
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
