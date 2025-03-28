import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure this file exists

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    loadUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.first_name} className="user-avatar" />
            <p className="user-name">{user.first_name} {user.last_name}</p>
            <div className="button-group">
              <button className="edit-btn" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="pagination-btn">
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="pagination-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
