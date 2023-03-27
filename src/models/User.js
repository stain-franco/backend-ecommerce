const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require("bcrypt")

const USer = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    // timestamps: false 
});

USer.beforeCreate(async(user)=>{
    const encriptedPassworrd = await bcrypt.hash(user.password, 10);
    user.password = encriptedPassworrd
})

module.exports = USer;