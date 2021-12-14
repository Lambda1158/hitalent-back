const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true, //incrementa el id cada vez que se crea un post
        //     primaryKey: true
        // },
        // user_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
        // post_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
        // rating: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //         min: 1,
        //         max: 5
        //     }
        // },
        qualification: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: true
            // type: DataTypes.INTEGER,
            // allowNull: false,
            // validate: {
            //     min: 1,
            //     max: 5
            // }
        },    
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        aprobado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false
        }
    });
};






