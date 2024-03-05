//core module(s)
const path = require("path");

//third-party modules
require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const methodOverride = require("method-override");

//connect to the proper port
const port = process.env.PORT || 3000;

//our own modules
const db = require("./models");
const exerciseProgRouters = require("./routers/exerciseProgramRouter");
const userRouters = require("./routers/userRouter");

//configs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("tiny")); // morgan is just a logger
app.use(
  session({
    secret: process.env.SECRET_KEY, //used to scramble the cookie!
    resave: false,
    saveUninitialized: false,
  })
);

//MAIN ROUTES:
//landing page

//different routes

//error routes

//SERVER LISTENING
app.listen(port, () => {
  console.log(`SweatShare is listening on port ${port}`);
});
