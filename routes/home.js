var express = require("express");
const session = require("express-session");
const User = require("../config/userModel");
var router = express.Router();

router.get("/", function (req, res) {
  if (req.session.admin) {
    res.redirect("/admin");
  } else if (req.session.user) {
    res.render("userHome", { name: req.session.userName });
  } else {
    res.render("index");
  }
});

module.exports = router;
