module.exports = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
