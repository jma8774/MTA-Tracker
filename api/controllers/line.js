const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');

router.get('/', (req,res) => {
  res.json({
    page: 'api/line/',
  });
});

// Return all the stations for a train line and the the live time of the trains going to those stations
router.get('/:train', (req, res) => {
  const train = req.params.train
  var tripData = []
  var stationMap = {}
  trainfn.getTrips(tripData, () => {
    trainfn.findTrainStops(train, tripData, stationMap)
    trainfn.updateStops(tripData, stationMap)
    // Sort by StopId
    stationMap = Object.keys(stationMap).sort().reduce(
      (obj, key) => { 
        obj[key] = stationMap[key]; 
        return obj;
      }, 
      {}
    );
    res.send(JSON.stringify(stationMap))
  })
});

module.exports = router;