const messageModel = require("./Models/messageModel");
var messages = class messages {
  insertmessage(req, res) {
    console.log("connected");
    var newmessage = new messageModel({
      restaurantname: req.body.restaurantnameformessage,
      restaurantemail: req.body.restaurantemailformessage,
      customername: req.body.customernameformessage,
      customeremail: req.body.customeremailformessage,
      message: [
        {
          messageContent: req.body.message,

          messageSender: req.body.sender, //Restaurant or Customer
        },
      ],
    });
    console.log("yes");
    console.log(newmessage);
    messageModel.findOne(
      {
        restaurantemail: req.body.restaurantemailformessage,
        customeremail: req.body.customeremailformessage,
      },
      (error, found) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        }
        if (found) {
          console.log("in if");
          messageModel.updateOne(
            {
              restaurantemail: req.body.restaurantemailformessage,
              customeremail: req.body.customeremailformessage,
            },
            {
              $push: {
                message: [
                  {
                    messageContent: req.body.message,
                    messageSender: req.body.sender,
                  },
                ],
              },
            },
            (err, found) => {
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
                res.end("Message  updated");
              }
            }
          );

          console.log("after update");
        } else {
          newmessage.save((error, data) => {
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
              res.end("message details added");
            }
          });
        }
      }
    );
  }

  getmessages(req, res) {
    console.log("TESTING ----", req.body);
    messageModel.find(
      {
        $or: [
          { restaurantemail: req.query.restaurantemail },
          { customeremail: req.query.customeremail },
        ],
      },
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
          console.log("Message back result", JSON.stringify(result));
        }
      }
    );
  }
};
module.exports = {
  messages,
};
