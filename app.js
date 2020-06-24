console.time("app");
const geolib = require("geolib");
const Combinatorics = require("js-combinatorics");
const tools = require("./tools");

let pointDistances = [];
let routeDistances = [];
let points = [];

//Get our geojson file
const json = require("./points.json");

//Get our points from our geojson file and convert to obj
json.features.map(function (a) {
  points[a.properties.title] = a.geometry.coordinates;
});

//Get the area of all points
let area = geolib.getAreaOfPolygon(Object.values(points));
console.log("Area: " + geolib.convertArea(area, "km2") + " square kilometer");

// Get all possible combinations of points to compare
Combinatorics.combination(Object.keys(points), 2).map(function (a) {
  let distance = geolib.getDistance(points[a[0]], points[a[1]]);

  //Only add point distances that are between our params
  tools.between(distance) ? (pointDistances[a] = distance) : false;
});

console.dir(pointDistances);

console.time("routes");

//Get all possible combinations of routes
Combinatorics.power(Object.keys(points)).forEach(function (routeLeg) {
  let coordinatesPaths = [];
  let prevCoord = false;

  //Create a list of our coordinates
  for (let i = 1; i < routeLeg.length; i++) {

    let currCoord = points[routeLeg[i]];
    let distanceLeg = geolib.getDistance(currCoord, prevCoord);

    console.log(currCoord);

    //Set previous coordinate as current
    prevCoord = points[routeLeg[i]];;

    if (tools.between(distanceLeg)) {
      console.log("Good distance: " + distanceLeg);
      coordinatesPaths.push(currCoord);
    } else {
      console.log("Bad distance: " + distanceLeg);
      break;
    }

    //Get the total distance of the route
    let distanceTotal = geolib.getPathLength(coordinatesPaths);
    console.log(distanceTotal);

    //Only add point distances that are between our params
    tools.between(distanceTotal, 1, 10000)
      ? (routeDistances[currCoord] = distanceTotal)
      : false;

    // console.log(Object.keys(routeDistances).length);
  }
});
// console.dir(routeDistances);
console.log("Total routes: " + Object.keys(routeDistances).length);

console.timeEnd("routes");
console.timeEnd("app");
