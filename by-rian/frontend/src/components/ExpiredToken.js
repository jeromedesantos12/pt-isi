import React from "react";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const ExpiredToken = (props) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  } else if (localStorage.getItem("token")) {
    const { exp } = jwtDecode(localStorage.getItem("token"));
    if (exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" />;
    }
  }
  return props.children;
};

export default ExpiredToken;
