const express = require("express");
const session = require("express-session");
const User = require("../../model/userModel");
const router = express.Router();

router.get("/", function (req, res) {

   if (req.session.user) {
    res.render("user/userHome", { name: req.session.userName });
  } 
  if (req.session.admin) {
    res.redirect("/admin");
  }
  else {
    res.render("user/index");
  }
});

module.exports = router;
