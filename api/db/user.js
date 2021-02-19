const db = require(".");
const { DataTypes } = require("sequelize");

const User = db.define("User",
  {
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false
  }
);

module.exports = User;