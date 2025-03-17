const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Disable logging for cleaner console output
});

// Function to sync the database
const syncDB = async () => {
    try {
        await sequelize.authenticate(); // Check database connection
        console.log('Database connected successfully!');

        await sequelize.sync({ alter: true }); // Sync models with DB (use force: true to reset tables)
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Database sync error:', error);
    }
};

module.exports = { sequelize, syncDB };
