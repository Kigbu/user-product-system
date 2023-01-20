const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  // pug
  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "..", "views"));

  // routes imports
  const auth = require("../routes/auth");
  const product = require("../routes/product");
  const dashboard = require("../routes/dashboard");

  // global middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.options("*", cors());
  app.use(cookieParser());

  // static files
  app.use("/static", express.static(path.join(__dirname, "..", "public")));

  // routes
  app.use("/auth", auth);
  app.use("/product", product);
  app.use("/dashboard", dashboard);
};
