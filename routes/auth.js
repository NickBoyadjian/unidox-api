//     _         _   _       ____             _       
//    / \  _   _| |_| |__   |  _ \ ___  _   _| |_ ___ 
//   / _ \| | | | __| '_ \  | |_) / _ \| | | | __/ _ \
//  / ___ \ |_| | |_| | | | |  _ < (_) | |_| | ||  __/
// /_/   \_\__,_|\__|_| |_| |_| \_\___/ \__,_|\__\___|
// ===================================================

// Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const utils = require('../utils')
const user = require('../controllers/user')
const note = require('../controllers/note')

// Index route
router.get('/', (req, res, next) => {
  res.render('auth');
});

// Sign up
router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({msg: 'Please pass username and password.'})
  } else {
      user.create(req.body.username, req.body.password)
      .then((user) => res.status(201).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
});

// Sign in
router.post('/signin', (req, res) => {
    user.get(req.body.username)
    .then((user) => {
        if (!user) {
        return res.status(401).send({
            message: 'Username not found.',
        });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
            var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});

            jwt.verify(token, 'nodeauthsecret', (err, data) => {
              console.log(err, data);
            })

            res.json({success: true, token: 'JWT ' + token});
        } else {
            res.status(401).send({success: false, msg: 'Incorrect password.'});
        }
        })
    })
    .catch((error) => res.status(400).send(error));
});

// Get profile
router.get('/profile', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    note.getUsersNotes(req.user.id)
    .then((notes) => {
      res.send({
        id: req.user.id,
        username: req.user.username,
        notes: formatNotes(notes)
      })
    })
  }
)

const formatNotes = notes => {
  let res = [];
  notes.forEach(note => res.push({id: note.id, title: note.title}))
  return res;
}

module.exports = router;