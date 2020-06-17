console.time("app");
require("v8-compile-cache");
const geolib = require("geolib");
const Combinatorics = require("js-combinatorics");

let pointDistances = [];
routeDistances = [];
let points = [];

const params = {
  minTotalDistance: 3200, //meters
  maxTotalDistance: 5600, //meters
  minDistanceBetween: 30, //meters 30
  maxDistanceBetween: 1050, //meters 105
};

const json = require("./points.json");

json.features.map(function (a) {
  points[a.properties.title] = a.geometry.coordinates;
});

// Get all possible combinations of points to compare
// console.time("point distance");
// Combinatorics.combination(Object.keys(points), 2).map(function (a) {
//   let distance = geolib.getDistance(points[a[0]], points[a[1]]);

//   //Only add point distances that are between our params
//   if (
//     distance > params.minDistanceBetween &&
//     distance < params.maxDistanceBetween
//   ) {
//     pointDistances[a] = distance;
//   }
// });
// console.timeEnd("point distance");
// console.dir(pointDistances);

//Get all possible combinations of routes
let routes = Combinatorics.power(Object.keys(points));

//Iterate through the routes and get their distances
routes.forEach(function (a) {
  let coordinatesPaths = [];

  a.forEach(function (b) {
    coordinatesPaths.push(points[b]);
  });
  let distance = geolib.getPathLength(coordinatesPaths);

  //Only add point distances that are between our params
  if (
    distance > params.minTotalDistance &&
    distance < params.maxTotalDistance
  ) {
    routeDistances[a] = distance;
  }
});
// console.dir(routeDistances);
console.log("Total routes: " + Object.keys(routeDistances).length);

console.timeEnd("app");
