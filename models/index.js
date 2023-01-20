const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.User = require("./User")(sequelize, Sequelize.DataTypes);
db.models.Product = require("./Product")(sequelize, Sequelize.DataTypes);

db.models.User.hasMany(db.models.Product, { as: "products" });
db.models.Product.belongsTo(db.models.User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
