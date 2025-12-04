import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const RegisterCompany = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        contactNumber: '',
        role: 'company'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
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
                // Force a small delay to ensure local storage is set before redirecting
                setTimeout(() => {
                    navigate('/dashboard/company');
                }, 100);
            } else {
                setError(data.msg || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Server error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm title="COMPANY PARTNERSHIP" type="register" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center mb-4">
                    {error}
                </div>
            )}
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-cyber" required />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Work Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-cyber" required />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-cyber" required />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="input-cyber" required />
            </div>
            <div>
                <label className="block text-gray-400 text-sm mb-2 font-orbitron">Contact Number</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="input-cyber" required />
            </div>

            {loading && <p className="text-neonBlue text-center text-sm mt-2 animate-pulse">Processing Registration...</p>}
        </AuthForm>
    );
};

export default RegisterCompany;
