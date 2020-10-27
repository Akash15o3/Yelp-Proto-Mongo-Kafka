import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import Orderedrest from "./orderedRest";
// import Ordered from "./ordered";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Rest from "./allrest";

import axios from "axios";
// import Primary from "../AllRestaurants/getrestaurant/primary";

// import { getType, RestaurantType } from "../../../../actions";

// class RestDes extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       error: "",
//     };
//     // this.submitrest = this.submitrest.bind(this);
//   }

//   getInfo = () => {
//     axios
//       .get("http://localhost:3001/getAllRest")
//       .then((response) => {
//         if (response.status === 200) {
//           this.setState({
//             error: "",
//             data: response.data,
//           });
//         } else {
//           this.setState({
//             error:
//               "<p style={{color: red}}>Please enter correct credentials</p>",
//             authFlag: false,
//           });
//         }
//       })
//       .catch((e) => {
//         this.setState({
//           error: "Please enter correct credentials" + e,
//         });
//       });
//   };
//   componentDidMount() {
//     this.getInfo();
//     // this.submitrest();
//   }

//   clickLink = (ev) => {
//     var getrestemail = ev.currentTarget.value;
//     console.log("event", ev.currentTarget.value);

//     console.log("Props", data2);
//   };
//   render() {
//     var printRest = this.state.data.map(
//       ({
//         restaurantID,
//         name,
//         email,
//         pass,
//         location,
//         description,
//         contact,
//         timing,
//         reviews,
//         website,
//       }) => {
//         // return (
//         //   <a
//         //     indexkey={restaurantID}
//         //     className="restCont"
//         //     key={restaurantID}
//         //     href={"/cust_prof"}
//         //   >
//         //     <Rest
//         //       data-key={restaurantID}
//         //       location={location}
//         //       name={name}
//         //       reviews={reviews}
//         //     />
//         //   </a>
//         // );
//         // console.log("emailtest", email);
//         return (
//           <Row className="background top-10">
//             <Col xl={10}>
//               <Row>
//                 <Container className="job-listing">
//                   <Button
//                     key={email}
//                     value={email}
//                     onClick={this.clickLink}
//                     to="/rest_prof"
//                   >
//                     <Rest
//                       data-key={email}
//                       index-key={email}
//                       email={email}
//                       location={location}
//                       name={name}
//                     />
//                   </Button>
//                 </Container>
//               </Row>
//             </Col>
//           </Row>
//         );
//         // return (
//         //   <Row className="background top-10">
//         //     <Col xl={10}>
//         //       <Row>
//         //         <Container className="job-listing">
//         //           <Rest
//         //             data-key={restaurantID}
//         //             location={location}
//         //             name={name}
//         //             reviews={reviews}
//         //           />
//         //           <Button variant="danger">View Profile</Button>
//         //         </Container>
//         //       </Row>
//         //     </Col>
//         //   </Row>
//         // );
//       }
//     );

//     return (
//       <Row className="background top-10">
//         <Col xl={10}>
//           <Row>
//             <Container className="job-listing">
//               <h2>All Restaurants</h2>
//               <p></p>
//               <p></p>
//               <p></p>
//               <p></p>
//               <p></p>
//               <p></p>
//             </Container>
//           </Row>
//           {printRest}
//         </Col>
//       </Row>
//     );
//   }
// }

// // const mapStateToProps = (state) => {
// //   return {
// //     getType: state.getType,
// //   };
// // };

// export default RestDes;

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
    // this.submitrest();
  }

  //   clickLink = (ev) => {
  //     var getrestemail = ev.currentTarget.value;
  //     console.log("event", ev.currentTarget.value);
  //   };
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
        // return (
        //   <a
        //     indexkey={restaurantID}
        //     className="restCont"
        //     key={restaurantID}
        //     href={"/cust_prof"}
        //   >
        //     <Rest
        //       data-key={restaurantID}
        //       location={location}
        //       name={name}
        //       reviews={reviews}
        //     />
        //   </a>
        // );
        // console.log("emailtest", email);
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
