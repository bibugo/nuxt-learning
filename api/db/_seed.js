const db = require(".");
const User = require("./user");

const seed = async () => {
  await db.sync({ force: true });

  User.create({
    password: `M<gC4['Dqv}G''X"Tg4XDbRrmWR46/ca`,
    username: "getaclue",
    name: "Supper Name",
  })
    .then((user) => {
      console.log("seeded user", user);
    })
    .catch((error) => {
      console.error("failed to seed, ", error);
      db.close();
    });
};

seed()