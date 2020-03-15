const { checkInPolygon } = require("../../utils.js");

module.exports = class BoundsModel {
  constructor(bounds) {
    this.bounds = bounds;

    this.rawBounds = [];
    this.bounds.forEach(bound => {
      this.rawBounds.push([bound.latitude, bound.longitude]);
    });
  }

  checkInBounds(position) {
    return checkInPolygon(position, this.rawBounds);
  }

  checkValid(dataModel) {
    const position = [dataModel.latitude, dataModel.longitude];

    return this.checkInBounds(position, this.bounds);
  }
};
