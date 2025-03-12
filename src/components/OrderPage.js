import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OrderPage.css';
import Footer from './Footer';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const truck = location.state;

    const [orderDetails, setOrderDetails] = useState({
        purpose: '',
        duration: '',
        payment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Order placed for ${truck.name}\nPurpose: ${orderDetails.purpose}\nDuration: ${orderDetails.duration}\nPayment: ${orderDetails.payment}`);
        navigate('/');
    };

    return (
        <>
        <motion.div 
            className="order-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                Order {truck.name}
            </motion.h2>
            <motion.form 
                onSubmit={handleSubmit} 
                className="order-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <label>
                    Purpose of Use:
                    <motion.input 
                        type="text" 
                        name="purpose" 
                        value={orderDetails.purpose} 
                        onChange={handleChange} 
                        required
                        whileFocus={{ scale: 1.05 }}
                    />
                </label>
                <label>
                    Duration of Use (in days):
                    <motion.input 
                        type="number" 
                        name="duration" 
                        value={orderDetails.duration} 
                        onChange={handleChange} 
                        required
                        whileFocus={{ scale: 1.05 }}
                    />
                </label>
                <label>
                    Payment Amount (KES):
                    <motion.input 
                        type="number" 
                        name="payment" 
                        value={orderDetails.payment} 
                        onChange={handleChange} 
                        required
                        whileFocus={{ scale: 1.05 }}
                    />
                </label>
                <motion.button 
                    type="submit" 
                    className="submit-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Place Order
                </motion.button>
            </motion.form>
        </motion.div>
        <Footer />
        </>
    );
};

export default OrderPage;