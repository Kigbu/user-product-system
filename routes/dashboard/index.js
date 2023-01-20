const express = require("express");
const authenticate = require("../../utils/authenticate");
const router = express.Router();
const {
  models: { User },
} = require("../../models");

// render dashboard page
router.get("/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ where: { id: userId } });
  if (!user)
    return res.status(401).json({
      success: false,
      data: "Invalid User! Please login",
    });

  res.render("dashboard", { firstname: user.firstname });
});

module.exports = router;
