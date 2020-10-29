const signupcustModel = require("./Models/signupcustModel");

var allusers = class allusers {
  getAllUsers(req, res) {
    signupcustModel.find({}, (error, result) => {
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
