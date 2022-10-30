import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const changePassword = async (event) => {
    event.preventDefault();
    if (email === "") {
      return Swal.fire({
        icon: "error",
        text: "field email must be fill",
        title: "Email is Required!",
      });
    }
    const cekUser = {
      email,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cekUser),
    };

    const response = await fetch(
      "https://api-bukuku.herokuapp.com/req-reset-password",
      requestOptions
    );
    const { message } = await response.json();
    if (response.status !== 200) {
      return Swal.fire({
        icon: "error",
        text: "your email not registered!",
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
