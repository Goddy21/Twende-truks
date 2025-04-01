import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './TruckList.css';
import Footer from './Footer';

const trucks = [
    { id: 1, name: 'FSR ISUZU', type: 'Flatbed Truck', image: '/images/tr1.jpeg' },
    { id: 2, name: 'ALBION', type: 'Refrigerated Truck', image: '/images/tr2.jpeg' },
    { id: 3, name: 'MAN', type: 'Tanker Truck', image: '/images/tr3.jpeg' },
    { id: 4, name: 'SCANIA', type: 'Straight Truck', image: '/images/tr4.jpeg' },
    { id: 5, name: 'MITSUBISHI', type: 'Jumbo Trailer Truck', image: '/images/tr5.jpeg' },
    { id: 6, name: 'KALMAR', type: 'Semi-Trailer Truck', image: '/images/tr6.jpeg' },
    { id: 7, name: 'TERBERG', type: 'Dump Truck', image: '/images/tr7.jpeg' },
    { id: 8, name: 'VOLKSWAGEN', type: 'Box Truck', image: '/images/tr8.jpeg' },
    { id: 9, name: 'WHEELBASE', type: 'Trail Lift Truck', image: '/images/tr9.jpeg' },
    { id: 10, name: 'Ford (F-150)', type: 'Flatbed Truck', image: '/images/truck.jpg' },
    { id: 11, name: 'Chevrolet (Silverado)', type: 'Compressor Truck', image: '/images/truck1.jpg' },
    { id: 12, name: 'Ram (1500)', type: 'Cargo Van', image: '/images/truck2.jpg' },
    { id: 13, name: 'Toyota (Tundra)', type: 'Heavy Haul Truck', image: '/images/truck3.jpg' },
];

const TruckList = ({ searchQuery }) => {
    const navigate = useNavigate();

    const handleViewDetails = (truck) => {
        const user = JSON.parse(localStorage.getItem('user')); // Check user authentication

        if (!user || !user.id) {
            navigate('/signin'); // Redirect to sign in if not authenticated
        } else {
            localStorage.setItem('selectedTruck', JSON.stringify(truck)); // Store in localStorage
            navigate(`/order/${truck.id}`, { state: { truck } }); // Pass truck data via state
        }
    };

    const filteredTrucks = trucks.filter(truck => 
        truck.name.toLowerCase().includes(String(searchQuery || "").toLowerCase())
    );

    return (
        <>
            <section className="truck-list">
                {filteredTrucks.map(truck => (
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
