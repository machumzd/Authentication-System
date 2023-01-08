var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

// router.get('/',userController.loginLoad)

router.post("/", userController.verifyAdminLogin);
router.get("/", function (req, res) {
  if (req.session.admin) {
    res.redirect("/admin");
  } else if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("adminLogin");
  }
  res.render("adminLogin");
});

module.exports = router;
