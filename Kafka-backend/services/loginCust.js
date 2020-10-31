const signupcustModel = require("../Models/signupcustModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log(
    "Inside Customer kafka backend handle request",
    msg.username,
    msg.password
  );
  signupcustModel
    .findOne({ email: msg.username, pass: msg.password })
    .then((user) => {
      console.log("User", user);
      callback(null, user);
    })
    .catch((error) => {
      console.log("error user", user);
      callback(null, error);
    });
}

exports.handle_request = handle_request;
