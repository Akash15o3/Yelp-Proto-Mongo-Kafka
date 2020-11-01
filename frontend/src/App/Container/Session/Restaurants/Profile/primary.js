import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Desc from "./description";
import Contact from "./contact";
import axios from "axios";
import cookie from "react-cookies";

class Primary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: "",
      data: [],
    };
  }

  getInfo = () => {
    const data2 = {
      email: localStorage.getItem("username"),
    };
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .get(
        "http://localhost:3001/getRest?email=" +
          localStorage.getItem("username")
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            data: [response.data],
          });
          // console.log("Test", response.data);
          //console.log("Test",this.);
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
    var display = this.state.data.map(
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

        // prof_pic,
      }) => {
        // var pic;
        // if (prof_pic == "" || prof_pic == null || prof_pic == undefined) {
        //   pic = "/profile.png";
        // } else {
        //   pic =
        //     `http://localhost:3001/prof_pic/` +
        //     prof_pic.replace("prof_pic", "file") +
        //     `.jpeg`;
        // }
        return (
          <Container key={restaurantID}>
            <Row className={"padding-bottom-15 background"}>
              <Col xl={11} style={{ width: 100 + "%" }}>
                <Container>
                  <Row className="top-10 mleft-10">
                    <Container>
                      <h3>{name}</h3>
                    </Container>
                  </Row>
                  <Row className="mleft-10">
                    <Container>
                      <Col xl={7}>
                        <Row>
                          <h6 className="small-grey">Location:{location}</h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">Contact Info:{contact}</h6>
                        </Row>
                      </Col>
                      <Col xl={5}>
                        <Row>
                          <h6 className="small-grey">Timing:{timing}</h6>
                        </Row>
                      </Col>

                      <Col xl={5}>
                        <Row>
                          <h6 className="small-grey">Reviews:{reviews}</h6>
                        </Row>
                      </Col>
                    </Container>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row className="top-10">
              <Col xl={8} style={{ paddingLeft: 0 + "px", width: 100 + "%" }}>
                <Desc des={description} />
              </Col>

              <Col xl={4} style={{ paddingRight: 0 + "px", width: 100 + "%" }}>
                <Contact
                  email={email}
                  website={website}
                  contact={contact}
                  timing={timing}
                  data={this.state.data}
                  getInfo={this.getInfo}
                />
              </Col>
            </Row>
          </Container>
        );
      }
    );
    return <div>{display}</div>;
  }
}

export default Primary;
// <Col xl={1}>
// <img
//   src={pic}
//   alt="user pic"
//   style={{ width: 70 + "px", marginTop: 20 + "px" }}
// />
// </Col>
