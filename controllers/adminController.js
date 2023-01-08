require("dotenv").config();
const { request } = require("http");
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

const adminDashboard = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
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
    res.render("adminUsers", { users: uData });
  } catch (error) {
    console.log(error);
  }
};
const newUserLoad = async (req, res) => {
  try {
    res.render("newUser");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = process.env.dPassword;

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
      res.render("editUser", { user: userData });
    }
    res.render("editUser");
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
    res.redirect("/admin/users");
  } catch (error) {
    console.log(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;

    const userData = await User.deleteOne({ _id: id });
    res.redirect("/admin/users");
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
