const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;
const passport = require('../middlewares/authentication');

//    POST   /
//      Body: {
//        "username": "test",
//        "password": "test",
//        "email": "test@test.com"
//      }

//    GET    /favorite/:username

//    PUT    /favorite/:username
//      Body: {
// 	      "stopId": "D07"
//      }

//    DELETE /favorite/:username
//      Body: {
// 	      "stopId": "D07"
//      }


router.get('/', (req, res) => {
  res.json({
    page: 'api/user/',
  });
});

router.get('/data', (req, res) => {
  if (req.user === undefined) {
    // The user is not logged in
    res.json({});
  } else {
    res.json(req.user);
  }
});


// Post a new entry in the User table
// Body needed: Username, password, email, and favorite stops (default empty) 
router.post('/signup', (req, res) => {
  let { username, password, email } = req.body;

  User.create({ username: username , password: password, email: email })
    .then(user => {
      req.login(user, () => res.status(201).json(user));
    })
    .catch(err => {
      res.status(400).json({ msg: 'Failed Registration', err });
    });
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  });

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ msg: 'Logout Successful' });
})

// Get favorite array given a username
router.get('/favorite/:username', passport.isAuthenticated(), (req, res) => {
  const { username } = req.params;
  User.findByPk(username)
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }
      res.status(200).json(user['favorites']);
    });
});

// Put a stopId into favorite for the given username 
router.put('/favorite/:username', passport.isAuthenticated(), (req, res) => {
  const { username } = req.params;
  User.findByPk(username)
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }

      const stopId = req.body.stopId
      if (stopId && !user.favorites.includes(stopId)) {
        var tmp = user.favorites.slice()
        tmp.push(stopId)
        user.favorites = tmp
      }

      user.save()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});

// Delete a stopId from favorite for the given username 
router.delete('/favorite/:username', passport.isAuthenticated(), (req, res) => {
  const { username } = req.params;
  User.findByPk(username)
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }

      const stopId = req.body.stopId
      if (stopId && user.favorites.includes(stopId)) {
        const tmp = user.favorites.filter((val, i) => {
          return val !== stopId
        })
        user.favorites = tmp
      }

      user.save()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


module.exports = router;