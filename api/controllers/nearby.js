const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');
const passport = require('../middlewares/authentication');

router.get('/', (req,res) => {
  res.json({
    page: 'api/nearby/',
  });
});

// Return nearby station names  based on lat,lon and min distance in KM
router.get('/lat/:lat/lon/:lon/dist/:dist', passport.isAuthenticated(), (req, res) => {
  const lat = req.params.lat
  const lon = req.params.lon
  const dist = req.params.dist
  nearbyStops = {}
  // Using the stop names, I get all the trains arriving/departing
  var tripData = []
  trainfn.getTrips(tripData, () => {
    trainfn.findNearbyStops(lat, lon, dist, tripData, nearbyStops)
    trainfn.updateStops(tripData, nearbyStops)
    res.send(JSON.stringify(nearbyStops))
  })
});

module.exports = router;