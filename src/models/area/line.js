module.exports = class Line {
  constructor(alignment, type, side) {
    this.alignment = alignment;
    this.type = type;
    this.side = side;
  }

  checkVerticalLine(dataModel) {
    let alignmentLongitude = parseFloat(this.alignment.longitude);
    let dataLongitude = parseFloat(dataModel.longitude);
    // larger longitude means further left
    return this.side === "left"
      ? alignmentLongitude > dataLongitude
      : alignmentLongitude < dataLongitude;
  }

  checkHorizontalLine(dataModel) {
    let alignmentLatitude = parseFloat(this.alignment.latitude);
    let dataLatitude = parseFloat(dataModel.latitude);
    // larger latitude means higher up
    return this.side === "above"
      ? alignmentLatitude < dataLatitude
      : alignmentLatitude > dataLatitude;
  }

  checkInRange(dataModel) {
    if (this.type === "vertical") return this.checkVerticalLine(dataModel);
    if (this.type === "horizontal") return this.checkHorizontalLine(dataModel);
  }
};
