const {
  models: { User },
} = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  create: async (req, res) => {
    let { firstname, lastname, email, password, phone } = req.body;

    if (!firstname || !lastname || !email || !password || !phone)
      return res.status(400).json({
        success: false,
        data: "Invalid Fields! Please fill all fields",
      });

    const emailExists = await User.findOne({ where: { email: email } });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, data: "User with Email already Exist!" });

    email = email.toLowerCase().trim();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
    });

    // res.status(200).redirect("/auth/login");
    res.status(200).json({ success: true, data: user });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, data: "Invalid Login credentials" });

    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, data: "Invalid Login credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, data: "Invalid login credentials" });

    const token = User.generateAuthentication(user.id, user.email);
    res.cookie("access_token", token, { secure: true, maxAge: 1 * 3600000 });
    // res.redirect(`/dashboard/${user.id}`);
    res.status(200).json({ success: true, access_token: token });
  },
};
