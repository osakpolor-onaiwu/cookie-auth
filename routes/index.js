const router = require("express").Router();
const auth_routes = require("./auth/auth-route");

router.use("/auth", auth_routes);

module.exports = router;
