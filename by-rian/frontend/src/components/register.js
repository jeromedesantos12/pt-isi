import React, { useState } from "react";
import Swal from "sweetalert2";
const { useNavigate } = require("react-router-dom");

const Register = () => {
  const [nama, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    const newUser = {
      nama,
      email,
      password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    const response = await fetch(
      "https://api-bukuku.herokuapp.com/tambahUser",
      requestOptions
    );
    const users = await response.json();
    if (response.status === 201) {
      navigate("/login");
      Swal.fire({
        icon: "success",
        type: "success",
        text: "silahkan login!",
        title: `${users.message}`,
      });
    } else {
      navigate("/register");
      Swal.fire({
        icon: "warning",
        type: "success",
        title: users.message,
      });
    }
  };

  const title = "Halaman Register";
  return (
    <div className="min-vh-100 bg-secondary bg-opacity-50">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6">
            <div className="card p-3 my-5">
              <h1 className="text-center">{title}</h1>
              <form onSubmit={register}>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="form-control col-md-6"
                      id="nama"
                      name="nama"
                      required
                      value={nama}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control col-md-6"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control col-md-6"
                      name="password"
                      id="password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="form-control btn btn-primary"
                  >
                    Submit
                  </button>
                  <div className="my-3">
                    <span>
                      sudah punya akun ?{" "}
                      <a href="/login" className="text-decoration-none">
                        silahkan login
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
