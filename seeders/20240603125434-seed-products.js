"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Product 1",
          stock: 100,
          price: 77000,
          storeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product 2",
          stock: 200,
          price: 33000,
          storeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product 3",
          stock: 150,
          price: 120000,
          storeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product 4",
          stock: 350,
          price: 15000,
          storeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product 5",
          stock: 50,
          price: 20000,
          storeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
