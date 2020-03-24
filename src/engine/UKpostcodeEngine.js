const PostcodesJS = require("postcodes.js");
const UKPostcodes = new PostcodesJS({
  useragent: "Location Manager Application"
});

module.exports = class UKPostcodeEngine {
  postcodeToCoords(postcode) {
    return new Promise(function(resolve, reject) {
      UKPostcodes.lookup(postcode.postcode)
        .then(data => {
          if (!data)
            reject(new Error("Couldn't find data for provided postcode."));
          resolve([data.latitude, data.longitude]);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
