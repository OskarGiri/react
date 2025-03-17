const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Ensure correct import
// Initialize Sequelize (replace with your DB credentials)

// RentRoom Model
const RentRoom = sequelize.define('RentRoom', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,  // Title cannot be null
    validate: {
      notEmpty: true, // Ensures that the title is not empty
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false, // Price cannot be null
    validate: {
      isDecimal: true, // Ensures the price is a decimal number
      min: 0, // Price must be greater than or equal to 0
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,  // Description cannot be null
    validate: {
      notEmpty: true, // Ensures that the description is not empty
    },
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false, // Picture URL cannot be null
  
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Sync the model with the database (creating the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('RentRoom model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing RentRoom model:', err);
  });

module.exports = RentRoom;
