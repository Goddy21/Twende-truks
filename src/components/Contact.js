import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import Footer from './Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok){
                console.log('Message received', data);
                alert('We received you information. Thank you!')
            }else{
                console.log('Error', data.error);
            }
        }catch(error){
            console.log('Error', error);
        }

        console.log('Contact Form Data:', formData);
    }
    
    return (
        <>
        <motion.div 
            className="contact-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Contact Us</h2>
            <motion.div className='row'>
                <motion.section className='column' whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                    <h4>Email</h4>
                    <p><a href='mailto:transport@twendetrucks.com'>transport@twendetrucks.com</a></p>
                </motion.section>
                <motion.section className='column' whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                    <h4>Phone</h4>
                    <p><a href='tel:+254798187878'>+254798187878</a></p>
                </motion.section>
                <motion.section className='column' whileHover={{scale:1.05}}>
                    <h4>Physical address</h4>
                    <p>Kajiado town</p>
                </motion.section>
            </motion.div>
            <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <motion.input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    whileFocus={{ scale: 1.05 }}
                />
                <motion.input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    whileFocus={{ scale: 1.05 }}
                />
                <motion.textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    whileFocus={{ scale: 1.05 }}
                />
                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Message
                </motion.button>
            </motion.form>

        {/* Google Map Section */}
        <div className="map-section">
            <h2>Find Us Here</h2>
            <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBR3E1UJ6IHkFTgonnGrT_JHrhXS8nAPaw&q=-1.8534,36.7820"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>

        </motion.div>
        <Footer />
        </>
    );
};

export default Contact;