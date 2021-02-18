console.time("app");

const geolib = require("geolib");
const Combinatorics = require("js-combinatorics");
const tools = require("./tools");

let pointDistances = [];
let routeDistances = [];
let points = [];

//Get our geojson file
const json = require("./locs.json");

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
  let prevCoord;
  let firstItem = true;

  // console.log(routeLeg.length);

  //Check if our amount of legs is between our params
  if (!tools.betweenLegAmt(routeLeg.length)) {
    //Exit
    return;
  }

  //Create a list of our coordinates
  for (var i = 0; i < routeLeg.length; i++) {
    let currCoord = points[routeLeg[i]];

    if (firstItem) {
      prevCoord = currCoord;
      firstItem = false;
      continue;
    }

    let distanceLeg = geolib.getDistance(currCoord, prevCoord);

    // console.log(distanceLeg)

    //Set previous coordinate as current
    prevCoord = currCoord;

    if (tools.between(distanceLeg)) {
      // console.log("Good distance: " + distanceLeg);
      coordinatesPaths.push(currCoord);
    } else {
      // console.log("Bad distance: " + distanceLeg);
      break;
    }
  } //end for loop

  //Get the total distance of the route
  let distanceTotal = geolib.getPathLength(coordinatesPaths);
  // console.log(distanceTotal);

  //Only add point distances that are between our params
  tools.betweenTotal(distanceTotal)
    ? (routeDistances[routeLeg] = distanceTotal)
    : false;

  // console.log(Object.keys(routeDistances).length);
});
// console.dir(routeDistances);
console.log("Total routes: " + Object.keys(routeDistances).length);
// console.dir(routeDistances)

console.dir(tools.randomRoutes(routeDistances));

console.timeEnd("routes");
console.timeEnd("app");
