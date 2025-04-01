import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        username: '',
        phone:'',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        console.log("Form Data:", formData);
        if(formData.password!==formData.confirmPassword){
            setErrorMessage('Passwords do not match!')
            return;
        }
        else{
            try {
                const response = await fetch('http://localhost:5000/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
        
                const data = await response.json();
                if (response.ok) {
                    setSuccessMessage("Registration Successful! Redirecting...")
                    console.log('Signup successful:', data);
                    setTimeout(()=>navigate('/signin'), 2000);
                } else {
                    setErrorMessage(data.error || 'Registration failed! Try again later.')
                    console.error('Signup failed:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };
    
    const signIn = () => {
        navigate('/signin')
    }

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {successMessage && <h6 className='success-message'>{successMessage}</h6>}
            {errorMessage && <h6 className='error-message'>{errorMessage}</h6>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="phone" 
                    name="phone" 
                    placeholder="Phone Number" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Password" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Sign Up</button>

                <p onClick={signIn}>I already have an account</p>
            </form>
        </div>
    );
};

export default Signup;