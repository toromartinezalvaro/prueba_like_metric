"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("apartments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      apartment_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mt2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_mt2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("apartments");
  },
};
