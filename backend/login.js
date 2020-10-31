// var mysql = require("mysql");
// const { KafkaClient } = require("kafka-node");
const mongoose = require("mongoose");
const signupcustModel = require("./Models/signupcustModel");
const signuprestModel = require("./Models/signuprestModel");
var kafka = require("./Kafka/client");
const Schema = mongoose.Schema;

var login = class Login {
  // login_cust(req, res) {
  //   console.log("connected");
  //   signupcustModel.findOne(
  //     { email: req.body.username, pass: req.body.password },
  //     (error, signupcust) => {
  //       if (error) {
  //         res.writeHead(500, {
  //           "Content-Type": "text/plain",
  //         });
  //         res.end("Error Occured");
  //       }
  //       if (signupcust) {
  //         res.cookie("cookie", signupcust.email, {
  //           maxAge: 900000,
  //           httpOnly: false,
  //           path: "/",
  //         });
  //         req.session.signupcust = signupcust;
  //         res.writeHead(200, {
  //           "Content-Type": "text/plain",
  //         });
  //         res.end();
  //       } else {
  //         res.writeHead(401, {
  //           "Content-Type": "text/plain",
  //         });
  //         res.end("Invalid Credentials");
  //       }
  //     }
  //   );
  // }
  login_cust(req, res) {
    kafka.make_request("login_cust", req.body, function (err, results) {
      console.log("error in login", err);
      console.log("in result", results);
      if (err) {
        res.status(500).end("Error Occured");
      } else {
        const payload = {
          _id: results._id,
          username: results.email,
          type: "Customer",
        };
        res.end();
        console.log("Payload", payload);
      }
    });
  }
  login_rest(req, res) {
    console.log("connected");
    signuprestModel.findOne(
      { email: req.body.username, pass: req.body.password },
      (error, signuprest) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Error Occured");
        }
        if (signuprest) {
          res.cookie("cookie", signuprest.email, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          // console.log("Sign Up", signuprest);
          req.session.signuprest = signuprest;
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(401, {
            "Content-Type": "text/plain",
          });
          res.end("Invalid Credentials");
        }
      }
    );
  }
};

module.exports = {
  login,
};
