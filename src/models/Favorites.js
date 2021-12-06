const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favorites', {
        description:{
            type: DataTypes.STRING,
            allowNull:true
        }
    });
};