import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../actions/authedUser";

function Logout(props) {
  useEffect(() => {
    props.dispatch(logoutUser());
  }, []);
  return <Navigate to="/" />;
}

export default connect()(Logout);
