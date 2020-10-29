import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";

import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Event from "./allevents";

import axios from "axios";

class EventDes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
    };
    // this.submitrest = this.submitrest.bind(this);
  }
  getInfo = () => {
    axios
      .get("http://localhost:3001/getAllEvents")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: response.data,
          });
        } else {
          this.setState({
            error:
              "<p style={{color: red}}>Please enter correct credentials</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct credentials" + e,
        });
      });
  };
  componentDidMount() {
    this.getInfo();
  }

  render() {
    var printEvent = this.state.data.map(
      ({
        restaurantemail,
        restaurantname,
        customeremail,
        customername,
        eventID,
        eventname,
        description,
        timeofevent,
        date,
        location,
        hashtag,
      }) => {
        return (
          <Event
            id={eventID}
            key={eventID}
            restaurantemail={restaurantemail}
            location={location}
            restaurantname={restaurantname}
            eventname={eventname}
            description={description}
            timeofevent={timeofevent}
            date={date}
            hashtag={hashtag}
            timeofevent={timeofevent}
          />
        );
      }
    );

    return <Container>{printEvent}</Container>;
  }
}

export default EventDes;
