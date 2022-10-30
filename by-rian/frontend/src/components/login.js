import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      return Swal.fire({
        icon: "error",
        text: "field email and password must be fill",
        title: "Email and Password is Required!",
      });
    }
    const cekUser = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cekUser),
    };

    const response = await fetch(
      "https://api-bukuku.herokuapp.com/login",
      requestOptions
    );
    const { dataUser: user, message, token } = await response.json();
    // console.log(response);
    if (response.status !== 200) {
      return Swal.fire({
        icon: "error",
        text: "Ensure your email and password matching!",
        title: message,
      });
    }
    // else {
    // const decode = jwtDecode(token);
    // const iat = new Date(decode.iat * 1000);
    // const exp = new Date(decode.exp * 1000);

    // console.log(`token set at: ${iat}`);
    // console.log(`token expired at: ${exp}`);
    localStorage.setItem("token", token);
    localStorage.setItem("userLogin", JSON.stringify(user));
    // console.log(decode);
    navigate("/books");
    return Swal.fire({
      icon: "success",
      title: message,
    });
    // }
  };

  const title = "Halaman Login";
  return (
    <div className="min-vh-100 bg-secondary bg-opacity-50">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6">
            <div className="card p-3 my-5">
              <h1 className="my-3 text-center">{title}</h1>
              <div className="card-body">
                <form onSubmit={onLogin}>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="input email ..."
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control col-md-6"
                        placeholder="input password ..."
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="form-control btn btn-primary my-2"
                    >
                      Login
                    </button>
                    <div className="my-3 col">
                      <span className="d-block my-2">
                        belum punya akun ? {"  "}
                        <a href="/register" className="text-decoration-none">
                          Daftar
                        </a>
                      </span>
                      <span>
                        <a
                          href="/forgot-password"
                          className="text-decoration-none"
                        >
                          lupa password ?
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
    </div>
  );
};

export default Login;
