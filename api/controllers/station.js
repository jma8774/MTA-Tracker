const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');

router.get('/', (req,res) => {
  res.json({
    page: 'api/station/',
  });
});

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
