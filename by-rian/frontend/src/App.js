import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./components/books";
import Users from "./components/users";
import TambahBuku from "./components/tambahBuku";
import UbahBuku from "./components/ubahBuku";
import Login from "./components/login";
import Register from "./components/register";
import UbahRoleUser from "./components/UbahRoleUser";
import Home from "./components/Home";
import About from "./components/about";
import ProtectedRoutes from "./components/auth-content/ProtectedRoutes";
import PageError from "./components/PageError";
import ProtectedContent from "./components/auth-content/ProtectedContent";
import PageUser from "./components/auth-content/PageUser";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  // console.log(exp);
  // const [user] = useState(userLogin);

  // useEffect(() => {
  //   localStorage.getItem("token");
  //   localStorage.getItem("userLogin");
  // }, []);
  // console.log(user);

  // if (exp * 1000 < Date.now()) {
  //   localStorage.clear();
  //   return <div>testtt</div>;
  // }
  return (
    <BrowserRouter>
      {/* <UserContext.Provider value={{ user }}> */}
      <Routes>
        <Route path="*" element={<PageError />}></Route>
        {/* public routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          }
        >
          {/* <Route path="outlet" element={<TestOutlet />}></Route> */}
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/logout" element={<Login />}></Route>

        {/* protected routes */}
        <Route
          path="/books"
          element={
            <ProtectedRoutes>
              <Books />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <PageUser>
                <Users />
              </PageUser>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/tambah"
          element={
            <ProtectedRoutes>
              <ProtectedContent>
                <TambahBuku />
              </ProtectedContent>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/ubah/:id"
          element={
            <ProtectedRoutes>
              <ProtectedContent>
                <UbahBuku />
              </ProtectedContent>
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/ubahRoleUser/:id"
          element={
            <ProtectedRoutes>
              <UbahRoleUser />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
      {/* </UserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
