const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      //allowNull: false,
      primaryKey: true,
    },
    // user_id: {
    //   type: DataTypes.UUID,      //estan pero mediante relaciones
    //   allowNull: false
    // },
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),  //array de imagenes ver esto luego
      allowNull: true,
      defaultValue:[]
    },
  
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    oferta:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    cost:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    aprobado:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
};