const PostcodesJS = require("postcodes.js");
const Postcodes = new PostcodesJS();

module.exports = class PostcodeEngine {
  postcodeToCoords(postcode) {
    return new Promise(function(resolve, reject) {
      Postcodes
        .lookup(postcode.postcode)
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
