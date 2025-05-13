require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,  // Change to true for logging SQL queries
        define: {
            freezeTableName: true
        }
    }
);

// For Sequelize CLI to work
if (process.env.NODE_ENV === 'production') {
    sequelize.authenticate().then(() => {
        console.log('Production database connected successfully!');
    }).catch((err) => {
        console.error('Unable to connect to the production database:', err);
    });
}

module.exports = sequelize;
