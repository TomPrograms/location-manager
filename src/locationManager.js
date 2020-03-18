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
    this.postcodeEngine =
      options.postcodeEngine || new DefaultUKPostcodeEngine();

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

  checkAreaModel(areaModel) {
    if (!areaModel) return false;
    else if (
      areaModel instanceof CircumferenceModel ||
      areaModel instanceof BoundsModel
    )
      return true;
    else return false;
  }

  addAreaModel(areaModel) {
    if (!this.checkAreaModel(areaModel))
      throw new Error("Couldn't add invalid area mapping model.");
    this.mappings.push(areaModel);
  }

  async checkMappings(mappings, dataModel) {
    if (!this.checkValidData(dataModel))
      throw new Error("Invalid location data model provided.");

    dataModel = await this.convertToCoords(dataModel);

    for (let i = 0; i < mappings.length; i++) {
      const result = mappings[i].checkInRange(dataModel);
      if (result === true) return true;
    }
    return false;
  }

  async checkInModelRange(model, dataModel) {
    model = Array.isArray(model) ? model : [model];
    return await this.checkMappings(model, dataModel);
  }

  async checkInRange(dataModel) {
    return await this.checkMappings(this.mappings, dataModel);
  }

  async createCircumferenceModel(options) {
    let centre = options.centre;
    if (!this.checkValidData(centre))
      throw new Error("No valid centre argument provided.");

    centre = await this.convertToCoords(centre);
    return new CircumferenceModel(centre, options.range);
  }

  async addCircumference(options) {
    const newMapping = await this.createCircumferenceModel(options);
    this.mappings.push(newMapping);
  }

  async createCircumference(options) {
    return await this.createCircumferenceModel(options);
  }

  async createBoundsModel(options) {
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

    return new BoundsModel(bounds);
  }

  async addBounds(options) {
    const newMapping = await this.createBoundsModel(options);
    this.mappings.push(newMapping);
  }

  async createBounds(options) {
    return await this.createBoundsModel(options);
  }
};
