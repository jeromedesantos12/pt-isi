import React from "react";
import { Navigate } from "react-router-dom";

const PageUser = (props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if (userLogin.role === "3" || userLogin.role === "2") {
    return <Navigate to="/" />;
  }
  return props.children;
};

export default PageUser;
