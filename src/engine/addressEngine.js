const EasyGeocoder = require("easy-geocoder");
const Geocoder = new EasyGeocoder({
  useragent: "Location Manager Application"
});

module.exports = class AddressEngine {
  addressToCoords(address) {
    return new Promise(function(resolve, reject) {
      let query;
      if (typeof address.address === "string") {
        query = { q: address.address };
      } else {
        query = address.address;
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
