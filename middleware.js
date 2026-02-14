module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect to login page with flash message
    req.session.returnTo = req.originalUrl; // store the original URL for redirect after login
    req.flash("error", "You must be logged in to do that!");
    return res.redirect("/login");
  } 
    next();
};

module.exports.saveRedir = async (req, res, next) => {
  if(req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  } 
  next();
}