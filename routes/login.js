var express = require('express');
var router = express.Router();
console.log("heuuuuu this is loginjs")

router.get('/',function(req, res, next) {
  if(req.session.user){
  res.render('userHome');
  }else{
    res.redirect('/')
  }
});
module.exports = router;