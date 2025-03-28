import React, { useState, useEffect } from "react";
import { updateUser } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const Edituser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch user data (Simulated)
    setUser({ first_name: "John", last_name: "Doe", email: "john@example.com" });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user);
      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="First Name"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edituser;
