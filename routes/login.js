var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController")


// router.get('/',userController.loginLoad)

router.post('/',userController.verifyLogin,function(req,res,next){
  const email=req.body.email
  const password=req.body.password
  const emailcheck= req.session.userEmail
  const passcheck=req.session.userPassword
  if(email!=""&&password!=""&&(email!=emailcheck||password!=passcheck)){
    res.render('index',{logmessage:"Wrong Credential's"})
  }
  

})
router.get('/',function(req,res){
  if(req.session.admin){
    res.redirect("/admin")
  } else if(req.session.user){
    res.redirect('/home')
  }
})

module.exports = router;