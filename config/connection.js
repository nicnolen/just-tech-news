// Import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// Create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

// Export the module
module.exports = sequelize;