import React from "react";
import { Link } from "react-router-dom";
import userlogin from "../userlogin";

const ButtonAdd = (props) => {
  const { role: roleUser } = userlogin();
  if (roleUser === "1" || roleUser === "2") {
    return (
      <Link to={props.path} className="btn btn-primary my-3">
        Tambah Data Buku
      </Link>
    );
  }
};

export default ButtonAdd;
