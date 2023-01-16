const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// router.get('/',userController.loginLoad)

router.post("/", userController.verifyLogin, function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const emailcheck = req.session.userEmail;
  const passcheck = req.session.userPassword;
  
  if (
    email != "" &&
    password != "" &&
    (email != emailcheck || password != passcheck)
  ) {
    res.render("user/index", { logmessage: "Wrong Credential's" });
  }
});
router.get("/", function (req, res) {
  if (req.session.admin) {
    res.redirect("/admin");
  } else if (req.session.user) {
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
