var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require("request");
var traindb = require('./gtfsData')
var ProtoBuf = require('protobufjs');
var https = require('https');
var sortOrders = require('../google_transit/sortOrder')

const urls = [
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-7',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si'
]

const supportedTrains = new Set([
  '1',
  '2',
  '3',
  '4',
  '5',
  '5x',
  '6',
  '6x',
  '7',
  '7x',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'j',
  'l',
  'm',
  'n',
  'q',
  'r',
  'si',
  'w',
  'z'
]);

var time = new Date()
var tripData = []

function callbackHelper(callback, arg1) {
  callback(arg1)
}

// Get all live train line information of API calls in urlList
async function getTrips(callback) {
  const newTime = new Date()
  const difference = (newTime.getTime() - time.getTime()) / 1000;

  if(difference < 30 && tripData.length > 0) {
    callbackHelper(callback, tripData)
    return
  }
  // console.log("\nStarted fetching getTrips")
  time = newTime
  tripData = []
  var numFetched = 0
  const getCallback = function(res) {
    // gather the data chunks into a list
    var data = [];
    res.on("data", function(chunk) {
        data.push(chunk);
    });
    res.on("end", function() {
        // merge the data to one buffer, since it's in a list
        data = Buffer.concat(data);
        // create a FeedMessage object by decooding the data with the protobuf object
        var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
        // do whatever with the object
        feed.entity.forEach(function(entity) {
          if (entity.tripUpdate) {
            tripData.push(entity.tripUpdate)
            // console.log(entity.tripUpdate);
          }
          if (entity.serviceAlert) {
            console.log(entity.serviceAlert);
          }
          if (entity.vehicle) {
            // console.log(entity.vehicle);
          }
        });
        numFetched ++
        // console.log("\nCompleted one")
        if(numFetched === 9) {
          // console.log("\nFinished fetching live data from all 9 APIs")
          callbackHelper(callback, tripData)
        }
    }); 
  }

  urls.forEach(url => {
    https.get(
      url, 
      { headers: { "x-api-key": process.env.KEY} },
      getCallback);
  })
}

function findTrainStation(station, tripData, relevantStops){
  traindb.stops.forEach(row => {
    if(station === row.stop_name){
      var stopId = row.stop_id
      if(stopId.charAt(stopId.length-1) == 'N' || stopId.charAt(stopId.length-1) == 'S')
        stopId = stopId.substring(0, stopId.length-1)
        relevantStops[stopId] = {
          stopName: row.stop_name,
          trains: {},
          coordinates: {
            lat: traindb.findStopLat(stopId),
            lon: traindb.findStopLon(stopId)
          }
      }
    }
  })
}

// Initialize object with favorite stops (ready to update)
function findFavorites(stationMap) {
  Object.keys(stationMap).forEach(stopId => {
    stopName = traindb.findStopName(stopId)
    if(!stopName)
      return
    lat = traindb.findStopLat(stopId)
    lon = traindb.findStopLon(stopId)
    stationMap[stopId] = {
      stopName: traindb.findStopName(stopId),
      trains: {},
      coordinates: {
        lat: traindb.findStopLat(stopId),
        lon: traindb.findStopLon(stopId)
      }
    }

  })
}


// Initialize stationMap with all stations of a certain line
function findTrainStops(train, tripData, stationMap) {
  tripData.forEach(data => {
    const trip = data.trip
    const trainType = trip.routeId
    const stops = data.stopTimeUpdate;
    // Skip if: (or)
    //   The trains are not equal
    //   Stop is undefined
    //   Train does not exist in sortOrder 
    if(trainType !== train || !stops || !sortOrders[train.toLowerCase()])
      return
    stops.forEach(stop => {
      var stopId = stop.stopId
      stopName = traindb.findStopName(stopId)
      stopId = stopId.substring(0, stopId.length-1)
      // Skip if the stop is not in sortedOrders (meaning it is a changed service route)
      if(sortOrders[train.toLowerCase()][stopId] === undefined)
        return
      // Create station if it doesn't exist
      if(!(stopId in stationMap) && stopName) {
        stationMap[stopId] = {
          stopName: stopName,
          trains: {},
          coordinates: {
            lat: traindb.findStopLat(stopId),
            lon: traindb.findStopLon(stopId)
          }
        }
      }
    })
  })
}

