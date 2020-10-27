import React from "react";
import { Container, Row, Button } from "react-bootstrap";
// import EditDet from "./edit_det";
import axios from "axios";
import cookie from "react-cookies";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setShow: false,
      restaurantID: "",
      restaurantemail: "",
      restaurantname: "",
      dish_title: "",
      dish_cat: "",
      dish_price: "",
      dish_des: "",
      dish_ing: "",
      message: "",
      dataList: [],
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  getdishInfo = () => {
    axios.defaults.withCredentials = true;
    const data = {
      email: this.props.email,
    };
    console.log("in dish", data.email);
    //make a post request with the user data
    axios
      .get("http://localhost:3001/getDish?restaurantemail=" + data.email)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            error: "",
            dataList: response.data,
          });
          console.log("Dish Data", response.data);
          //console.log("Test",this.);
        } else {
          this.setState({
            error: "<p style={{color: red}}>Please enter correct Email</p>",
            authFlag: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          error: "Please enter correct Email" + e,
        });
      });
  };
  //   onSubmit(e) {
  //     e.preventDefault();
  //     let data = {
  //       restaurantemail: this.props.email,
  //       restaurantname: this.props.name,
  //       dish_title: this.state.dish_title,
  //       dish_cat: this.state.dish_cat,
  //       dish_price: this.state.dish_price,
  //       dish_des: this.state.dish_des,
  //       dish_ing: this.state.dish_ing,
  //     };
  //     // axios
  //     //   .post("http://localhost:3001/addDish", data)
  //     //   .then((response) => {
  //     //     this.setState({
  //     //       success: true,
  //     //     });
  //     //     this.getdishInfo();
  //     //   })
  //     //   .catch((error) => {
  //     //     this.setState({
  //     //       message: error.response.data,
  //     //     });
  //     //   });
  //   }

  //   componentWillMount() {
  //     this.getdishInfo();
  //   }

  componentDidMount() {
    this.getdishInfo();
    // this.setState({
    //   setShow: this.props.show,
    //   dish_title: this.props.data[0].dish_title,
    //   dish_cat: this.props.data[0].dish_cat,
    //   dish_des: this.props.data[0].dish_des,
    //   dish_price: this.props.data[0].dish_price,
    //   restaurantemail: this.props.data[0].restaurantemail,
    //   //   restaurantname: this.props.data[0].name,
    // });
  }
  handleClose = () => {
    this.props.getInfo();

    this.setState({ setShow: false });
  };
  handleShow = () => {
    this.setState({ setShow: true });
  };

  render() {
    console.log("Mapp Function", this.state.dataList);
    var details = this.state.dataList.map(
      ({
        restaurantemail,
        dish_title,
        dish_cat,
        dish_des,
        dish_price,
        dish_ing,
      }) => {
        return (
          <tr>
            <td>{dish_title}</td>
            <td>{dish_cat}</td>
            <td>{dish_price}</td>
            <td>{dish_des}</td>
            <td>{dish_ing}</td>
          </tr>
        );
      }
    );

    return (
      <Container className="background">
        <Row className="padding-all"></Row>
        <div>
          <div class="container">
            <h2>List of All Dishes</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Dish Category</th>
                  <th>Dish Price</th>
                  <th>Dish Description</th>
                  <th>Dish Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {/*Display the Table row based on data recieved*/}
                {details}
              </tbody>
            </table>
          </div>
        </div>
        <p> </p>
      </Container>
    );
  }
}

export default Contact;
// <Row className="padding-all">
// <div class="container">
//   <form onSubmit={this.onSubmit}>
//     <div style={{ width: "500px" }} class="form-group">
//       <input
//         type="text"
//         class="form-control"
//         name="Dish Name"
//         onChange={this.dish_title}
//         placeholder="Dish Name"
//       />
//     </div>
//     <br />
//     <div style={{ width: "500px" }} class="form-group">
//       <input
//         type="text"
//         class="form-control"
//         name="Dish Category"
//         onChange={this.dish_cat}
//         placeholder="Dish Category"
//       />
//     </div>
//     <br />
//     <div style={{ width: "500px" }} class="form-group">
//       <input
//         type="text"
//         class="form-control"
//         name="Dish Description"
//         onChange={this.dish_des}
//         placeholder="Dish Description"
//       />
//     </div>
//     <br />
//     <br />
//     <div style={{ width: "500px" }} class="form-group">
//       <input
//         type="text"
//         class="form-control"
//         name="Dish Ingredients"
//         onChange={this.dish_ing}
//         placeholder="Dish Ingredients"
//       />
//     </div>
//     <br />
//     <br />
//     <div style={{ width: "30%" }} class="form-group">
//       <input
//         type="text"
//         class="form-control"
//         name="Dish Price"
//         onChange={this.dish_price}
//         placeholder="Dish Price"
//       />
//     </div>
//     <br />
//     <div style={{ color: "#ff0000" }}>{this.state.message}</div>
//     <div style={{ width: "30%" }}>
//       <button class="btn btn-success" type="submit">
//         Add Dish
//       </button>
//     </div>
//   </form>
// </div>
// </Row>
