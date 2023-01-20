const express = require("express");
const router = express.Router();
const { auth } = require("../../controllers");

// render register pae
router.get("/register", (req, res) => {
  res.render("register");
});

// create new account
router.post("/register", auth.create);

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});

// login
router.post("/login", auth.login);

module.exports = router;
