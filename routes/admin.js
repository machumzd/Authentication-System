var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");
/* GET home page. */

router.get("/", function (req, res, next) {
  if (req.session.admin) {
    res.render("adminHome");
  } else {
    res.redirect("/");
  }
});
router.get("/users", adminController.adminDashboard);
router.get("/newUser", adminController.newUserLoad);
router.post("/newUser", adminController.addUser);
router.get("/editUser", adminController.editUserLoad);
router.post("/editUser", adminController.updateUsers);
router.get("/deleteUser", adminController.deleteUser);
module.exports = router;
