const Sequelize = require('sequelize');

const sequelize = new Sequelize('rentzend', 'muhamed', 'muhamed123', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});


module.exports = sequelize;