const Note = require('../models').Note;
const passport = require('passport');
require('../config/passport')(passport);

const getUsersNotes = (id) => Note.findAll({ where: {userId: id} })
const getNote = (id, uid) => Note.findOne({where: {id: id, userId: uid}})

module.exports = {
    getUsersNotes,
    getNote
}