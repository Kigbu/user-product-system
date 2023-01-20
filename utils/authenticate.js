const jwt = require("jsonwebtoken"); // user token

module.exports = function (req, res, next) {
  let token = req.headers["authorization"] || req.cookies.access_token;

  if (!token) return res.status(401).send("Access Denied. No token provided.");
  // Remove Bearer from string
  token = token.replace(/^Bearer\s+/, "");

  try {
    const secret = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token."); // 400 -> bad req
  }
};
