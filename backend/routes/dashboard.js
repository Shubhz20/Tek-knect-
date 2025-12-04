const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// Developer Dashboard Data
router.get('/developer', auth, async (req, res) => {
    try {
        if (req.user.role !== 'developer') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        // Placeholder data
        const data = {
            upcomingEvents: [],
            pastEvents: [],
            partnerCompanies: []
        };
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Company Dashboard Data
router.get('/company', auth, async (req, res) => {
    try {
        if (req.user.role !== 'company') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        // Placeholder data
        const data = {
            cvsReceived: [],
            acceptedCVs: [],
            rejectedCVs: []
        };
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
