const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("question", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    question: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    user_id: {
      // id del user que pregunta
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
};
