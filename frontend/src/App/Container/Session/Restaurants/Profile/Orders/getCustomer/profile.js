import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import Primary from "./primary";

class Cust_Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideForm: "HideForm",
      hideProfileForm: "HideForm",
      hideObj: "HideForm",
      contact: "",
      email: "",
      website: "",
      name: "",
      dishOrder: [],
    };
  }

  getInfo = () => {
    const data = {
      email: this.props.match.params.email,
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/customer_profile", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            // contact: response.data.contact,
            // name: response.data.name,
            // email: response.data.email,
            // website: response.data.website,
          });
          console.log("Response Post Call", response);
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
    return (
      <Container style={{ width: 80 + "%" }}>
        <Row>
          <Col xl={5}>
            <Row
              className="all-row"
              style={{ textAlign: "center", marginTop: 10 + "px" }}
            >
              <Primary email={this.props.match.params.customerEmailForOrder} />
            </Row>
            <Row className="all-row"></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cust_Profile;
