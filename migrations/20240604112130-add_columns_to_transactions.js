"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Transactions", "totalPrice", {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    });
    await queryInterface.addColumn("Transactions", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "completed", "cancelled"]],
      },
    });
    await queryInterface.addColumn("Transactions", "paymentStatus", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "unpaid",
      validate: {
        isIn: [["unpaid", "paid", "failed"]],
      },
    });
    await queryInterface.addColumn("Transactions", "paymentMethod", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Transactions", "totalPrice");
    await queryInterface.removeColumn("Transactions", "status");
    await queryInterface.removeColumn("Transactions", "paymentStatus");
    await queryInterface.removeColumn("Transactions", "paymentMethod");
  },
};
