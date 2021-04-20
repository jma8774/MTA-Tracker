const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const data = fs.readFileSync('api/google_transit/stops.csv');
const records = parse(data, { columns: true });


const stops = []
const stopName = {};
const stopId = {};

records.forEach((rec) => {
  stops.push(rec)
  stopName[rec.stop_name] = rec
  stopId[rec.stop_id] = rec
})

// Find stop name using stop id
function findStopName(_stopId) {
  if(_stopId in stopId) {
    return stopId[_stopId].stop_name
  }
  return null
}

// Find stop id using stop name
function findStopId(_stopName) {
  if(_stopName in stopName) {
    return stopName[_stopName].stop_id
  }
  return null
}

// Find stop latitude using stop id
function findStopLat(_stopId) {
  if(_stopId in stopId) {
    return stopId[_stopId].stop_lat
  }
  return null
}

// Find stop latitude using stop id
function findStopLon(_stopId) {
  if(_stopId in stopId) {
    return stopId[_stopId].stop_lon
  }
  return null
}

module.exports = { stops, stopId, stopName, findStopName, findStopId, findStopLat, findStopLon};
