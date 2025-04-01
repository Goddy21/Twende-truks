import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OrderPage.css';
import Footer from './Footer';

const OrderPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if truck data is passed via navigation state or localStorage
    const [truck, setTruck] = useState(() => {
        return location.state?.truck || JSON.parse(localStorage.getItem('selectedTruck')) || null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        purpose: '',
        duration: '',
        size: '',
        sizeUnit: 'feet'
    });

    /*
    // ✅ Check authentication from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            setTimeout(() => navigate('/signin'), 1000);
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);*/
    
    
    
    

    useEffect(() => {
        if (!truck) {
            console.error("No truck data found, redirecting...");
            navigate('/');
        }
    }, [truck, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Order Details:", orderDetails);
        if (!truck?.name || !orderDetails.purpose || !orderDetails.duration || !orderDetails.size || !orderDetails.sizeUnit) {
            alert('All fields are required!');
            return;
        }

        try {
            
            //const user = JSON.parse(localStorage.getItem('user'));
            /*if (!user || !user.token) {
                alert('You must be signed in to place an order.');
                navigate('/signin');
                return;
            }*/

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    truck_name: truck?.name,
                    purpose: orderDetails.purpose,
                    duration: orderDetails.duration,
                    size: orderDetails.size,
                    sizeUnit: orderDetails.sizeUnit
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Order placed successfully for ${truck?.name}. We look forward to contacting you soon! Thank you!`);
                navigate('/');
            } else {
                alert(`Order failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error placing order. Please try again.');
        }
    };

    if (!truck) {
        return <p>Error: No truck selected.</p>;
    }

    return (
        <>
        <motion.div 
            className="order-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2 whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                Order {truck?.name}
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
                    Size of Truck:
                    <div className="size-input-container">
                        <motion.input 
                            type="number" 
                            name="size" 
                            value={orderDetails.size} 
                            onChange={handleChange} 
                            required
                            whileFocus={{ scale: 1.05 }}
                        />
                        <select 
                            name="sizeUnit" 
                            value={orderDetails.sizeUnit} 
                            onChange={handleChange}
                            className="unit-select"
                        >
                            <option value="feet">Feet (ft)</option>
                            <option value="meters">Meters (m)</option>
                            <option value="tons">Tons (t)</option>
                        </select>
                    </div>
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
