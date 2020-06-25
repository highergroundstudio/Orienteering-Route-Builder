// tools.js
// ========
const config = require('config');

module.exports = {
  between: function (
    x,
    min = config.get('distance.perLeg.min'),
    max = config.get('distance.perLeg.max')
  ) {
    //Check if x is between two numbers - defaults to min and max per leg
    return x >= min && x <= max;
  },
  betweenTotal: function (
    x,
    min = config.get('distance.total.min'),
    max = config.get('distance.total.max')
  ) {
    //Check if x is between two numbers - defaults to min and max per leg
    return x >= min && x <= max;
  },
  betweenLegAmt: function (
    x,
    min = config.get('routes.legs.min'),
    max = config.get('routes.legs.max')
  ) {
    return x >= min && x <= max;
  },
  randomRoutes: function (routes){
    let keys = Object.keys(routes)
    let randomRouteKeys = [];
    let randomRoutes = [];

    for (let step = 0; step < config.get('routes.needed'); step++) {
      randomRouteKeys.push(keys[Math.floor(Math.random()*keys.length)])
    }
    for (var i = 0; i < randomRouteKeys.length; i++) {
      randomRoutes[randomRouteKeys[i]] = routes[randomRouteKeys[i]];
    }

    return randomRoutes
  }
};
