const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');
const {stopName} = require('./gtfsData');

router.get('/', (req,res) => {
  res.json({
    page: 'api/station/',
  });
});


// Returns an array with all of the station names
router.get('/names', (req,res) => {
  let station = Object.keys(stopName);
  res.send(station);
})

// Return information about stations with same name
router.get('/:station', (req, res) => {
  const station = req.params.station
  relevantStops = {}
  var tripData = []
  trainfn.getTrips(tripData, () => {
    trainfn.findTrainStation(station, tripData, relevantStops)
    trainfn.updateStops(tripData, relevantStops)
    res.send(JSON.stringify(relevantStops))
  })
})

module.exports = router;
