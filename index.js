const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const routes = require("./routes");
const session = require("express-session");
require("dotenv").config();

mongoose
  .connect(dbConfig.mongoUri, dbConfig.config)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => console.error(err));

//NB if you were using a different db, you can also download their session store. check
//express-session docs
const MongoDBsession = require("connect-mongodb-session")(session);

//store your session on the db on sessions collection
const session_store = new MongoDBsession({
  uri: dbConfig.mongoUri,
  collection: "sessions",
  expires: 1000 * 60 * 5, // 5 minutes
});

session_store.on("error", function (error) {
  console.log(error);
});

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: session_store,
  })
);

app.set("view engine", "ejs");
app.use(routes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
