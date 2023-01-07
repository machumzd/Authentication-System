var express = require('express');
var router = express.Router();
var adminController=require('../controllers/adminController')
/* GET home page. */

router.get('/',adminController.adminDashboard, function(req, res, next) {
  if(req.session.admin){
    const uData=req.session.usersData
    console.log("from my side"+uData)
  res.render('adminHome',{users:uData})
  }else{
    res.redirect("/");
  }

});

router.get('/newUser',adminController.newUserLoad)
router.post('/newUser',adminController.addUser)
router.get('/editUser',adminController.editUserLoad)
router.post('/editUser',adminController.updateUsers)
router.get('/deleteUser',adminController.deleteUser)
module.exports = router;
