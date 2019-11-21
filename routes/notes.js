//  _   _       _              ____             _       
// | \ | | ___ | |_ ___  ___  |  _ \ ___  _   _| |_ ___ 
// |  \| |/ _ \| __/ _ \/ __| | |_) / _ \| | | | __/ _ \
// | |\  | (_) | ||  __/\__ \ |  _ < (_) | |_| | ||  __/
// |_| \_|\___/ \__\___||___/ |_| \_\___/ \__,_|\__\___|
// =====================================================

// Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Note = require('../models').Note;
const utils = require('../utils')

// Get users notes
router.get('/mynotes', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      var token = utils.getToken(req.headers);
      if (token) {
        Note
          .findAll({
            where: {
              userId: req.user.id,
            }
          })
          .then((notes) => res.status(200).send(notes))
          .catch((error) => { res.status(400).send(error); });
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    }
);

// Create new note
router.post('/createnote', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      var token = utils.getToken(req.headers);
      if (token) {
        Note
          .create({
            title: req.body.title,
            body: req.body.body,
            userId: req.user.id
          })
          .then((note) => res.status(201).send(note))
          .catch((error) => { res.status(400).send(error); });
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    }
);

module.exports = router;