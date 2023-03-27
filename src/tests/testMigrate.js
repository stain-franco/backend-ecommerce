const USer = require('../models/User');
const sequelize = require('../utils/connection');
require("../models/User");
require("../models/Category");
require("../models/Product");
require("../models");

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await USer.create({
            firstName: "test",
            lastName: "user",
            email: "test@gmail.com",
            password: "test1234",
            phone: "123456789"

        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();