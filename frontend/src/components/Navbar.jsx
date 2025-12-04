import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-orbitron font-bold text-white tracking-wider">
                    TEK<span className="text-neonBlue">'</span>KNECT
                </Link>
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-gray-300 hover:text-neonBlue transition-colors font-inter text-sm uppercase tracking-wide">Home</Link>
                    <a href="#about" className="text-gray-300 hover:text-neonBlue transition-colors font-inter text-sm uppercase tracking-wide">About</a>
                    <a href="#features" className="text-gray-300 hover:text-neonBlue transition-colors font-inter text-sm uppercase tracking-wide">Features</a>
                    <a href="#founders" className="text-gray-300 hover:text-neonBlue transition-colors font-inter text-sm uppercase tracking-wide">Founders</a>
                    <div className="flex space-x-4">
                        <Link to="/login" className="px-4 py-2 border border-neonBlue text-neonBlue font-orbitron text-sm hover:bg-neonBlue hover:text-black transition-all duration-300">
                            Login
                        </Link>
                        <Link to="/register/developer" className="px-4 py-2 bg-neonBlue text-black font-orbitron text-sm hover:bg-white transition-all duration-300">
                            Join
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
