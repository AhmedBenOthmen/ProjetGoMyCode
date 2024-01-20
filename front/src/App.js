import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Pages/Home.jsx";
import MyJobs from "./components/Pages/MyJobs.jsx";
import Profile from "./components/Pages/Profile.jsx";
import Register from "./components/Pages/Register.jsx";
import Login from "./components/Pages/Login.jsx";
import Admin from "./components/Pages/Admin.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
const PublicContainer = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
const PrivateContainer = () => {
  return (
    <div  style={{  backgroundColor: "#6b69693f" ,height:"100%", gap:"10px", display:"flex", flexDirection:"column"}}>
      <div className="ContentWrapper" >
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/myjobs"
          element={
            <PrivateRoute>
              <MyJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
      </div>
      <Footer />
    </div>
  );
};
//Admin route to do
function App() {
  return (
    <div className="App">
      <PublicContainer/>
      <PrivateContainer/>

      <ToastContainer />
    </div>
  );
}

export default App;
