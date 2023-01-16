require("dotenv").config();
const express = require("express");
const router = express.Router();
const session = require("express-session");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

/* GET home page. */

router.get("/", function (req, res, next) {
  if (req.session.admin) {
    res.redirect("/admin");
  }
  if (req.session.user) {
    res.redirect("/home");
  }
  res.render("user/index");
});

router.get("/logout", function (req, res) {
  req.session.user = false;
  req.session.admin = false;
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
