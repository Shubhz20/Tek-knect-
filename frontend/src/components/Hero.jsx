import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-darkBg/80 to-darkBg"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-orbitron font-bold mb-6 tracking-tighter"
                >
                    BRIDGE THE <span className="text-neonBlue animate-pulse-slow">GAP</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-inter"
                >
                    Connect with industry leaders, join exclusive excursions, and experience real work culture.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
                >
                    {localStorage.getItem('token') ? (
                        <Link 
                            to={localStorage.getItem('role') === 'developer' ? '/dashboard/developer' : '/dashboard/company'} 
                            className="btn-cyber"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register/developer" className="btn-cyber">
                                Join as Developer
                            </Link>
                            <Link to="/register/company" className="px-6 py-3 border border-gray-600 text-gray-300 font-orbitron font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300">
                                Join as Company
                            </Link>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
