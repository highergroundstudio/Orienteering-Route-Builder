// tools.js
// ========
const params = {
  minTotalDistance: 3200, //meters 3200
  maxTotalDistance: 6000, //meters 6000
  minDistPerLeg: 30, //meters
  maxDistPerLeg: 500, //meters
  routeLegsMin: 4,
  routeLegsMax: 16,
  routesNeeded: 10,
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
  betweenTotal: function (
    x,
    min = params.minTotalDistance,
    max = params.maxTotalDistance
  ) {
    //Check if x is between two numbers - defaults to min and max per leg
    return x >= min && x <= max;
  },
  betweenLegAmt: function (
    x,
    min = params.routeLegsMin,
    max = params.routeLegsMax
  ) {
    return x >= min && x <= max;
  },
  randomRoutes: function (routes){
    let keys = Object.keys(routes)
    let randomRouteKeys = [];
    let randomRoutes = [];

    for (let step = 0; step < params.routesNeeded; step++) {
      randomRouteKeys.push(keys[Math.floor(Math.random()*keys.length)])
    }
    for (var i = 0; i < randomRouteKeys.length; i++) {
      randomRoutes[randomRouteKeys[i]] = routes[randomRouteKeys[i]];
    }

    return randomRoutes
  }
};
