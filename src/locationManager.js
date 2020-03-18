// import engines
const DefaultAddressEngine = require("./engine/addressEngine.js");
const DefaultUKPostcodeEngine = require("./engine/UKpostcodeEngine.js");

// import position models
const CoordinateModel = require("./models/position/coordinate.js");
const UKPostcodeModel = require("./models/position/UKpostcode.js");
const AddressModel = require("./models/position/address.js");

// import area models
const CircumferenceModel = require("./models/area/circumference.js");
const BoundsModel = require("./models/area/bounds.js");

module.exports = class LocationManager {
  constructor(options = {}) {
    this.addressEngine = options.addressEngine || new DefaultAddressEngine();
    this.postcodeEngine = options.postcodeEngine || new DefaultUKPostcodeEngine();

    this.mappings = [];
  }

  async convertToCoords(dataModel) {
    if (dataModel instanceof CoordinateModel) return dataModel;
    if (dataModel.latitude && dataModel.longitude) return dataModel;

    if (dataModel instanceof UKPostcodeModel) {
      const coords = await this.postcodeEngine.postcodeToCoords(dataModel);
      dataModel.latitude = coords[0];
      dataModel.longitude = coords[1];
    } else if (dataModel instanceof AddressModel) {
      const coords = await this.addressEngine.addressToCoords(dataModel);
      dataModel.latitude = coords[0];
      dataModel.longitude = coords[1];
    }

    return dataModel;
  }

  checkValidData(dataModel) {
    if (!dataModel) return false;
    else if (
      dataModel instanceof CoordinateModel ||
      dataModel instanceof UKPostcodeModel ||
      dataModel instanceof AddressModel
    )
      return true;
    else return false;
  }

  checkInRange(dataModel) {
    return new Promise((resolve, reject) => {
      if (!this.checkValidData(dataModel))
        reject(new Error("No valid location data provided."));

      this.convertToCoords(dataModel).then(dataModel => {
        let mappings = this.mappings;
        for (let i = 0; i < mappings.length; i++) {
          const result = mappings[i].checkValid(dataModel);
          if (result === true) resolve(true);
        }

        resolve(false);
      });
    });
  }

  async addCircumference(options) {
    let centre = options.centre;
    if (!this.checkValidData(centre))
      throw new Error("No valid centre argument provided.");
    centre = await this.convertToCoords(centre);

    const newMapping = new CircumferenceModel(centre, options.range);

    this.mappings.push(newMapping);
  }

  async addBounds(options) {
    const convert = async data => {
      if (!this.checkValidData(data))
        throw new Error(data + " is not a valid argument.");

      return await this.convertToCoords(data);
    };

    let bounds = options.bounds;
    let promises = [];
    for (let i = 0; i < bounds.length; i++) {
      promises.push(convert(bounds[i]));
    }
    await Promise.all(promises);

    const newMapping = new BoundsModel(bounds);

    this.mappings.push(newMapping);
  }
};
