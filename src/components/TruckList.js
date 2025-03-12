import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './TruckList.css';
import Footer from './Footer';

const trucks = [
    { id: 1, name: 'FSR ISUZU', type: 'Flatbed Truck', image: '/images/tr1.jpeg' },
    { id: 2, name: 'ALBION', type: 'Refrigirated Truck', image: '/images/tr2.jpeg' },
    { id: 3, name: 'MAN', type: 'Tanker Truck', image: '/images/tr3.jpeg' },
    { id: 4, name: 'SCANIA', type: 'Straight Truck', image: '/images/tr4.jpeg' },
    { id: 5, name: 'MITSUBISHI', type: 'Jumbo Trailler Truck', image: '/images/tr5.jpeg' },
    { id: 6, name: 'KALMAR', type: 'Semi-Trailer Truck', image: '/images/tr6.jpeg' },
    { id: 7, name: 'TERBERG', type: 'Dump Truck', image: '/images/tr7.jpeg' },
    { id: 8, name: 'VOLKSWAGEN', type: 'Box Truck', image: '/images/tr8.jpeg' },
    { id: 9, name: 'WHEELBASE', type: 'Trail Lift Truck', image: '/images/tr9.jpeg' }
];

const TruckList = () => {
    const navigate = useNavigate();

    const handleViewDetails = (truck) => {
        navigate(`/order/${truck.id}`, { state: truck });
    };

    return (
        <>
        <section className="truck-list">
            {trucks.map(truck => (
                <motion.div 
                    key={truck.id} 
                    className="truck-card"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={truck.image} alt={truck.name} className="truck-image" />
                    <h3>{truck.name}</h3>
                    <p>{truck.type}</p>
                    <motion.button 
                        className="details-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleViewDetails(truck)}
                    >
                        View Details
                    </motion.button>
                </motion.div>
            ))}
        </section>
        <Footer />
        </>
    );
};

export default TruckList;