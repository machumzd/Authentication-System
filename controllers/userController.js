const User = require("../config/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error.message);
  }
};
const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();
    if (userData) {
      res.render("index", {
        message: "your registration is completed successfully",
      });
    } else {
      res.render("index", { message: "your registration is failed" });

    }
  } catch (error) {
    console.log(error.message);
  }
};

// const loginLoad=async(req,res)=>{
//  try{
//     res.render('index')
//  }catch(error){
//     console.log(error.message)
//  }
// }

const verifyLogin = async (req, res,next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
        req.session.userName=userData.name;
        req.session.userEmail=userData.email;
        req.session.userPassword=passwordMatch;

      if (passwordMatch) {
        req.session.user = true;
        if(userData.is_admin==1){
          req.session.admin=true
          req.session.user=false
          res.redirect("/admin")
        }else{
          req.session.admin=false
        }
        res.redirect("/home");
      } else {
        req.session.user = false;
      }
    } else {
      req.session.user = false;
      next()
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { loadRegister, insertUser, verifyLogin};
