import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Home() {
  const title = "Halaman Home";
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{title}</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A,
          odio?Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusamus tempore officiis ex distinctio aut sint culpa, voluptatibus
          reiciendis, temporibus neque consequatur perspiciatis ducimus
          veritatis consequuntur ipsum, aspernatur nemo at veniam.
        </p>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
