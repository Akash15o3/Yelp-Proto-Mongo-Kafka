import React from "react";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { CustomerType, Logout } from "../../actions";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    this.props.dispatch(CustomerType());
    this.props.dispatch(Logout());
  };

  render() {
    var xnav;
    let redirectVar = null;
    if (cookie.load("cookie")) redirectVar = <Redirect to="/home" />;
    else redirectVar = <Redirect to="/login" />;
    if (cookie.load("cookie")) {
      var prof_pic = "/profile.png";

      xnav = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-3"
              style={{ display: "none" }}
            />
          </Form>
          <Nav>
            <Nav.Link className="custom-nav">
              <Link to="/home">All Restaurants</Link>
            </Nav.Link>
            <Nav.Link className="custom-nav">
              <Link to="/events">Events</Link>
            </Nav.Link>
            <Nav.Link className="custom-nav">
              <Link to="/users">Users</Link>
            </Nav.Link>

            <NavDropdown
              title={
                <img
                  src={prof_pic}
                  alt="user pic"
                  style={{ width: 40 + "px", borderRadius: 50 + "%" }}
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link to="/prof">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/myorders">My Orders</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/myevents">My Events</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/mymessages">My Messages</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/follower">Follow List</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/" onClick={this.handleLogout}>
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      xnav = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-3"
              style={{ display: "none" }}
            />
          </Form>
          <Nav activeKey="/login">
            <Nav.Link className="custom-nav">
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link className="custom-nav">
              <Link to="/signup">Create Account</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      );
    }
    return (
      <div className="container">
        {redirectVar}
        <Navbar expand="lg" style={{ backgroundColor: "#FFF" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {xnav}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    getType: state.getType,
  };
};

export default connect(mapStateToProps)(Topnav);
