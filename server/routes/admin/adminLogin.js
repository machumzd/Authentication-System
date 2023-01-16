const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.post(
  "/",userController.verifyAdminLogin
);
router.get("/", function (req, res) {
  if (req.session.admin) {
    res.redirect("/admin");
  }else if (req.session.user) {
    res.render("admin/adminLogin")
  } else {
    res.render("admin/adminLogin");
  }
  res.render("admin/adminLogin");
});

module.exports = router;
