const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'MTA Tracker',
    description: 'Modern MTA Website',
  });
});


module.exports = router;