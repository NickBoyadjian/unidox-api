const User = require('../models').User;
const note = require('./note');
const passport = require('passport');
require('../config/passport')(passport);

const create = (u, p) => User.create({username: u, password: p })

const get = (u) => User.findOne({ where: { username: u } })

module.exports = {
    create,
    get,
}