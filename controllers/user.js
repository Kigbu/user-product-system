const {
  models: { User },
} = require("../models");

module.exports = {
  updatePassword: async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  },
};
