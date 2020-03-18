const { degreesToRadians, earthRadiusKm } = require("../../utils.js");

module.exports = class CircumferenceModel {
  constructor(centre, range) {
    this.centre = centre;
    this.range = range;
  }

  /* Find distance between from centre of circumference in kilometers.
   *
   * @param {Number} lat - latitude of co-ordinate to test.
   * @param {Number} lon - Longitude of co-ordinate to test.
   * @returns {Number} Returns distance between two coordinates in kilometers.
   */
  rangeFromCentre(lat, lon) {
    let centreLatitude = this.centre.latitude;
    let centreLongitude = this.centre.longitude;

    lat = degreesToRadians(lat);
    centreLatitude = degreesToRadians(centreLatitude);

    let latDiff = degreesToRadians(centreLatitude - lat);
    let lonDiff = degreesToRadians(centreLongitude - lon);

    let a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2) *
        Math.cos(lat) *
        Math.cos(lat);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }

  checkInRange(dataModel) {
    const latitude = dataModel.latitude;
    const longitude = dataModel.longitude;

    const distanceFromCentre = this.rangeFromCentre(latitude, longitude);

    return distanceFromCentre <= this.range;
  }
};
