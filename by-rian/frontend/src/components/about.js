import React from "react";
// import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import RoleAuth from "./RoleAuth";

const About = () => {
  const title = "Halaman About";
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{title}</h1>
        <p>
          About Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
          maxime minus. Aspernatur?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tenetur magnam corrupti atque temporibus iste
          nobis?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
          autem provident fugit soluta eveniet, dolore ducimus beatae veritatis
          magnam facilis?
        </p>
        <RoleAuth />
      </div>
      {/* <hr />
      <Outlet /> */}
    </div>
  );
};

export default About;
