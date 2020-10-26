import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      // tprof_pic: "",
      id: "",
      rest_name: "",
      location: "",
      des: "",
      timing: "",
      contact: "",
      website: "",
      title: "",
      cat: "",
      price: "",
      reviews: "",
      email: "",
    };
  }
  id = (e) => {
    this.setState({
      id: e.target.value,
    });
  };
  restName = (e) => {
    this.setState({
      rest_name: e.target.value,
    });
  };

  location = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  desc = (e) => {
    this.setState({
      des: e.target.value,
    });
  };

  timing = (e) => {
    this.setState({
      timing: e.target.value,
    });
  };

  contact = (e) => {
    this.setState({
      contact: e.target.value,
    });
  };

  website = (e) => {
    this.setState({
      website: e.target.value,
    });
  };

  email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  reviews = (e) => {
    this.setState({
      reviews: e.target.value,
    });
  };
  updatePers = (e) => {
    e.preventDefault();
    const data = {
      rest_name: this.state.rest_name,
      location: this.state.location,
      des: this.state.des,
      timing: this.state.timing,
      contact: this.state.contact,
      website: this.state.website,
      email: this.state.email,
      reviews: this.state.reviews,

      id: this.state.id,
      // prof_pic: this.state.tprof_pic,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:3001/updateRest", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
          });
          this.handleClose();
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
  handleClose = () => {
    this.props.handleClose();
    this.setState({ setShow: false });
  };
  handleShow = () => this.setState({ setShow: true });

  componentDidMount() {
    this.setState({
      setShow: this.props.show,
      rest_name: this.props.data[0].name,
      location: this.props.data[0].location,
      des: this.props.data[0].description,
      timing: this.props.data[0].timing,
      contact: this.props.data[0].contact,
      website: this.props.data[0].website,
      email: this.props.data[0].email,
      id: this.props.data[0].restaurantID,
      reviews: this.props.data[0].reviews,
      // tprof_pic: this.props.data[0].prof_pic,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show != this.props.show) {
      this.setState({
        setShow: this.props.show,
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <Modal show={this.state.setShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form classname="top-10">
            <Form.Group controlId="formCompanyName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Restaurant Name"
                value={this.state.rest_name}
                onChange={this.restName}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={this.state.location}
                onChange={this.location}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Timing</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                value={this.state.timing}
                onChange={this.timing}
              />
            </Form.Group>
            <Form.Group controlId="formCnt">
              <Form.Label>Contact Info </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Info"
                value={this.state.contact}
                onChange={this.contact}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Website"
                value={this.state.website}
                onChange={this.website}
              />
            </Form.Group>

            <Form.Group controlId="formWebsite">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.des}
                onChange={this.desc}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={this.updatePers}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default edit;
// <Form.Group controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={this.state.email}
//                 onChange={this.email}
//               />
//             </Form.Group>
