import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UbahRoleUser = () => {
  const [namaUser, setNamaUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = { role: roleUser };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `https://api-bukuku.herokuapp.com/ubahRoleUser/${id}`,
      requestOptions
    );
    // console.log(response);
    const success = await response.json();
    // console.log(typeof success.modifiedCount);
    if (success.modifiedCount === 1) {
      navigate("/users");
      Swal.fire({
        icon: "success",
        type: "success",
        title: "Role User Berhasil Diubah",
      });
    } else {
      Swal.fire({
        icon: "warning",
        type: "warning",
        title: "Role User Gagal Diubah",
      });
    }
  };

  const getUserById = async () => {
    const response = await fetch(
      `https://api-bukuku.herokuapp.com/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { user } = await response.json();
    // console.log(user);
    setNamaUser(user.nama);
    setEmailUser(user.email);
    setRoleUser(user.role);
  };

  useEffect(() => {
    getUserById();
    localStorage.getItem("userLogin");
    localStorage.getItem("token");
  }, []);

  const title = "Ubah Role User";
  // if (id === "*") {
  //   return <Navigate to={"/users"} />;
  // }
  return (
    <div>
      <Navbar />
      <div className="min-vh-100 bg-secondary bg-opacity-50">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-6">
              <div className="card p-3 my-5">
                <h1 className="text-center">{title}</h1>
                <form onSubmit={handleEdit}>
                  <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={namaUser}
                      name="nama"
                      id="nama"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={emailUser}
                      name="email"
                      id="email"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="role"
                      onChange={(event) => setRoleUser(event.target.value)}
                    >
                      <option selected value={roleUser}>
                        {roleUser}
                      </option>
                      <option defaultValue={"1"}>1</option>
                      <option defaultValue={"2"}>2</option>
                      <option defaultValue={"3"}>3</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="form-control btn btn-primary"
                    >
                      Ubah Role User
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

export default UbahRoleUser;
