import React from 'react';
import './HeroSection.css';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <>
        <section className="hero">
            <motion.div 
                className="hero-content"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>Find the Perfect Truck for Your Job</h2>
                <p>Browse through thousands of listings and get the best deals.</p>
                <motion.button 
                    className="browse-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Browse Listings
                </motion.button>
            </motion.div>
            <motion.div 
                className="hero-images"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <motion.img src="/images/truck.jpg" alt="Truck 1" className="truck-image" whileHover={{ scale: 1.05 }} />
                <motion.img src="/images/truck2.jpg" alt="Truck 2" className="truck-image" whileHover={{ scale: 1.05 }} />
                <motion.img src="/images/truck3.jpg" alt="Truck 3" className="truck-image" whileHover={{ scale: 1.05 }} />
                <motion.img src="/images/truck1.jpg" alt="Truck 3" className="truck-image" whileHover={{ scale: 1.05 }} />
            </motion.div>
        </section>
        </>
    );
};

export default HeroSection;