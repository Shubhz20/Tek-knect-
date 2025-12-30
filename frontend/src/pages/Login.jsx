import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

import AuthForm from '../components/AuthForm';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await fetch('/api/auth/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: credentialResponse.credential })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                
                if (data.role === 'developer') {
                    navigate('/dashboard/developer');
                } else {
                    navigate('/dashboard/company');
                }
            } else {
                alert(data.msg || 'Google Login failed');
            }
        } catch (err) {
            console.error('Google Auth Error:', err);
            alert('Google Auth Failed');
        }
    };

    const handleGoogleError = () => {
        console.log('Google Login Failed');
        alert('Google Login Failed');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                if (data.role === 'developer') {
                    navigate('/dashboard/developer');
                } else {
                    navigate('/dashboard/company');
                }
            } else {
                alert(data.msg || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    return (
        <AuthForm 
            title="SYSTEM LOGIN" 
            type="login" 
            onSubmit={handleSubmit}
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleError={handleGoogleError}
        >
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-cyber"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-cyber"
                    required
                />
            </div>
        </AuthForm>
    );
};

export default Login;
