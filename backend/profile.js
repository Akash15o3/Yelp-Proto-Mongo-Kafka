const signupcustModel = require("./Models/signupcustModel");

var profile = class profile {
  getbasicinfo(req, res) {
    console.log(req.query);
    console.log(req.query.email);
    signupcustModel.findOne({ email: req.query.email }, (error, result) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end();
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
      }
    });
  }

  gettestcust(req, res) {
    // console.log(req.query);
    // console.log(req.query.email);
    signupcustModel.findOne({ email: req.body.email }, (error, result) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end();
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
      }
    });
  }

  updatebasicinfo(req, res) {
    var updatecust = {
      customerID: req.body.customerID,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      pass: req.body.pass,
      dateofbirth: req.body.dateofbirth,
      city: req.body.city,
      State: req.body.State,
      country: req.body.country,
      phonenumber: req.body.phonenumber,
      nickname: req.body.nickname,
      yelpingsince: req.body.yelpingsince,
      thingsilove: req.body.thingsilove,
      about: req.body.about,
      findmein: req.body.findmein,
      myblog: req.body.myblog,
    };
    console.log(updatecust);
    signupcustModel.updateOne(
      { email: req.body.email },
      { $set: updatecust },
      (err, signupcust) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          console.log(err);
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Customer details updated");
        }
      }
    );
  }
};

module.exports = {
  profile,
};
