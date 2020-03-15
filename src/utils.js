module.exports.earthRadiusKm = 6371;
module.exports.degreesToRadians = function(degrees) {
  return (degrees * Math.PI) / 180;
};

module.exports.checkInPolygon = function(point, bounds) {
  let x = point[0];
  let y = point[1];
  let inside = false;

  for (let i = 0, j = bounds.length - 1; i < bounds.length; j = i++) {
    let xi = bounds[i][0];
    let yi = bounds[i][1];
    let xj = bounds[j][0];
    let yj = bounds[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};
