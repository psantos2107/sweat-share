//core and 3rd-party modules
const path = require("path");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//configs
app.set("view engine", "ejs");
//main routes

//error routes
app.listen(port, () => {
  console.log(`SweatShare is listening on port ${port}`);
});
