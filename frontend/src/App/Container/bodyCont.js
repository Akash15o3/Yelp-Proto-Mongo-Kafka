import React, { Component } from "react";
import { Route } from "react-router-dom";
import Signin from "./NoSession/Customer/signinformcust";
import SigninC from "./NoSession/Restaurant/signinformrest";
import Signup from "./NoSession/Customer/signupformcust";
import SignupC from "./NoSession/Restaurant/signupformrest";
import Topnav from "../Navbar/topnav";
import Restaurant_Prof from "./Session/Restaurants/Profile/container";
import Rest_prof from "./Session/AllRestaurants/getrestaurant/profile";
import Cust_prof from "./Session/Restaurants/Profile/Orders/getCustomer/profile";
import Profile from "./Session/Customers/Profile/container";
import Rest from "./Session/AllRestaurants";
import CustOrder from "./Session/Customers/Orders/getCustOrder";
import RestOrder from "./Session/Restaurants/Profile/Orders/getRestOrder";
import Rest_Events from "./Session/Restaurants/Profile/Events/container";
import AllEvents from "./Session/Customers/Events/index";
import Cust_Events from "./Session/Customers/Events/applied/index";
import Users from "./Session/AllUsers/index";
import Message from "./Session/Restaurants/Profile/Orders/getCustomer/profileMessage";
import { connect } from "react-redux";
class bodyCont extends Component {
  render() {
    var rest;
    var orders;
    var prof;
    var events;
    // prof = <Profile />;
    if (this.props.getType == "Customer") {
      events = <Cust_Events />;
      orders = <CustOrder />;
      rest = <Rest />;
      prof = <Profile />;
    } else {
      events = <Rest_Events />;
      orders = <RestOrder />;
      rest = <Restaurant_Prof />;
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
            <Route path="/users" component={Users} />
            <Route path="/home">{rest}</Route>
            <Route path="/prof">{prof}</Route>

            <Route path="/rest_prof/:email" component={Rest_prof} />
            <Route
              path="/cust_prof/:customerEmailForOrder"
              component={Cust_prof}
            />
            <Route
              path="/cust_prof_message/:customerEmailForOrder"
              component={Message}
            />

            <Route path="/myorders"> {orders}</Route>

            <Route path="/myevents">{events}</Route>
            <Route path="/events" component={AllEvents} />
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
