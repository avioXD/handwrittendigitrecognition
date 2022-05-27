const app = require("express")();
app.use("/api/v1/", require("./paths/captcha"));
module.exports = app;
