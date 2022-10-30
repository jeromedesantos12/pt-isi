import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedContent = (props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if (userLogin.role === "3") {
    return <Navigate to="/books" />;
  }
  return props.children;
};

export default ProtectedContent;
