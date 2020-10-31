const signupcustModel = require("./Models/signupcustModel");

var allusers = class allusers {
  getAllUsers(req, res) {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);

    console.log("skip and limit", req.query.limit, req.query.skip);
    signupcustModel
      .find({}, (error, result) => {
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
      })
      .skip(skip)
      .limit(limit);
  }

  searchallusers(req, res) {
    signupcustModel.find({ fname: req.query.fname }, (error, result) => {
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

  filterallusers(req, res) {
    signupcustModel.find({ city: req.query.city }, (error, result) => {
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
};

module.exports = {
  allusers: allusers,
};
