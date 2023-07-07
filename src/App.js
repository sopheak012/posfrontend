import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
