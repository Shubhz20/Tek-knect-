import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';

const AuthForm = ({ title, type, onSubmit, children, onGoogleSuccess, onGoogleError }) => {
    return (
        <div className="min-h-screen bg-darkBg flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8 bg-cyberGray/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.2)]"
            >
                <h2 className="text-3xl font-orbitron font-bold text-center mb-8 text-white tracking-wider">
                    {title}
                </h2>

                <form onSubmit={onSubmit} className="space-y-6">
                    {children}

                    <button type="submit" className="w-full btn-cyber mt-4">
                        {type === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>
 
                 {onGoogleSuccess && (
                     <div className="mt-6">
                         <div className="relative mb-6">
                             <div className="absolute inset-0 flex items-center">
                                 <div className="w-full border-t border-gray-600"></div>
                             </div>
                             <div className="relative flex justify-center text-sm">
                                 <span className="px-2 bg-cyberGray text-gray-400">Or continue with</span>
                             </div>
                         </div>
                         <div className="flex justify-center">
                             <GoogleLogin
                                 onSuccess={onGoogleSuccess}
                                 onError={onGoogleError}
                                 theme="filled_black"
                                 shape="pill"
                                 width="100%"
                             />
                         </div>
                     </div>
                 )}

                <div className="mt-6 text-center text-gray-400 text-sm">
                    {type === 'login' ? (
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register/developer" className="text-neonBlue hover:underline">Join as Developer</Link>
                            {' '}or{' '}
                            <Link to="/register/company" className="text-neonBlue hover:underline">Company</Link>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-neonBlue hover:underline">Login here</Link>
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthForm;
