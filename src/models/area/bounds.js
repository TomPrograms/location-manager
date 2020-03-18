const polygonCheck = require("robust-point-in-polygon");

module.exports = class BoundsModel {
  constructor(bounds) {
    this.bounds = bounds;

    this.rawBounds = [];
    this.bounds.forEach(bound => {
      this.rawBounds.push([bound.latitude, bound.longitude]);
    });
  }

  checkInBounds(position) {
    const inside = polygonCheck(this.rawBounds, position);

    // if polygon on polygon edge or inside polygon
    return inside === -1 || inside === 0;
  }

  checkInRange(dataModel) {
    const position = [dataModel.latitude, dataModel.longitude];

    return this.checkInBounds(position, this.bounds);
  }
};
