import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Contact from './components/Contact';
import About from './components/About';
import TruckList from './components/TruckList';
import HeroSection from './components/Herosection';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import OrderPage from './components/OrderPage';
import UserManagement from './components/UserManagement';

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <Router>
            <Header setSearchQuery={setSearchQuery} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/herosection" element={<HeroSection />} />
                <Route path="/listings" element={<TruckList searchQuery={searchQuery}/>} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/order/:id" element={<OrderPage />} />
                <Route path="/admin" element={<UserManagement />} />
            </Routes>
        </Router>
    );
};

export default App;
