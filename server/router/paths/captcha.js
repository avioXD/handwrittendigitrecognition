const router = require("express").Router();
var svgCaptcha = require("svg-captcha");
router.get("/captcha", (req, res) => {
  var captcha = svgCaptcha.create({
    size: 6,
    noise: 15,
    color: true,
    ignoreChars: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "I",
    ],
    background: "#bdbbbb",
  });
  if (captcha.text.length > 5) {
    res.status(200).send(captcha);
  } else {
    res.status(500).send("Error generating captcha");
  }
});
module.exports = router;
