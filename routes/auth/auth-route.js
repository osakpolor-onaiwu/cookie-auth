const router = require("express").Router();
const User = require("../../models/users");
const bcrypt = require("bcrypt");
const is_authenticated = require("../../middleware/is_authenticated");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/dashboard", is_authenticated, (req, res) => {
  res.render("dashboard");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.json({ error: "email not found" });
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) res.json({ error: "password not match" });

  req.session.isAuthenticated = true;
  res.redirect("/auth/dashboard");
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.redirect("/auth/register");
  } else {
    user = await new User({
      username,
      password,
      email,
    }).save();
  }

  res.redirect("/auth/login");
  res.json({
    message: "success",
    data: user,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Logged out");
    }
  });
  res.redirect("/auth/login");
});

module.exports = router;
