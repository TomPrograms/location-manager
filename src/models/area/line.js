module.exports = class Line {
  constructor(alignment, type, side) {
    this.alignment = alignment;
    this.type = type;
    this.side = side;
  }

  checkVerticalLine(dataModel) {
    let alignmentLongitude = this.alignment.longitude;
    let dataLongitude = dataModel.longitude;
    return this.side === "above"
      ? alignmentLongitude < dataLongitude
      : alignmentLongitude > dataLongitude;
  }

  checkHorizontalLine(dataModel) {
    let alignmentLatitude = this.alignment.latitude;
    let dataLatitude = dataModel.latitude;
    return this.side === "left"
      ? alignmentLatitude > dataLatitude
      : alignmentLatitude < dataLatitude;
  }

  checkInRange(dataModel) {
    if (this.type === "vertical") return this.checkVerticalLine(dataModel);
    if (this.type === "horizontal") return this.checkHorizontalLine(dataModel);
  }
};
