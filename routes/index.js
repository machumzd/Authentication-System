require("dotenv").config();
var express = require("express");
var router = express.Router();
const session = require("express-session");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.mongo_url);
/* GET home page. */

router.get("/", function (req, res, next) {
  if (req.session.admin) {
    res.redirect("/admin");
  }
  if (req.session.user) {
    res.redirect("/home");
  }
  res.render("index");
});

router.get("/logout", function (req, res) {
  req.session.user = false;
  req.session.admin = false;
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
