const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.lastName}`;
      },
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    image: {
      type: DataTypes.TEXT, // ojo aca ver esto
      allowNull: true,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    country: {
      type: DataTypes.STRING,
    },
    // social:{
    //     type:DataTypes.STRING  //para luego
    // }
    code: {
      type: DataTypes.STRING, //para confirmar email
    },
    aprobado:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:true
    }
  });
};
