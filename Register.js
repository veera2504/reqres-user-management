import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import "../styles.css"; // Ensure styles.css is correctly linked

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/"); // Redirect to login
    } catch (err) {
      setError("Registration Failed");
    }
  };

  return (
    <div className="outer-container">
      <div className="form-container">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
