require('dotenv').config()
var express = require('express');
var router = express.Router();
const session=require('express-session')
/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.session.admin){
   res.redirect('/admin')
  }
  if(req.session.user){
   res.redirect('/user')
  }
res.render("index")
});


router.post('/submit',function(req,res){
 var uEmail=req.body.email;
 var uPass=req.body.password;
 if(uEmail==process.env.uAdmin&&uPass==process.env.uPass){
   req.session.admin=true;
   req.session.user=false;
   res.redirect("/");
 }else{
   req.session.user=true;
   req.session.admin=false;
   res.redirect("/")
 }
})

router.get('/logout',function(req,res){
 req.session.user=false;
 req.session.admin=false;
 req.session.destroy();
 res.redirect('/')

})

module.exports = router;
