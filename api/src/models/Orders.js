const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orders', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title:{
            type:DataTypes.STRING
        },
        // user_id: {			// id del user que crea la orden
        //     type: DataTypes.UUID,
        //     allowNull: false
        // },
        // orden_detail_id: {
        //     type: DataTypes.UUID,
        //     allowNull: false
        // },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    
        status: {
            type: DataTypes.ENUM("created", "processing", "cancelled", "completed"), //, "failed")
            allowNull: false,
            defaultValue: "created"
        },

        // payment_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
            
        // },
        
    });
};
