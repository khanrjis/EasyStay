const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { saveRedir } = require("../middleware");
const userController = require("../controllers/users.js");
//  signup rander
router.get("/signup", userController.renderSignup);
//signup route
router.post("/signup", userController.signup);
//login rander
router.get("/login",userController.renderLogin);

//login route
router.post("/login", saveRedir, passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
}), userController.login);                      

//logout route
router.get("/logout",userController.logout);


module.exports = router;