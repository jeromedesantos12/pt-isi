import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TambahBuku = () => {
  const [namaBuku, setNamaBuku] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLogin = localStorage.getItem("userLogin");
    if (!userLogin) {
      return navigate("/login");
    }
    const data = {
      namaBuku,
      penerbit,
      pengarang,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "https://api-bukuku.herokuapp.com/books/tambah",
      requestOptions
    );
    const books = await response.json();
    // console.log(response.status);
    // console.log(books);
    if (response.status === 201) {
      navigate("/books");
      Swal.fire({
        icon: "success",
        type: "success",
        title: books.message,
      });
    } else {
      navigate("/tambah");
      Swal.fire({
        icon: "warning",
        type: "success",
        title: books.message,
      });
    }
  };

  useEffect(() => {
    localStorage.getItem("userLogin");
    localStorage.getItem("token");
  });

  const title = "Tambah Data Buku";
  return (
    <div>
      <Navbar />
      <div className="min-vh-100 bg-secondary bg-opacity-50">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-6">
              <div className="card p-3 my-5">
                <h1 className="text-center">{title}</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="namaBuku" className="form-label">
                      Nama Buku
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="namaBuku"
                      id="namaBuku"
                      placeholder="masukkan nama Buku.."
                      value={namaBuku}
                      onChange={(event) => setNamaBuku(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="penerbit" className="form-label">
                      Nama Penerbit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="penerbit"
                      id="penerbit"
                      placeholder="masukkan nama penerbit.. "
                      value={penerbit}
                      onChange={(event) => setPenerbit(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 ">
                    <label htmlFor="pengarang" className="form-label">
                      Nama Pengarang
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="pengarang"
                      id="pengarang"
                      placeholder="masukkan nama pengarang.. "
                      value={pengarang}
                      onChange={(event) => setPengarang(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="form-control btn btn-primary"
                    >
                      Tambah Data Buku
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

export default TambahBuku;
