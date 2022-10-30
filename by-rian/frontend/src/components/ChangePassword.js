import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const changePassword = async (event) => {
    event.preventDefault();
    if (password1 === "" || password2 === "") {
      return Swal.fire({
        icon: "error",
        text: "field password must be fill",
        title: "Email is Required!",
      });
    }
    const cekPassword = {
      password1,
      password2,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cekPassword),
    };

    const response = await fetch(
      "https://api-bukuku.herokuapp.com/req-reset-password",
      requestOptions
    );
    const { message } = await response.json();
    if (response.status !== 200) {
      return Swal.fire({
        icon: "error",
        text: "your password1 not registered!",
        title: "request failed!",
      });
    }
    navigate("/login");
    return Swal.fire({
      icon: "success",
      title: message,
    });
    // }
  };

  const title = "Forgot Password";
  return (
    <div className="min-vh-100 bg-secondary bg-opacity-50">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col col-md-6">
            <div className="card p-3 my-5">
              <h1 className="my-3">{title}</h1>
              <div className="card-body">
                <form onSubmit={changePassword}>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="password1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="type password ..."
                        name="password1"
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        placeholder="re-type password ..."
                        name="password2"
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="form-control btn btn-primary my-2"
                    >
                      Submit
                    </button>
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

export default ForgotPassword;
