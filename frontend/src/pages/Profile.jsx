import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('/api/auth/profile', {
                    headers: { 'x-auth-token': token }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setFormData(data);
                } else {
                    // navigate('/login');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    if (loading) return <div className="min-h-screen bg-darkBg text-white flex items-center justify-center">Loading...</div>;

    const isGoogleUser = !!user?.avatar;

    return (
        <div className="min-h-screen bg-darkBg text-gray-100 font-inter">
            <Navbar />
            <div className="container mx-auto px-6 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto bg-cyberGray/50 border border-gray-700 p-8 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-orbitron font-bold text-white tracking-wider">User Profile</h1>
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 border border-neonBlue text-neonBlue font-orbitron text-sm hover:bg-neonBlue hover:text-black transition-all"
                            >
                                Edit Details
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column: Photo & Basic Info */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="relative group">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-2 border-neonBlue object-cover shadow-[0_0_15px_rgba(0,243,255,0.3)]" />
                                ) : (
                                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex flex-col items-center justify-center bg-gray-800/50 text-gray-400 group-hover:border-neonBlue transition-colors cursor-pointer">
                                        <span className="text-4xl font-bold mb-1">{user?.name?.charAt(0).toUpperCase()}</span>
                                        {isEditing && <span className="text-xs text-neonBlue">Upload Photo</span>}
                                    </div>
                                )}
                            </div>
                            
                            <h2 className="text-xl font-bold mt-4 text-white text-center">{user?.name}</h2>
                            <p className="text-gray-400 text-sm text-center break-all">{user?.email}</p>
                            <span className="mt-2 px-3 py-1 bg-neonBlue/10 text-neonBlue text-xs rounded-full uppercase tracking-wider">{user?.role}</span>
                        </div>

                        {}
                        <div className="w-full md:w-2/3">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-neonBlue font-orbitron text-lg border-b border-gray-700 pb-2">Basic Details</h3>
                                    
                                    <div className="grid grid-cols-1 gap-4">
                    
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1 font-orbitron">Full Name</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={formData.name || ''} 
                                                onChange={handleChange} 
                                                disabled={!isEditing}
                                                className={`input-cyber w-full ${!isEditing && 'opacity-60 cursor-not-allowed border-none bg-transparent pl-0'}`} 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1 font-orbitron">Email Address</label>
                                            <input 
                                                type="email" 
                                                value={formData.email || ''} 
                                                disabled 
                                                className="input-cyber w-full opacity-60 cursor-not-allowed border-none bg-transparent pl-0" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-neonBlue font-orbitron text-lg border-b border-gray-700 pb-2">
                                        {user.role === 'developer' ? 'Academic Information' : 'Company Details'}
                                    </h3>

                                    {user.role === 'developer' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">College / University</label>
                                                <input 
                                                    type="text" 
                                                    name="college" 
                                                    value={formData.college || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "Enter your college name" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">Year of Study</label>
                                                <input 
                                                    type="text" 
                                                    name="yearOfStudy" 
                                                    value={formData.yearOfStudy || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "e.g. 3rd Year" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">Course / Degree</label>
                                                <input 
                                                    type="text" 
                                                    name="course" 
                                                    value={formData.course || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "e.g. B.Tech CS" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {user.role === 'company' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">Company Name</label>
                                                <input 
                                                    type="text" 
                                                    name="companyName" 
                                                    value={formData.companyName || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "Enter company name" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">Designation</label>
                                                <input 
                                                    type="text" 
                                                    name="designation" 
                                                    value={formData.designation || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "e.g. HR Manager" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1 font-orbitron">Working Since</label>
                                                <input 
                                                    type="text" 
                                                    name="workingSince" 
                                                    value={formData.workingSince || ''} 
                                                    onChange={handleChange} 
                                                    disabled={!isEditing}
                                                    placeholder={isEditing ? "e.g. 2020" : "Not specified"}
                                                    className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1 font-orbitron">Contact Number</label>
                                        <input 
                                            type="text" 
                                            name="contactNumber" 
                                            value={formData.contactNumber || ''} 
                                            onChange={handleChange} 
                                            disabled={!isEditing}
                                            placeholder={isEditing ? "+91..." : "Not specified"}
                                            className={`input-cyber w-full ${!isEditing && 'border-none bg-transparent pl-0'}`} 
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex space-x-4 pt-4">
                                        <button type="submit" className="flex-1 btn-cyber">Save Changes</button>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setFormData(user); 
                                                setIsEditing(false);
                                            }} 
                                            className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 transition-all font-orbitron text-sm uppercase tracking-wider"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
