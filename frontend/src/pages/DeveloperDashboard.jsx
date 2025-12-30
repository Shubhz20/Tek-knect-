import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import newtonLogo from '../assets/images/newton-school-logo.png';
import spidronLogo from '../assets/images/spidron-tech-logo.png';
import forbesLogo from '../assets/images/forbes-marshall-logo.png';

const DeveloperDashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [joinedMeetings, setJoinedMeetings] = useState([]);
    const [data, setData] = useState(null);

    const meetings = [
        {
            id: 1,
            title: "Introduction to System Design",
            description: "Join us for a deep dive into scalable system architectures with industry experts.",
            date: "Dec 15, 2024",
            time: "10:00 AM IST"
        },
        {
            id: 2,
            title: "GSoC 2025 Kickoff",
            description: "Get started with Google Summer of Code! Tips, proposal writing, and mentor interactions.",
            date: "Jan 10, 2025",
            time: "6:00 PM IST"
        },
        {
            id: 3,
            title: "ICPC Strategy Session",
            description: "Master competitive programming algorithms and team strategies for ICPC regionals.",
            date: "Jan 20, 2025",
            time: "8:00 PM IST"
        }
    ];

    const handleJoinMeeting = async (meeting) => {
        if (!userEmail) {
            alert("User email not found. Please try refreshing.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/dashboard/join-meeting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    meetingTitle: meeting.title,
                    userEmail: userEmail
                })
            });

            if (res.ok) {
                setJoinedMeetings([...joinedMeetings, meeting.id]);
                alert(`Successfully registered for ${meeting.title}. Check your email for the link!`);
            } else {
                alert('Failed to join meeting. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Server error.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'developer') {
            navigate('/login');
            return;
        }

        // Fetch dashboard data & user profile for email
        const fetchData = async () => {
            try {
                // Get User Email
                const profileRes = await fetch('/api/auth/profile', {
                    headers: { 'x-auth-token': token }
                });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setUserEmail(profile.email);
                }

                // Get Dashboard Data
                const res = await fetch('/api/dashboard/developer', {
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

                <div className="space-y-12">
                    {/* Upcoming Meetings */}
                    <section>
                        <h2 className="text-2xl font-orbitron font-bold mb-6 text-white flex items-center">
                            <span className="w-2 h-8 bg-neonBlue mr-4 rounded-sm"></span>
                            UPCOMING <span className="text-neonBlue ml-2">MEETINGS</span>
                        </h2>
                        <div className="space-y-6">
                            {meetings.map((meeting) => (
                                <div key={meeting.id} className="card-cyber p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-cyberGray/80 transition-all duration-300">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neonBlue transition-colors">
                                            {meeting.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">
                                            {meeting.description}
                                        </p>
                                        <div className="flex items-center gap-6 text-sm text-gray-500">
                                            <span className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-neonBlue"></div>
                                                {meeting.date}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-neonBlue"></div>
                                                {meeting.time}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleJoinMeeting(meeting)}
                                        disabled={joinedMeetings.includes(meeting.id)}
                                        className={`px-8 py-3 whitespace-nowrap transition-all duration-300 ${
                                            joinedMeetings.includes(meeting.id)
                                            ? 'bg-green-500/10 border border-green-500 text-green-500 cursor-default rounded' 
                                            : 'btn-cyber'
                                        }`}
                                    >
                                        {joinedMeetings.includes(meeting.id) ? 'Scheduled! Check Email' : 'Join Meeting'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Partner Companies */}
                    <section>
                        <h2 className="text-2xl font-orbitron font-bold mb-6 text-white flex items-center">
                            <span className="w-2 h-8 bg-neonBlue mr-4 rounded-sm"></span>
                            PARTNER <span className="text-neonBlue ml-2">COMPANIES</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Newton School */}
                            <div className="card-cyber p-6 flex flex-col items-center text-center group hover:bg-cyberGray/80 transition-all duration-300">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-2 border-neonBlue/30 group-hover:scale-110 transition-transform p-4">
                                    <img 
                                        src={newtonLogo} 
                                        alt="Newton School" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Newton School</h3>
                                <p className="text-neonBlue text-sm mb-4">Bengaluru</p>
                                <p className="text-gray-400 text-sm mb-6">
                                    Transforming tech education with industry-relevant curriculum.
                                </p>
                                <a 
                                    href="https://www.newtonschool.co/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full btn-cyber text-sm py-2 inline-block"
                                >
                                    View Details
                                </a>
                            </div>

                            {/* Spidron Tech */}
                            <div className="card-cyber p-6 flex flex-col items-center text-center group hover:bg-cyberGray/80 transition-all duration-300">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-2 border-neonBlue/30 group-hover:scale-110 transition-transform p-4">
                                    <img 
                                        src={spidronLogo} 
                                        alt="Spidron Tech" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Spidron Tech</h3>
                                <p className="text-neonBlue text-sm mb-4">Pune</p>
                                <p className="text-gray-400 text-sm mb-6">
                                    Innovative solutions for modern digital challenges.
                                </p>
                                <a 
                                    href="https://spidrontech.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full btn-cyber text-sm py-2 inline-block"
                                >
                                    View Details
                                </a>
                            </div>

                            {/* Forbes Marshall */}
                            <div className="card-cyber p-6 flex flex-col items-center text-center group hover:bg-cyberGray/80 transition-all duration-300">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden border-2 border-neonBlue/30 group-hover:scale-110 transition-transform p-4">
                                    <img 
                                        src={forbesLogo} 
                                        alt="Forbes Marshall" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Forbes Marshall</h3>
                                <p className="text-neonBlue text-sm mb-4">Pune</p>
                                <p className="text-gray-400 text-sm mb-6">
                                    Leading energy conservation and automation solutions.
                                </p>
                                <a 
                                    href="https://www.forbesmarshall.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full btn-cyber text-sm py-2 inline-block"
                                >
                                    View Details
                                </a>
                            </div>
                            
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DeveloperDashboard;
