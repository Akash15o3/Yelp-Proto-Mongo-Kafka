const dishModel = require("./Models/dishModel");
const signuprestModel = require("./Models/signuprestModel");

var rest = class rest {
  getAllRest(req, res) {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    signuprestModel
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

  getAllRestSearch(req, res) {
    signuprestModel.find({ location: req.query.location }, (error, result) => {
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
        console.log("CitySearchResult", JSON.stringify(result));
      }
    });
  }
};

module.exports = {
  rest: rest,
};
