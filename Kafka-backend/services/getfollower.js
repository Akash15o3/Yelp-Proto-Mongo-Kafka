const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");
const eventModel = require("../Models/eventModel");
const registeredeventModel = require("../Models/registeredEvents");
const signupcustModel = require("../Models/signupcustModel");
const followerModel = require("../Models/followerModel");
async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");

  followerModel.find({ customername: msg.customername }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      console.log(user);
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;
