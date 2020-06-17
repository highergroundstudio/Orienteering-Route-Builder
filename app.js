console.time("app");
const geolib = require("geolib");
const Combinatorics = require("js-combinatorics");

let pointDistances = [];
routeDistances = [];
let points = [];

const params = {
  minTotalDistance: 3200, //meters
  maxTotalDistance: 5600, //meters
  minDistanceBetween: 30, //meters 30
  maxDistanceBetween: 1000, //meters 105
};

const json = require("./points.json");

json.features.map(function (a) {
  points[a.properties.title] = a.geometry.coordinates;
});

// Get all possible combinations of points to compare
console.time("point distance");
Combinatorics.combination(Object.keys(points), 2).map(function (a) {
  let distance = geolib.getDistance(points[a[0]], points[a[1]]);

  //Only add point distances that are between our params
  if (
    distance > params.minDistanceBetween &&
    distance < params.maxDistanceBetween
  ) {
    pointDistances[a] = distance;
  }
});
console.timeEnd("point distance");
console.dir(pointDistances);



console.time("routes");

//Get all possible combinations of routes
let routes = Combinatorics.power(Object.keys(points));

// Iterate through the routes and get their distances
routes.forEach(function (a) {
  let coordinatesPaths = [];
  let prevCoord = false;
  let badRoute = false;

  //Create a list of our coordinates
  for (let i = 0; i < a.length; i++) {
    let currCoord = points[a[i]];

    //If first time then no need to get distance
    if (prevCoord) {
      let distance = geolib.getDistance(currCoord, prevCoord);
      if (
        distance > params.minDistanceBetween &&
        distance < params.maxDistanceBetween
      ) {
        // console.log("Good distance: " + distance);
        
      } else {
        // console.log("Bad distance: " + distance);
        badRoute = true;
        break;
      }
    }

    //Push to coordinates list
    coordinatesPaths.push(currCoord);
    //Set previous coordinate as current
    prevCoord = currCoord;
  }

  if (badRoute === false) {
    //Get the total distance of the route
    let distance = geolib.getPathLength(coordinatesPaths);
    // console.log(distance)

    //Only add point distances that are between our params
    if (
      distance > params.minTotalDistance &&
      distance < params.maxTotalDistance
    ) {
      routeDistances[a] = distance;
    }
  }
});
// console.dir(routeDistances);
console.log("Total routes: " + Object.keys(routeDistances).length);

console.timeEnd("routes");
console.timeEnd("app");
