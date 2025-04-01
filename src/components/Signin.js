import React, { useEffect, useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const checkAuth = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            setIsAuthenticated(!!user);
        };
    
        checkAuth(); 
    
        window.addEventListener("storage", checkAuth);
    
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Loggin successful! Redirecting...')
                console.log('Login successful:', data);
                // Store user data in localStorage or use context for authentication state
                localStorage.setItem('user', JSON.stringify(data.user));
                window.dispatchEvent(new Event("storage")); 

                let previousPage = localStorage.getItem('previousPage');
                console.log("Previous page retreved", previousPage)
                localStorage.setItem('previousPage', window.location.pathname);
                if(previousPage && previousPage !== '/signin'){
                    setTimeout(()=> {
                        localStorage.removeItem('previousPage');
                        navigate(previousPage);
                    }, 2000);
                }else{
                    setTimeout(()=>navigate('/'), 2000);     
                }
            } else {
                setErrorMessage(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occured. Please try again later!')
        }
    };
    
    const signUp = () => {
        navigate('/signup')
    }

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {successMessage && <h6 className='success_message'>{successMessage}</h6>}
            {errorMessage && <h6 className='error-message'>{errorMessage}</h6>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
                
                <p onClick={signUp}>Create an account</p>
            </form>
        </div>
    );
};

export default Signin;
