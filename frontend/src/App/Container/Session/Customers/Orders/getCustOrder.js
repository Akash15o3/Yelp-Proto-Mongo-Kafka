import React from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import cookie from "react-cookies";

class CustOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: "",
      dataList: [],
    };
  }
  getCustOrder = () => {
    // e.preventDefault();
    axios.defaults.withCredentials = true;

    const orderData = {
      customerEmailForOrder: sessionStorage.getItem("customerEmailForOrder"),
    };

    axios
      .get(
        "http://localhost:3001/getCustOrder?customerEmailForOrder=" +
          orderData.customerEmailForOrder
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
          });
          // console.log("Order Data of customers", dataList);
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
  componentDidMount() {
    this.getCustOrder();
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
                      <h3>Restaurant Name : {restaurantNameForOrder}</h3>
                    </Container>
                  </Row>
                  <Row className="mleft-10">
                    <Container>
                      <Col xl={7}>
                        <Row>
                          <h6 className="small-grey">
                            EmailID of Restaurant: {restaurantEmailForOrder}
                          </h6>
                        </Row>
                        <Row>
                          <h6 className="small-grey">
                            Status of Order : {status}
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
        <h1>My Orders</h1>
        <div>{display}</div>
      </div>
    );
  }
}

export default CustOrder;
