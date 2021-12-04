const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('question', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        question:{
            type:DataTypes.STRING
        },
        answer:{
            type: DataTypes.STRING,
            defaultValue:""
        }
        //userid
    });
};