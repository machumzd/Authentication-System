var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController")
/* GET home page. */


router.get('/',userController.loadRegister) 
router.post('/',userController.insertUser);

module.exports = router;
