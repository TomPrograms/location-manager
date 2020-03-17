const EasyGeocoder = require("easy-geocoder");
const Geocoder = new EasyGeocoder({
  useragent: "Location Manager Application"
});

module.exports = class AddressEngine {
  addressToCoords(address) {
    return new Promise(function(resolve, reject) {
      let query;
      // if address.address is a dictionary
      if (address.address.constructor == Object) {
        query = address.address;
      } else {
        query = { q: address.address };
      }

      Geocoder.search(query)
        .then(response => {
          resolve([response[0].lat, response[0].lon]);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
