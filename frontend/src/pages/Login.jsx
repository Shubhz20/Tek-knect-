import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'developer' // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
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
        <AuthForm title="SYSTEM LOGIN" type="login" onSubmit={handleSubmit}>
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
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-cyber"
                >
                    <option value="developer">Developer</option>
                    <option value="company">Company</option>
                </select>
            </div>
        </AuthForm>
    );
};

export default Login;
