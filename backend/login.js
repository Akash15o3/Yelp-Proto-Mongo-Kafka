// var mysql = require("mysql");
const mongoose = require("mongoose");
const signupcustModel = require("./Models/signupcustModel");
const signuprestModel = require("./Models/signuprestModel");
const Schema = mongoose.Schema;

var login = class Login {
  login_cust(req, res) {
    console.log("connected");
    signupcustModel.findOne(
      { email: req.body.username, pass: req.body.password },
      (error, signupcust) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Error Occured");
        }
        if (signupcust) {
          res.cookie("cookie", signupcust.email, {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          req.session.signupcust = signupcust;
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

// var login = class Login {
//   login_cust(con, req, res) {
//     console.log("connected");
//     var sql =
//       "SELECT customerID,firstname, emailid, password FROM customerDetails where emailid='" +
//       req.body.username +
//       "'";
//     var pass;
//     var id;
//     con.query(sql, function (err, result, fields) {
//       if (err) throw err;

//       var flag = 0;
//       for (var i = 0; i < result.length; i++) {
//         pass = result[i].password;
//         id = result[i].customerID;
//         if (pass === req.body.password) {
//           res.cookie("cookie", id);
//           console.log(res.cookie("cookie", id));

//           res.writeHead(200, {
//             "Content-Type": "text/plain",
//           });

//           res.end(JSON.stringify(result));
//           flag = 1;
//         }
//       }
//       if (flag === 0) {
//         res.writeHead(401, {
//           "Content-Type": "text/plain",
//         });
//         res.end("UnSuccessful Login");
//       }
//       // console.log(result[0].emailid);
//       // pass = result[0].password;
//       // id = result[0].emailid;

//       // if (pass === req.body.password) {
//       //   res.cookie("cookie", id);
//       //   console.log(res.cookie("cookie", id));

//       //   res.writeHead(200, {
//       //     "Content-Type": "text/plain",
//       //   });

//       //   res.end(JSON.stringify(result));
//       // } else {
//       //   res.writeHead(401, {
//       //     "Content-Type": "text/plain",
//       //   });
//       //   res.end("UnSuccessful Login");
//       // }
//     });
//   }
//   login_rest(con, req, res) {
//     console.log("connected");
//     var sql =
//       "SELECT restaurantID,name, emailid, password FROM restaurantDetails where emailid='" +
//       req.body.username +
//       "'";
//     var pass;
//     var id;
//     con.query(sql, function (err, result, fields) {
//       if (err) throw err;
//       var flag = 0;
//       console.log(result[0].restaurantID);
//       pass = result[0].password;
//       id = result[0].restaurantID;

//       if (pass === req.body.password) {
//         res.cookie("cookie", id, {
//           maxAge: 900000,
//           httpOnly: false,
//           path: "/",
//         });
//         req.session.user = id;
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end("Successful Login");
//       } else {
//         res.writeHead(401, {
//           "Content-Type": "text/plain",
//         });
//         res.end("UnSuccessful Login");
//       }
//       // for (var i = 0; i < result.length; i++) {
//       //   pass = result[i].password;
//       //   id = result[i].restaurantID;
//       //   if (pass === req.body.password) {
//       //     res.cookie("cookie", id, {
//       //       maxAge: 900000,
//       //       httpOnly: false,
//       //       path: "/",
//       //     });
//       //     req.session.user = id;
//       //     res.writeHead(200, {
//       //       "Content-Type": "text/plain",
//       //     });
//       //     res.end("Successful Login");
//       //     flag = 1;
//       //   }
//       // }
//       // if (flag === 0) {
//       //   res.writeHead(401, {
//       //     "Content-Type": "text/plain",
//       //   });
//       //   res.end("UnSuccessful Login");
//       // }
//     });
//   }
// };

module.exports = {
  login,
};
