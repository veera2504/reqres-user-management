import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles.css";  // ✅ Import CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/users"); // Redirect to users list
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="login-box">
          <h2 className="login-title">Welcome Back</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="register-text">Don't have an account? <a href="/register">Sign up</a></p>
          <p className="forgot-password">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
