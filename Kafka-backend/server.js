var connection = new require("./kafka/Connection");
const Database = require("./config");

let mongoose = require("mongoose");
var Login_Cust = require("./services/loginCust");
// var Login_Rest = require("./services/loginCust")

const connectionString =
  "mongodb+srv://yelp:yelp@yelp.b9er1.mongodb.net/yelp?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // poolSize: 500,
    // bufferMaxEntries: 0,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  if (topic_name != "__consumer_offsets") {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
      console.log(
        "message received for " + topic_name + " ",
        fname,
        "message",
        message
      );
      console.log("message value-----", message.value);
      console.log("fname in server.js kafka backend", fname);
      var data = JSON.parse(message.value);
      console.log(
        "data on kafka server.js",
        data.data,
        "replyto",
        data.replyTo
      );
      fname.handle_request(data.data, function (err, res) {
        console.log("error in fname", err);
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, function (err, data) {
          console.log("Producer data", data);
        });
        return;
      });
    });
  }
}

handleTopicRequest("login_cust", Login_Cust);
// handleTopicRequest("login_rest", Login_Rest);
