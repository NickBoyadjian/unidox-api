'use strict';
module.exports = (sequelize, DataTypes) => {
  const noteUsers = sequelize.define('note-users', {
    userId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER
  }, {});
  noteUsers.associate = function(models) {
    // associations can be defined here
  };
  return noteUsers;
};