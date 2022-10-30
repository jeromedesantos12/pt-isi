import React from "react";
import { Link } from "react-router-dom";

const NavUser = (props) => {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  // if (user.role === "1") {
  // console.log(user);

  if (user.role === "1") {
    return (
      <li className="nav-item">
        <Link className="nav-link text-light" to={props.path}>
          {props.nama}
        </Link>
      </li>
    );
  }

  // }
};

export default NavUser;
