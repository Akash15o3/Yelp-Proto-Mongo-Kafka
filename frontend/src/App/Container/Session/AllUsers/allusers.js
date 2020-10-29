import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends React.Component {
  render() {
    return (
      <Row
        key={this.props.id}
        className={"top-10 background job-listing " + this.props.showJob}
      >
        <Col xl={10}>
          <Container>
            <Link to={`/cust_prof/` + this.props.email}>
              <h5 className="mbottom-5">
                {this.props.fname} {this.props.lname}
              </h5>
            </Link>
            <h6 className="mbottom-5">
              Location : {this.props.city} , {this.props.State} ,{" "}
              {this.props.country}
            </h6>
            <h6 className="mbottom-5">MyBlog : {this.props.myblog} </h6>
            <h6 className="mbottom-5">
              YelpingSince : {this.props.yelpingsince}{" "}
            </h6>
            <h6 className="mbottom-5">About : {this.props.about} </h6>
            <br></br>
            <Button variant="danger">Follow</Button>
            <br></br>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default User;
