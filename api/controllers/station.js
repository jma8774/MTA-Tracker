const express = require('express');
const router = express.Router();
const trainfn = require('./trainFunctions');
const {stopName} = require('./gtfsData');
const db = require('../models');
const { User } = db;
const passport = require('../middlewares/authentication');

router.get('/', (req,res) => {
  res.json({
    page: 'api/station/',
  });
});


// Returns an array with all of the station names
router.get('/names', passport.isAuthenticated(), (req,res) => {
  let station = Object.keys(stopName);
  res.send(station);
})

// Return information about stations with same name
router.get('/stationName/:station', passport.isAuthenticated(), (req, res) => {
  const station = req.params.station
  relevantStops = {}
  var tripData = []
  trainfn.getTrips(tripData, () => {
    trainfn.findTrainStation(station, tripData, relevantStops)
    trainfn.updateStops(tripData, relevantStops)
    res.send(JSON.stringify(relevantStops))
  })
})

// Return favorite stations to update cards
router.get('/favorite', passport.isAuthenticated(), (req, res) => {
  const username = req.user.dataValues.username;
  User.findByPk(username)
  .then(user => {
    if (!user) {
      return res.sendStatus(404);
    }
    const favorites = user['favorites']
    var stationMap = {}
    var tripData = []
    favorites.forEach(val => {
      stationMap[val] = {}
    })
    trainfn.getTrips(tripData, () => {
      trainfn.findFavorites(stationMap)
      trainfn.updateStops(tripData, stationMap)
      res.status(200).json(stationMap)
    })
  });
})

module.exports = router;
