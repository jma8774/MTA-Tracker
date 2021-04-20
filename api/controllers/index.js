const express = require('express');
const router = express.Router();


// Load each controller
const nearbyController = require('./nearby.js');
const lineController = require('./line.js');
const stationController = require('./station.js');
const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/nearby', nearbyController);
router.use('/line', lineController);
router.use('/station', stationController);
router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);


module.exports = router;