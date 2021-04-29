const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');
const passport = require('../middlewares/authentication');
const cache = require('../middlewares/cache')
const sortOrders = require('../google_transit/sortOrder')
const DNE = -1 // Switch between -1 or 500 (bigger than the number of stations) for reverse sort

router.get('/', (req,res) => {
  res.json({
    page: 'api/line/'
  });
});

// Return all the stations for a train line and the the live time of the trains going to those stations
router.get('/:train', cache(30), passport.isAuthenticated(), (req, res) => {
  var train = req.params.train
  var stationMap = {}
  trainfn.getTrips((tripData) => {
    trainfn.findTrainStops(train, tripData, stationMap)
    trainfn.updateStops(tripData, stationMap)
    // Sort by StopId
    train = train.toString().toLowerCase()
    console.log(train)
    console.log("SORTS", Object.keys(sortOrders[train]).length)
    console.log("STATOINS", Object.keys(stationMap).length)
    stationMap = Object.keys(stationMap).sort((a, b) => {
      const aVal = a in sortOrders[train] ? sortOrders[train][a] : DNE
      const bVal = b in sortOrders[train] ? sortOrders[train][b] : DNE
      console.log(aVal, bVal)
      // Switching -1 and 1 can reverse the order of the sort of the sortOrders (need to change DNE also)
      return aVal > bVal ? -1 : 1
    }).map((stopId) => {
      return {
        stopId: stopId,
        stopName: stationMap[stopId]['stopName'],
        trains: stationMap[stopId]['trains'],
        coordinates: stationMap[stopId]['coordinates']
      }
    })
    res.send(JSON.stringify(stationMap))
  })
});

module.exports = router;