// Time given by GTFS is in seconds since epoch, this converts it to local date
function convertEpochToLocalDate(epoch) {
  if(epoch !== null){
    var utcSeconds = epoch.low;
    var date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    return date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric', second:'numeric', hour12:true } )
  }
}

// Find all nearby stops and initialize nearbyStops object
function findNearbyStops(lat, lon, dist, tripData, nearbyStops) {
  traindb.stops.forEach(row => {
    if(!row.stop_name)
      return
    if(distance(lat, lon, row.stop_lat, row.stop_lon, 'K') < dist && !(row.stop_name in nearbyStops)) {
      var stopId = row.stop_id
      if(stopId.charAt(stopId.length-1) == 'N' || stopId.charAt(stopId.length-1) == 'S')
        stopId = stopId.substring(0, stopId.length-1)
        nearbyStops[stopId] = {
          stopName: row.stop_name,
          trains: {},
          coordinates: {
            lat: traindb.findStopLat(stopId),
            lon: traindb.findStopLon(stopId)
          }
      }
    }
  })
  // console.log("Found all nearby stops at (", lat, lon, ") at a distance of", dist, "KM" )
}

// Given a stops object that is initialize with 
// stops[stopId] = {
//   stopName: 'stop_name',
//   trains: {}
// We will update it with all trains and time
function updateStops(tripData, stopsObj) {
  const curTimeEpoch = new Date().getTime() / 1000
  // console.log("START TIME", curTimeEpoch)
  tripData.forEach(data => {
    const trip = data.trip
    const trainType = trip.routeId
    const stops = data.stopTimeUpdate;
    if(!stops)
      return
    stops.forEach(stop => {
      const arrival = stop.arrival && parseFloat(stop.arrival.time) > curTimeEpoch  ? stop.arrival.time : null
      const departure = stop.departure && parseFloat(stop.departure.time) > curTimeEpoch ? stop.departure.time : null
      // const arrival = stop.arrival ? stop.arrival.time : null
      // const departure = stop.departure ? stop.departure.time : null
      var stopId = stop.stopId
      delete stopsObj[stopId]
      const direction = stopId.charAt(stopId.length-1) === 'N' ? "uptown" : "downtown"
      const stopName = traindb.findStopName(stopId)
      stopId = stopId.substring(0, stopId.length-1)
      
      // Return if parsed stop is not nearby, else initialize stop if it doesn't exist yet
      if(!(stopId in stopsObj) || !supportedTrains.has(trainType.toLowerCase()))
        return

      // Create traintype for the stop if it doesn't exist already
      if(!(trainType in stopsObj[stopId]['trains'])) {
        stopsObj[stopId]['trains'][trainType] = {
          "uptown": null,
          "downtown": null,
        }
      }
      

      // Update Uptown/Downtown Time for each stop
      var oldStationTime = stopsObj[stopId]['trains'][trainType][direction]
      var newStationTime = parseFloat(arrival ? arrival : departure)
      // if(direction === 'uptown' && trainType === 'D' && stopId === 'A15') {
      //   console.log('ARRIVAL', parseFloat(stop.arrival.time), curTimeEpoch, arrival)
      //   console.log('DEPARTURE', parseFloat(stop.departure.time), curTimeEpoch, departure)
      //   console.log("NEW TIME", newStationTime)
      // }
      if(!oldStationTime)
        stopsObj[stopId]['trains'][trainType][direction] = newStationTime
      else if(!newStationTime)
        stopsObj[stopId]['trains'][trainType][direction] = newStationTime < oldStationTime ? newStationTime : oldStationTime
    })
  })
  // console.log("Updated nearby train stops")
}

// Distance in Default/Miles, 'K'/Kilometer
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

module.exports = { distance, convertEpochToLocalDate, findFavorites, findNearbyStops, updateStops, findTrainStops, getTrips, findTrainStation};