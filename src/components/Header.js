import React, { useState, useEffect } from 'react';
import { FaTruck, FaSearch, FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({setSearchQuery}) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!user);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/signin');
    };

    const handleSearch = (e) =>{
        setQuery(e.target.value);
        setSearchQuery(e.target.value);
    }

    return (
        <header className="header">
            <div className="logo">
                <FaTruck className="truck-icon" />
                <h1>Twende Trucks</h1>
            </div>

            {/* Hamburger Button */}
            <button className="hamburger" onClick={toggleNav}>
                {isNavOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Menu */}
            <nav className={`nav ${isNavOpen ? "open" : ""}`}>
                <ul>
                    <li><a href="/" onClick={closeNav}>Home</a></li>
                    <li><a href="/listings" onClick={closeNav}>Truck Listings</a></li>
                    <li><a href="/about" onClick={closeNav}>About</a></li>
                    <li><a href="/contact" onClick={closeNav}>Contact</a></li>
                </ul>
            </nav>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text"
                 placeholder="Search Trucks" 
                 value={query}
                 onChange={handleSearch}/>
                <button><FaSearch /></button>
            </div>
                        {/* Auth Icons */}
                        <div className="auth-icons">
                {isAuthenticated ? (
                    <FaSignOutAlt className="auth-icon" title="Logout" onClick={handleLogout} />
                ) : (
                    <>
                        <FaSignInAlt className="auth-icon" title="Sign In" onClick={() => navigate('/signin')} />
                        <FaUserPlus className="auth-icon" title="Sign Up" onClick={() => navigate('/signup')} />
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
