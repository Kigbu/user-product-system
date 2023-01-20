const controllers = {}

controllers.user = require("./user");
controllers.auth = require("./auth");
controllers.product = require("./product");

module.exports = controllers