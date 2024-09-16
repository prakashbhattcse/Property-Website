import React, { useState } from "react";
import { signup } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password, name });
      toast.success("Login successful!");
      navigate("/login");
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
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Signup</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
