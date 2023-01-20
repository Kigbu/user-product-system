const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.generateAuthentication = function (userId, email) {
    const secretkey = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        userId,
        email,
      },
      secretkey,
      { expiresIn: "1h" }
    );
    return token;
  };
  return User;
};
