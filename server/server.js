const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Server Running!");
});
app.use(require("./router/index"));

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
