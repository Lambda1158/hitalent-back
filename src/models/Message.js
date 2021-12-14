const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("message", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.STRING,
    },
    sender: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
  });
};
