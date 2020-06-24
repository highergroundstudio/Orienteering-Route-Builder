// tools.js
// ========
const params = {
  minTotalDistance: 3200, //meters
  maxTotalDistance: 6000, //meters
  minDistPerLeg: 30, //meters
  maxDistPerLeg: 500, //meters
  routesNeeded: 30,
};

module.exports = {
  between: function (
    x,
    min = params.minDistPerLeg,
    max = params.maxDistPerLeg
  ) {
    //Check if x is between two numbers - defaults to min and max per leg
    return x >= min && x <= max;
  },
  bar: function () {
    // whatever
  },
};
