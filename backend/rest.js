const dishModel = require("./Models/dishModel");
const signuprestModel = require("./Models/signuprestModel");

var rest = class rest {
  getAllRest(req, res) {
    signuprestModel.find({}, (error, result) => {
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
  rest: rest,
};
