import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import User from "./allusers";

import axios from "axios";

class UserDes extends React.Component {
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
      .get("http://localhost:3001/getAllUsers")
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
    var printUser = this.state.data.map(
      ({
        customerID,
        fname,
        lname,
        email,
        pass,
        dateofbirth,
        city,
        State,
        country,
        phonenumber,
        nickname,
        yelpingsince,
        thingsilove,
        about,
        findmein,
        myblog,
      }) => {
        return (
          <User
            id={customerID}
            key={customerID}
            email={email}
            fname={fname}
            lname={lname}
            city={city}
            State={State}
            country={country}
            phonenumber={phonenumber}
            nickname={nickname}
            yelpingsince={yelpingsince}
            thingsilove={thingsilove}
            about={about}
            findmein={findmein}
            myblog={myblog}
            dateofbirth={dateofbirth}
          />
        );
      }
    );

    return <Container>{printUser}</Container>;
  }
}

export default UserDes;
