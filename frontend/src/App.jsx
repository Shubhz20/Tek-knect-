import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterDeveloper from './pages/RegisterDeveloper';
import RegisterCompany from './pages/RegisterCompany';
import DeveloperDashboard from './pages/DeveloperDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/developer" element={<RegisterDeveloper />} />
                <Route path="/register/company" element={<RegisterCompany />} />
                <Route path="/dashboard/developer" element={<DeveloperDashboard />} />
                <Route path="/dashboard/company" element={<CompanyDashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
