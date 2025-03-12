import React from 'react';
import './TermsPrivacyStyles.css';
import Footer from './Footer';

export const TermsOfService = () => {
    return (
        <>
        <div className="terms-container">
            <h1 className="title">Terms of Service</h1>
            <h2 className="section-title">1. Introduction</h2>
            <p className="text">Welcome to Twende Trucks! By using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>

            <h2 className="section-title">2. Services Provided</h2>
            <p className="text">Our application allows users to browse, lease, and book trucks. We act as a platform connecting truck owners and clients.</p>

            <h2 className="section-title">3. User Responsibilities</h2>
            <ul className="list">
                <li>Provide accurate and up-to-date information.</li>
                <li>Use the platform only for legal purposes.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
            </ul>

            <h2 className="section-title">4. Payment and Fees</h2>
            <p className="text">All payments must be made through our authorized channels. Fees and charges will be clearly displayed before transactions.</p>

            <h2 className="section-title">5. Cancellations and Refunds</h2>
            <p className="text">Cancellation policies and refund eligibility will be outlined for each booking. Please review them before confirming your order.</p>

            <h2 className="section-title">6. Limitation of Liability</h2>
            <p className="text">We are not responsible for any damage, loss, or dispute arising from truck bookings. Disputes must be resolved between the parties involved.</p>

            <h2 className="section-title">7. Amendments</h2>
            <p className="text">We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.</p>
        </div>
        <Footer />
        </>
    );
};