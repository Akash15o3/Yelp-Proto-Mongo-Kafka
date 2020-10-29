import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

class RestOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      handleChange: "",
      updatedstatus: "",
    };
  }
  handleChange = (e) => {
    console.log("In Handle CHange", e.target.id);
    this.updatedOrderStatus = e.target.value;

    this.setState({ selectValue: this.updatedOrderStatus });
    const data = {
      updatedStatus: e.target.value,
      timestamp: e.target.id,
    };

    axios
      .post("http://localhost:3001/updateOrderStatus", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            authFlag: true,
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

  getRestOrder = () => {
    axios.defaults.withCredentials = true;

    const orderData = {
      restaurantEmailForOrder: sessionStorage.getItem(
        "restaurantEmailForOrder"
      ),
    };

    axios
      .get(
        "http://localhost:3001/getRestOrder?restaurantEmailForOrder=" +
          orderData.restaurantEmailForOrder
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
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
          error: "Error while ordering" + e,
        });
      });
  };

  getTimeOfOrder = (e) => {
    //e.preventDefault();
    console.log("Value of Time", e);
  };
  componentDidMount() {
    this.getRestOrder();
    this.setState({
      handleChange: this.props.handleChange,
      updatedStatus: this.props.updatedstatus,
    });
  }

  render() {
    var display = this.state.dataList.map(
      ({
        customerEmailForOrder,
        restaurantEmailForOrder,
        customerNameForOrder,
        restaurantNameForOrder,
        dishOrder,
        status,
        deliveryType,
        pickupStatus,
        deliveryStatus,
        timeOfOrder,
      }) => {
        return (
          <Container>
            <Row className={"padding-bottom-15 background"}>
              <Col xl={11} style={{ width: 100 + "%" }}>
                <Container>
                  <Row className="top-10 mleft-10">
                    <Container>
                      <Link
                        id={timeOfOrder}
                        to={`/cust_prof_message/` + customerEmailForOrder}
                        onClick={this.getTimeOfOrder(timeOfOrder)}
                        onR
                      >
                        <h3>Customer Name : {customerNameForOrder}</h3>
                      </Link>
                    </Container>
                  </Row>
                  <Row className="mleft-10">
                    <Container>
                      <Col xl={7}>
                        <Row>
                          <h6 className="small-grey">
                            EmailID of Customer: {customerEmailForOrder}
                          </h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Status of Order :
                            <select
                              id={timeOfOrder}
                              defaultValue={status}
                              onChange={this.handleChange}
                            >
                              <option value="Received">Received</option>
                              <option value="Preparing">Preparing</option>
                              <option value="On The Way">On The Way</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Delivery Type : {deliveryType}
                          </h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Dishes Ordered : {dishOrder}
                          </h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Time of Order : {timeOfOrder}
                          </h6>
                        </Row>
                      </Col>
                    </Container>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        );
      }
    );
    return (
      <div>
        <h1>Received Orders</h1>
        <div>{display}</div>
      </div>
    );
  }
}

export default RestOrder;
