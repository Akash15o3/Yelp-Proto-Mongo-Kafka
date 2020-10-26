import React, { Component } from "react";
import { Route } from "react-router-dom";
import Signin from "./NoSession/Customer/signinformcust";
import SigninC from "./NoSession/Restaurant/signinformrest";
import Signup from "./NoSession/Customer/signupformcust";
import SignupC from "./NoSession/Restaurant/signupformrest";
import Topnav from "../Navbar/topnav";
import Restaurant_Prof from "./Session/Restaurants/Profile/container";
import Profile from "./Session/Customers/Profile/container";

import { connect } from "react-redux";
class bodyCont extends Component {
  render() {
    var rest;
    var prof;
    // prof = <Profile />;
    if (this.props.getType == "Customer") {
      // rest = <Rest />;
      prof = <Profile />;
    } else {
      // rest = <Rest />;
      prof = <Restaurant_Prof />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: 100 + "%",
        }}
      >
        <Route path="/" component={Topnav} />
        <div className="custom-body">
          <div className="container">
            <Route path="/login" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/restaurantlogin" component={SigninC} />
            <Route path="/restaurantsignup" component={SignupC} />
            <Route path="/home">{rest}</Route>
            <Route path="/cust_prof">{prof}</Route>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    getType: state.getType,
  };
};
export default connect(mapStateToProps)(bodyCont);
