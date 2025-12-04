import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'company') {
            navigate('/login');
            return;
        }

        // Fetch dashboard data
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/dashboard/company', {
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
                <h1 className="text-4xl font-orbitron font-bold mb-8 text-neonBlue">Company Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* CVs Received */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">CVs Received</h2>
                        <p className="text-gray-500">0 CVs</p>
                    </div>

                    {/* Accepted CVs */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Accepted CVs</h2>
                        <p className="text-gray-500">0 Accepted</p>
                    </div>

                    {/* Rejected CVs */}
                    <div className="card-cyber h-64 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold mb-4">Rejected CVs</h2>
                        <p className="text-gray-500">0 Rejected</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
