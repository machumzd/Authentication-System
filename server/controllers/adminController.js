require("dotenv").config();
const { request } = require("http");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const config = require('../../config/config')
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};


const adminDashboard = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      req.session.usersmessage=""
      search = req.query.search;
      
    }

    const uData = await User.find({
      is_admin: 0,
      $or: [
        { name: { $regex: ".*" + search + ".*" } },
        { email: { $regex: ".*" + search + ".*" } },
        { mobile: { $regex: ".*" + search + ".*" } },
      ],
    });
    res.render("admin/adminUsers", { users: uData,usersmessage:req.session.usersmessage});
  } catch (error) {
    console.log(error);
  }
};
const newUserLoad = async (req, res) => {
  try {
    res.render("admin/newUser");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = config.dPassword;

    const sPassword = await securePassword(password);
    const user = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: sPassword,
      is_admin: 0,
    });
    const userData = await user.save();
    if (userData) {
      req.session.usersmessage="new user added successfully"
      res.redirect("/admin/users");
    } else {
      res.redirect("/admin/users");
    }
  } catch (error) {
    console.log(error.message);
  }
};




const editUserLoad = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await User.findById({ _id: id });
    if (userData) {
   
      res.render("admin/editUser", { user: userData});
    }
    res.render("admin/editUser");
  } catch (error) {
    console.log(error.message);
  }
};

const updateUsers = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
      }
    );
    req.session.usersmessage="user updated successfully"
    res.redirect("/admin/users",);
  } catch (error) {
    console.log(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;

    const userData = await User.deleteOne({ _id: id });
    if(userData){
      req.session.usersmessage="user deleted successfully"
    res.redirect("/admin/users");
    }

  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  adminDashboard,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUsers,
  deleteUser,
};
