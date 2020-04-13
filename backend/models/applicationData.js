const Sequelize = require('sequelize');

const sequelize = require('../database');

const Application = sequelize.define('application', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    phoneNumber: {type: Sequelize.STRING, allowNull: false},
    address: {type: Sequelize.STRING, allowNull: false},
    zipCode: {type: Sequelize.STRING, allowNull: false},
    files: Sequelize.STRING
});

module.exports = Application;