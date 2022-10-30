import { Navigate } from "react-router-dom";

const RoleAuth = (props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  // if (!token || !userLogin) {
  //   return <Navigate to="/login" />;
  // }
  const { role } = userLogin;
  // console.log(role);
  return props.children;
};

export default RoleAuth;
