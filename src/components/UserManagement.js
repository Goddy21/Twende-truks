import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UserManagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: "",
        password: ""
    });

    // Fetch users from the API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");  // Adjust this to your API endpoint
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Populate form when editing a user
    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username || "",
            phone: user.phone || "",
            email: user.email || "",
            password: ""  // Keep password empty for security
        });
    };

    // Update user details
    const handleUpdate = async () => {
        if (!selectedUser) return;

        try {
            const response = await axios.put(`/api/users/${selectedUser.id}`, formData);
            console.log("User updated:", response.data);
            fetchUsers(); // Refresh users list
            setSelectedUser(null);
            setFormData({ username: "", phone: "", email: "", password: "" });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchUsers(); // Refresh users list
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div className="container">
            <h2>User Management</h2>

            {/* User Form */}
            <div className="form-container">
                <h3>{selectedUser ? "Edit User" : "Select a User"}</h3>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password (Optional)" />

                <button onClick={handleUpdate} disabled={!selectedUser}>
                    Update User
                </button>
                <button onClick={handleEdit} disabled={!selectedUser}>
                    Edit User
                </button>
                <button onClick={handleDelete} disabled={!selectedUser}>
                    Delete User
                </button>
            </div>

            {/* Users Table */}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)} className="edit-btn">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="delete-btn">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
