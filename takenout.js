let lastPoint = false;
  for (let point in routePoints) {
    let curPointCoord = points[point];
    
    if(point == 0 || lastPoint == false){
        console.log('Continue')
        continue;
    }

    console.log(curPointCoord)

    // Get our distance between points within the route
    let distance = geolib.getDistance(curPointCoord, lastPoint);
    console.log(distance)

    // Check if not within our params
    if (
      distance > params.minDistanceBetween &&
      distance < params.maxDistanceBetween
    ) {
      console.log("Good point");
      lastPoint = curPointCoord;
    } else {
      console.log("Deleting " + routeDistances[key]);
      delete routeDistances[key];
      break;
    }
  }



  //   a.forEach(function (b) {
//     //Create a list of our coordinates
//     coordinatesPaths.push(points[b]);
//   });