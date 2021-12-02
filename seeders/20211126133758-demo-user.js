"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      "Users",
      [
        {
          id: uuidv4(),
          first_name: "Seunayo",
          last_name: "Oloriebi",
          email: "oloriebi@gmail.com",
          address: "Ikorodu, mile12",
          phoneNumber: "08109586357",
          password: "oloriebi",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAdmin: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
