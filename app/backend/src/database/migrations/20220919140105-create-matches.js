'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        delete: 'CASCADE',
        update: 'CASCADE',
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      away_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id' },
        delete: 'CASCADE',
        update: 'CASCADE',
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      in_progress: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};
