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

                <div className="space-y-12">
                    {/* New Applications */}
                    <section>
                        <h2 className="text-2xl font-orbitron font-bold mb-6 text-white flex items-center">
                            <span className="w-2 h-8 bg-neonBlue mr-4 rounded-sm"></span>
                            NEW <span className="text-neonBlue ml-2">APPLICATIONS</span>
                        </h2>
                        <div className="card-cyber p-6 min-h-[200px] flex items-center justify-center">
                            <p className="text-gray-500 font-inter">No new applications received yet.</p>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* In Review */}
                        <section>
                            <h2 className="text-2xl font-orbitron font-bold mb-6 text-white flex items-center">
                                <span className="w-2 h-8 bg-yellow-500 mr-4 rounded-sm"></span>
                                IN <span className="text-yellow-500 ml-2">REVIEW</span>
                            </h2>
                            <div className="card-cyber p-6 h-full min-h-[200px] flex items-center justify-center">
                                <p className="text-gray-500 font-inter">No applications in review.</p>
                            </div>
                        </section>

                        {/* Rejected */}
                        <section>
                            <h2 className="text-2xl font-orbitron font-bold mb-6 text-white flex items-center">
                                <span className="w-2 h-8 bg-red-500 mr-4 rounded-sm"></span>
                                REJECTED <span className="text-red-500 ml-2">APPLICATIONS</span>
                            </h2>
                            <div className="card-cyber p-6 h-full min-h-[200px] flex items-center justify-center">
                                <p className="text-gray-500 font-inter">No rejected applications.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
