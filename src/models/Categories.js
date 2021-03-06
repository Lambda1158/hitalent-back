const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        }
    });
};