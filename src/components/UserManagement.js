import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./UserManagement.css";
import Footer from './Footer';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [userFormData, setUserFormData] = useState({ id: "", username: "", phone: "", email: "", password: "" });
    const [contactFormData, setContactFormData] = useState({ id: "", name: "", email: "", message: "" });
    const [orderFormData, setOrderFormData] = useState({ id: "", purpose: "", duration: "", size: "", sizeunit: "", truck_name: "", status: "Pending", payment_status: "Unpaid" });

    useEffect(() => {
        fetchUsers();
        fetchContacts();
        fetchOrders();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/contacts");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleChange = (setFormData) => (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // Add or Update Item
    const addItem = async (url, formData, fetchFunction, resetData) => {
        try {
            if (formData.id) {
                await axios.put(`${url}/${formData.id}`, formData); // For updating
            } else {
                await axios.post(url, formData); // For adding
            }
            fetchFunction();
            resetData();
        } catch (error) {
            console.error("Error adding/updating item:", error);
        }
    };

    // Delete Item
    const deleteItem = async (url, id, fetchFunction) => {
        try {
            await axios.delete(`${url}/${id}`);
            fetchFunction();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Set Form Data for Edit
    const editItem = (item, setFormData) => {
        setFormData(item);
        console.log("data to be edited", item);
    };

    // Reset Form Data Functions
    const resetUserForm = () => setUserFormData({ id: "", username: "", phone: "", email: "", password: "" });
    const resetOrderForm = () => setOrderFormData({ id: "", purpose: "", duration: "", size: "", sizeunit: "", truck_name: "", status: "Pending", payment_status: "Unpaid" });
    const resetContactForm = () => setContactFormData({ id: "", name: "", email: "", message: "" });

    return (
        <>
            <div className="container">
                <h2>Management Panel</h2>

                {/* Users Section */}
                <h3>Users</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>********</td>
                                    <td>
                                        <button onClick={() => editItem(user, setUserFormData)}><FaEdit /> Edit</button>
                                        <button onClick={() => deleteItem("http://localhost:5000/api/users", user.id, fetchUsers)}><FaTrash /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Users Form */}
                <h1>{userFormData.id ? "Edit" : "Add"} User</h1>
                <input type="text" name="username" value={userFormData.username} onChange={handleChange(setUserFormData)} placeholder="username" />
                <input type="phone" name="phone" value={userFormData.phone} onChange={handleChange(setUserFormData)} placeholder="phone" />
                <input type="email" name="email" value={userFormData.email} onChange={handleChange(setUserFormData)} placeholder="email" />
                <input type="password" name="password" value={userFormData.password} onChange={handleChange(setUserFormData)} placeholder="password" />
                <button onClick={() => addItem("http://localhost:5000/api/users", userFormData, fetchUsers, resetUserForm)}>
                    <FaPlus /> {userFormData.id ? "Update" : "Add"} User
                </button>

                {/* Orders Section */}
                <h3>Orders</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Purpose</th>
                                <th>Duration</th>
                                <th>Size</th>
                                <th>Truck</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.purpose}</td>
                                    <td>{order.duration}</td>
                                    <td>{order.size} {order.sizeunit}</td>
                                    <td>{order.truck_name}</td>
                                    <td>{order.status}</td>
                                    <td>{order.payment_status}</td>
                                    <td>
                                        <button onClick={() => editItem(order, setOrderFormData)}><FaEdit /> Edit</button>
                                        <button onClick={() => deleteItem("http://localhost:5000/api/orders", order.id, fetchOrders)}><FaTrash /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Order Form */}
                <h1>{orderFormData.id ? "Edit" : "Add"} Order</h1>
                <input type="text" name="purpose" value={orderFormData.purpose} onChange={handleChange(setOrderFormData)} placeholder="Purpose" />
                <input type="text" name="duration" value={orderFormData.duration} onChange={handleChange(setOrderFormData)} placeholder="Duration" />
                <input type="text" name="size" value={orderFormData.size} onChange={handleChange(setOrderFormData)} placeholder="Size" />
                <select
                    name="sizeunit"
                    value={orderFormData.sizeunit}
                    onChange={handleChange(setOrderFormData)}
                    className="unit-select"
                >   <option>Select Unit</option>
                    <option value="feet">Feet (ft)</option>
                    <option value="meters">Meters (m)</option>
                    <option value="tons">Tons (t)</option>
                </select>
                <input type="text" name="truck_name" value={orderFormData.truck_name} onChange={handleChange(setOrderFormData)} placeholder="Truck Name" />
                <input type="text" name="status" value={orderFormData.status} onChange={handleChange(setOrderFormData)} placeholder="Status" />
                <input type="text" name="payment_status" value={orderFormData.payment_status} onChange={handleChange(setOrderFormData)} placeholder="Payment Status" />
                <button onClick={() => addItem("http://localhost:5000/api/orders", orderFormData, fetchOrders, resetOrderForm)}>
                    <FaPlus /> {orderFormData.id ? "Update" : "Add"} Order
                </button>

                {/* Contacts Section */}
                <h3>Contacts</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>
                                        <button onClick={() => editItem(contact, setContactFormData)}><FaEdit /> Edit</button>
                                        <button onClick={() => deleteItem("http://localhost:5000/api/contact", contact.id, fetchContacts)}><FaTrash /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Contacts Form */}
                <h1>{contactFormData.id ? "Edit" : "Add"} Contact</h1>
                <input type="text" name="name" value={contactFormData.name} onChange={handleChange(setContactFormData)} placeholder="Name" />
                <input type="email" name="email" value={contactFormData.email} onChange={handleChange(setContactFormData)} placeholder="Email" />
                <input type="text" name="message" value={contactFormData.message} onChange={handleChange(setContactFormData)} placeholder="Message" />
                <button onClick={() => addItem("http://localhost:5000/api/contact", contactFormData, fetchContacts, resetContactForm)}>
                    <FaPlus /> {contactFormData.id ? "Update" : "Add"} Contact
                </button>
            </div>
            <Footer />
        </>
    );
};

export default UserManagement;
