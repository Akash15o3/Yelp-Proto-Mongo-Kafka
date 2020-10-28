import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Rest from "./allrest";

import axios from "axios";

class RestDes extends React.Component {
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
      .get("http://localhost:3001/getAllRest")
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
    var printRest = this.state.data.map(
      ({
        restaurantID,
        name,
        email,
        pass,
        location,
        description,
        contact,
        timing,
        reviews,
        website,
      }) => {
        return (
          <Rest
            id={restaurantID}
            key={restaurantID}
            email={email}
            location={location}
            name={name}
          />
        );
      }
    );

    return <Container>{printRest}</Container>;
  }
}

export default RestDes;
