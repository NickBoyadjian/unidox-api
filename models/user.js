'use strict';

var bcrypt = require('bcrypt-nodejs');
var Note = require('./note').Note

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Note, {foreignKey: 'userId'});
    User.belongsToMany(models.Note, {
      through: 'noteUsers',
      as: 'shared notes',
      foreignKey: 'userId'
    });
  };
  return User;
};