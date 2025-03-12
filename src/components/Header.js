import React, { useState } from 'react';
import { FaTruck, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <header className="header">
            <div className="logo">
                <FaTruck className="truck-icon" />
                <h1>Twende Trucks</h1>
            </div>
            <nav className={`nav ${isNavOpen ? "open" : ""}`}>
                <ul>
                    <li><a href="/" onClick={closeNav}>Home</a></li>
                    <li><a href="/listings" onClick={closeNav}>Truck Listings</a></li>
                    <li><a href="/about" onClick={closeNav}>About</a></li>
                    <li><a href="/contact" onClick={closeNav}>Contact</a></li>
                </ul>
            </nav>
            <button className="hamburger" onClick={toggleNav}>
                {isNavOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="search-bar">
                <input type="text" placeholder="Search Trucks" />
                <button><FaSearch /></button>
            </div>
        </header>
    );
};

export default Header;