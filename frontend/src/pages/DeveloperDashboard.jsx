import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DeveloperDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'developer') {
            navigate('/login');
            return;
        }

        // Fetch dashboard data
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/dashboard/developer', {
                    headers: { 'x-auth-token': token }
                });
                const result = await res.json();
                if (res.ok) {
                    setData(result);
                } else {
                    console.error(result.msg);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-darkBg text-white">
            <Navbar />
            <div className="container mx-auto px-6 py-24">
                <h1 className="text-4xl font-orbitron font-bold mb-8 text-neonBlue">Developer Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Upcoming Events */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
                        <p className="text-gray-500">No upcoming events</p>
                    </div>

                    {/* Past Events */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Past Events</h2>
                        <p className="text-gray-500">No past events</p>
                    </div>

                    {/* Partner Companies */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Partner Companies</h2>
                        <p className="text-gray-500">No partners yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperDashboard;
