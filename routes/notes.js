const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Note = require('../models').Note;

router.get('/mynotes', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      var token = getToken(req.headers);
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

getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;