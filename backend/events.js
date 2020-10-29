const eventModel = require("./Models/eventModel");
const signuprestModel = require("./Models/signuprestModel");

var events = class events {
  addevent(req, res) {
    console.log("Body", req.body);
    var newevent = new eventModel({
      // restaurantname: req.body.rest_name,
      restaurantemail: req.body.restaurantemail,
      restaurantname: req.body.restaurantname,
      customeremail: " ",
      customername: " ",
      eventID: req.body.eventID,
      eventname: req.body.eventname,
      location: req.body.location,
      description: req.body.description,
      date: req.body.date,
      timeofevent: req.body.timeofevent,
      hashtag: req.body.hashtag,
    });
    console.log("yes");
    console.log("newevent", newevent);
    eventModel.findOne(
      { restaurantemail: req.body.restaurantemail },
      (error, event) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        } else {
          newevent.save((error, data) => {
            if (error) {
              res.writeHead(500, {
                "Content-Type": "text/plain",
              });
              console.log(error);
              res.end();
            } else {
              res.writeHead(200, {
                "Content-Type": "text/plain",
              });
              res.end("Event details added");
            }
          });
        }
      }
    );
  }

  getevent(req, res) {
    eventModel.find(
      { restaurantemail: req.query.restaurantemail },
      (error, result) => {
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
        }
      }
    );
  }

  getAllEvent(req, res) {
    eventModel.find({}, (error, result) => {
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

  applyEvent(req, res) {
    var apply = {
      //   customeremail: req.body.customeremail,
      customername: req.body.customername,
    };
    console.log("Apply field", apply);
    eventModel.update(
      { eventID: req.body.eventID, restaurantname: req.body.restaurantname },
      { $push: apply },
      (err, event) => {
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
          res.end("Event Successfully Applied");
        }
      }
    );
  }

  getAppliedEvents(req, res) {
    eventModel.find(
      { customeremail: req.body.customeremail },
      (error, result) => {
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
      }
    );
  }
};

module.exports = {
  events: events,
};
