const eventModel = require("./Models/eventModel");
const signuprestModel = require("./Models/signuprestModel");
const registeredeventModel = require("./Models/registeredEvents");

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
    registeredeventModel.find(
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
    console.log("Body", req.body);
    var applyevent = new registeredeventModel({
      restaurantemail: req.body.restaurantemail,
      restaurantname: req.body.restaurantname,
      customeremail: req.body.customeremail,
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
    console.log("applyevent", applyevent);
    registeredeventModel.find(
      { customeremail: req.body.customeremail },
      (error, registeredevent) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        } else {
          applyevent.save((error, data) => {
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
              res.end("Event Applied");
            }
          });
        }
      }
    );
  }

  getAppliedEvents(req, res) {
    console.log("TESTING ----", req.body);
    registeredeventModel.find(
      { customeremail: req.query.customeremail },
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
          console.log("AAAAAAA", JSON.stringify(result));
        }
      }
    );
  }
};

module.exports = {
  events: events,
};
