import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoutes = (props) => {
  const token = localStorage.getItem("token");
  const userLogin = localStorage.getItem("userLogin");
  if (!token || !userLogin) {
    return <Navigate to="/login" />;
  } else if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.clear();
      return <Navigate to="/login" />;
    }
    return props.children;
  }
};

export default ProtectedRoutes;
