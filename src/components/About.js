import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import Footer from './Footer';

const images = [
    '/images/truck1.jpg',
    '/images/truck2.jpg',
    '/images/truck3.jpg',
    '/images/tr1.jpeg'
];

const About = () => {
    return (
        <>
        <motion.div 
            className="about-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            >
                About Twende Trucks
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Twende Trucks is your go-to platform for browsing, leasing, and booking trucks
                with ease and convenience. We offer a wide range of trucks suited for different
                needs — whether for business or personal use.
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                Our mission is to revolutionize truck leasing and booking by providing a seamless
                and transparent online experience. With real-time availability, detailed listings,
                and a commitment to customer satisfaction, we’re here to get you moving.
            </motion.p>
        </motion.div>

        <div className="image-gallery">
            {images.map((image, index) => (
                <motion.img 
                    key={index}
                    src={image} 
                    alt={`truck-${index + 1}`} 
                    className='about-image'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.5, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                />
            ))}
        </div>
        <Footer />
        </>
    );
};

export default About;