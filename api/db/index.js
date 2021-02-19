const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "api/database.sqlite3",
  logging: false,
});

// db.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

module.exports = db;