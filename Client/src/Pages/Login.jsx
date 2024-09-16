// src/pages/Login.js
import React, { useState } from "react";
import "./Pages.css";
import { login } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-continer">
      <div className="navigation navbar-container">
        <button onClick={() => navigate("/")}>Home</button>
      </div>
      <div className="login-section">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
