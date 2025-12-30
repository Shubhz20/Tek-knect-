import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Network, Building2, Users, Calendar, ArrowRight, Zap } from 'lucide-react';
import harshitAgrawalImg from '../assets/images/harshit-agrawal.jpg';
import krishJainImg from '../assets/images/krish-jain.jpg';

const Home = () => {
    const founders = [
        { name: "Harshit Agrawal", role: "Co-Founder", img: harshitAgrawalImg },
        { name: "Krish Jain", role: "Co-Founder", img: krishJainImg }
    ];

    const features = [
        {
            icon: <Users className="w-8 h-8 text-neonBlue" />,
            title: "Curated Networking",
            description: "Connect with like-minded peers and industry veterans in a filtered, high-quality environment."
        },
        {
            icon: <Building2 className="w-8 h-8 text-neonBlue" />,
            title: "Company Excursions",
            description: "Step inside top tech companies. Experience their culture, meet their teams, and see how they build."
        },
        {
            icon: <Zap className="w-8 h-8 text-neonBlue" />,
            title: "Real Work Culture",
            description: "Bridge the gap between academic theory and professional reality through immersive sessions."
        },
        {
            icon: <Calendar className="w-8 h-8 text-neonBlue" />,
            title: "Offline Meet-ups",
            description: "Regular offline events, hackathons, and mixers to foster genuine human connections."
        }
    ];

    return (
        <div className="min-h-screen bg-darkBg text-white">
            <Navbar />
            <Hero />

            {/* Problem Section */}
            <section id="about" className="py-24 bg-cyberGray/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonBlue to-transparent opacity-50"></div>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-white">
                                THE <span className="text-neonBlue">DISCONNECT</span>
                            </h2>
                            <div className="space-y-6 text-gray-300 text-lg font-inter leading-relaxed">
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 min-w-[24px]"><ArrowRight className="text-neonBlue" /></div>
                                    <p>Students and young professionals often find themselves isolated, lacking meaningful opportunities to network with industry leaders.</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="mt-1 min-w-[24px]"><ArrowRight className="text-neonBlue" /></div>
                                    <p>Talent is everywhere, but access is not. Many struggle to engage with CXOs and founders or gain exposure to real-world work cultures.</p>
                                </div>
                                <div className="p-6 border border-neonBlue/30 bg-neonBlue/5 rounded-lg mt-8">
                                    <p className="text-white font-semibold text-xl">
                                        Tek'knect bridges this gap. We don't just host events; we build bridges to your future career through curated experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="absolute inset-0 bg-neonBlue blur-[100px] opacity-20"></div>
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="card-cyber h-40 flex items-center justify-center bg-black/50 backdrop-blur">
                                    <span className="font-orbitron text-2xl text-gray-500">ISOLATION</span>
                                </div>
                                <div className="card-cyber h-40 flex items-center justify-center bg-black/50 backdrop-blur mt-8">
                                    <span className="font-orbitron text-2xl text-gray-500">NO ACCESS</span>
                                </div>
                                <div className="card-cyber h-40 flex items-center justify-center bg-black/50 backdrop-blur -mt-8">
                                    <span className="font-orbitron text-2xl text-gray-500">THEORY ONLY</span>
                                </div>
                                <div className="card-cyber h-40 flex items-center justify-center bg-black/50 backdrop-blur">
                                    <span className="font-orbitron text-2xl text-gray-500">UNCERTAINTY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white">
                            PLATFORM <span className="text-neonBlue">FEATURES</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Everything you need to accelerate your career and build meaningful connections.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="card-cyber p-8 group hover:bg-cyberGray/80 transition-all duration-300"
                            >
                                <div className="mb-6 p-4 bg-darkBg rounded-full w-fit group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all duration-300 border border-gray-800 group-hover:border-neonBlue">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 font-orbitron text-white group-hover:text-neonBlue transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section id="founders" className="py-24 bg-cyberGray/30">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-white">
                        OUR <span className="text-neonBlue">FOUNDERS</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        {founders.map((founder, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="text-center w-64"
                            >
                                <div className="w-40 h-40 mx-auto rounded-full bg-gray-800 mb-6 overflow-hidden border-2 border-neonBlue shadow-[0_0_20px_rgba(0,243,255,0.2)] relative group">
                                    {founder.img ? (
                                        <img
                                            src={founder.img}
                                            alt={founder.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500 group-hover:bg-gray-600 transition-colors">
                                            <Users className="w-12 h-12 opacity-50" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold font-orbitron text-white mb-1">{founder.name}</h3>
                                <p className="text-neonBlue font-medium tracking-wide mb-2">{founder.role}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Newton School of Technology, Pune</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-800 bg-black text-center">
                <div className="mb-8">
                    <span className="text-2xl font-orbitron font-bold text-white tracking-wider">
                        TEK<span className="text-neonBlue">'</span>KNECT
                    </span>
                </div>
                <p className="text-gray-500 mb-6 font-inter">Contact us at <a href="mailto:tek'knect@gmail.com" className="text-neonBlue hover:underline">tek'knect@gmail.com</a></p>
                <p className="text-gray-700 text-sm font-inter">&copy; 2024 Tek'knect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
