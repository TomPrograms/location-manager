const PostcodesIO = require("postcodesio-client");
const postcodeAPI = new PostcodesIO();

module.exports = class PostcodeEngine {
  postcodeToCoords(postcode) {
    return new Promise(function(resolve, reject) {
      postcodeAPI
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
