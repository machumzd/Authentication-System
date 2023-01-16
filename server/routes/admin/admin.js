const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
/* GET home page. */

router.get("/", function (req, res, next) {
  if (req.session.admin) {
    res.render("admin/adminHome");
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
