import React from 'react';
import './TermsPrivacyStyles.css';
import Footer from './Footer';

export const PrivacyPolicy = () => {
    return (
        <>
        <div className="terms-container">
            <h1 className="title">Privacy Policy</h1>

            <h2 className="section-title">1. Information We Collect</h2>
            <ul className="list">
                <li><strong>Personal Information:</strong> Name, contact details, and payment information.</li>
                <li><strong>Usage Data:</strong> How you interact with our platform.</li>
            </ul>

            <h2 className="section-title">2. How We Use Your Information</h2>
            <ul className="list">
                <li>To facilitate truck bookings and transactions.</li>
                <li>To improve user experience and app performance.</li>
                <li>For customer support and communication.</li>
            </ul>

            <h2 className="section-title">3. Data Sharing and Security</h2>
            <p className="text">We do not sell your data. We may share it with third-party service providers to facilitate our services, always ensuring secure data handling.</p>

            <h2 className="section-title">4. Cookies and Tracking</h2>
            <p className="text">Our app may use cookies to enhance functionality and analytics.</p>

            <h2 className="section-title">5. User Rights</h2>
            <p className="text">You have the right to access, modify, or delete your personal data. Contact our support team for assistance.</p>

            <h2 className="section-title">6. Updates to this Policy</h2>
            <p className="text">We may update this policy from time to time. Continued use of the app after updates indicates your acceptance.</p>

            <p className="text">For questions or concerns, reach out to our support team at transport@twendetrucks.co.ke.</p>
        </div>
        <Footer />
        </>
    );
};