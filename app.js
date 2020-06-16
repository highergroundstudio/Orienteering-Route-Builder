const geolib = require("geolib");
const Combinatorics = require("js-combinatorics");
// const jsonfile = require("jsonfile");
// var _ = require("lodash");

const fs = require('fs')

let pointDistances = [];
let points = [];

const params = {
  minTotalDistance: 3200, //meters
  maxTotalDistance: 5600, //meters
  minDistanceBetween: 30, //meters
  maxDistanceBetween: 105, //meters
};

const json = require('./points.json')

json.features.map(function (a) {
  points[a.properties.title] = a.geometry.coordinates;
});
console.dir(points)

// Get all possible combinations of points to compare
Combinatorics.combination(Object.keys(points), 2).map(function (a) {
  let distance = geolib.getDistance(points[a[0]], points[a[1]]);

  //Only add point distances that are between our params
  //   if (distance > params.minDistanceBetween && distance < params.maxDistanceBetween) {
  pointDistances[a] = distance;
  //   }
});

console.log(pointDistances);
