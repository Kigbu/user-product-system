const express = require('express');
const app = express();
const db = require("./models");
require("dotenv/config");

// 
require("./startup/app")(app);
// sync db
(async () => {
    await db.sequelize.sync();
})();

// Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log(`Express is running on port  :>> ${port}`);
  });
  