const dishModel = require("./Models/dishModel");
const signuprestModel = require("./Models/signuprestModel");

var restaurant = class restaurant {
  getrest(req, res) {
    console.log(req.query);
    console.log(req.query.email);
    signuprestModel.findOne({ email: req.query.email }, (error, result) => {
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

  gettestrest(req, res) {
    // console.log(req.query);
    // console.log(req.query.email);
    signuprestModel.findOne({ email: req.body.email }, (error, result) => {
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
    var updaterest = {
      restaurantID: req.body.id,
      name: req.body.rest_name,
      email: req.body.email,
      location: req.body.location,
      description: req.body.des,
      contact: req.body.contact,
      timing: req.body.timing,
      reviews: req.body.reviews,
      website: req.body.website,
    };
    console.log(updaterest);
    signuprestModel.updateOne(
      { email: req.body.email },
      { $set: updaterest },
      (err, signuprest) => {
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
          res.end("Restaurant details updated");
        }
      }
    );
  }

  adddish(req, res) {
    console.log("Body", req.body);
    var newdish = new dishModel({
      // restaurantname: req.body.rest_name,
      restaurantemail: req.body.restaurantemail,
      dish_title: req.body.dish_title,
      dish_cat: req.body.dish_cat,
      dish_price: req.body.dish_price,
      dish_des: req.body.dish_des,
      dish_ing: req.body.dish_ing,
    });
    console.log("yes");
    console.log("newdish", newdish);
    dishModel.findOne(
      { restaurantemail: req.body.restaurantemail },
      (error, dish) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        }
        // if (dish) {
        //   res.writeHead(400, {
        //     "Content-Type": "text/plain",
        //   });
        //   res.end("Dish already exists.");
        // }
        else {
          newdish.save((error, data) => {
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
              res.end("Dish details added");
            }
          });
        }
      }
    );
  }

  getdish(req, res) {
    dishModel.find(
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

  insertreview(req, res) {
    var updaterest = {
      reviews: req.body.Review,
    };
    console.log(updaterest);
    signuprestModel.updateOne(
      { email: req.body.restaurantEmailForOrder },
      { $set: updaterest },
      (err, signuprest) => {
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
          res.end("Review Added");
        }
      }
    );
  }
};

module.exports = {
  restaurant: restaurant,
};
