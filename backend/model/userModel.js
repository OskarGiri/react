const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Ensure correct import
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    fullName: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true } 
    },

    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },

    profilePic: { 
        type: DataTypes.STRING, 
        allowNull: true // Optional profile picture
    },
    
    roleId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 1, // 1 = Normal User, 2 = Admin
        validate: { 
            isIn: [[1, 2]] // Ensures only 1 or 2 is allowed
        }
    }
}, {
    timestamps: true,


 
});



module.exports = User;
