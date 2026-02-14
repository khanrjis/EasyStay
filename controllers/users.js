const User = require("../models/user.js");

// Signup render
module.exports.renderSignup = (req, res) => {
  res.render("useres/signup.ejs");
};

// Signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Registration successful!");
      res.redirect("/listings");
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// Login render
module.exports.renderLogin = (req, res) => {
  res.render("useres/login.ejs");
};

// Login
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to EaseStay!");
  res.redirect(res.locals.returnTo || "/listings");
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
