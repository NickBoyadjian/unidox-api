'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // User hasMany Notes
    return queryInterface.addColumn(
      'Notes', // name of Target model
      'userId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );  
  },

  down: (queryInterface, Sequelize) => {

  }
};
