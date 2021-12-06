const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  
    sequelize.define('payments', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        number:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        code:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
};
