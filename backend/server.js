const express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const multer = require("multer");
var cors = require("cors");

const events = require("./events");
const insert = require("./insert");
const login = require("./login");
const cust_profile = require("./profile");
const rest = require("./restaurant");

app.set("view engine", "ejs");
app.use("/prof_pic", express.static("public/uploads"));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273Lab1",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const mongoose = require("mongoose");
const { mongoDB } = require("./config");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

app.post("/signupcust", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_cust(req, res);
});

app.post("/signuprest", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_rest(req, res);
});

//Route to handle Post Request Call
app.post("/logincust", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_cust(req, res);
});

app.post("/loginrest", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_rest(req, res);
});

app.get("/getRest", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new rest.restaurant();
  get.getrest(req, res);
});

app.post("/updateRest", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new rest.restaurant();
  get.updatebasicinfo(req, res);
});

app.post("/addDish", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new rest.restaurant();
  get.adddish(req, res);
});
app.get("/getDish", function (req, res) {
  console.log("Req Body : ", req.body);
  var get = new rest.restaurant();
  get.getdish(req, res);
});

app.get("/cust_profile", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new cust_profile.profile();
  ins.getbasicinfo(req, res);
});

app.post("/updatePersonal", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new cust_profile.profile();
  ins.updatebasicinfo(req, res);
});

app.listen(3001, () => console.log("Server Listening on port 3001"));
