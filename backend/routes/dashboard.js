const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const nodemailer = require('nodemailer');

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



// Join Meeting & Send Email
router.post('/join-meeting', auth, async (req, res) => {
    const { meetingTitle } = req.body;
    
    // Hardcoded meeting links for now
    const meetingLinks = {
        "Introduction to System Design": "https://meet.google.com/abc-defg-hij",
        "GSoC 2025 Kickoff": "https://meet.google.com/xyz-uvwx-yz",
        "ICPC Strategy Session": "https://meet.google.com/lmn-opqr-stu"
    };

    const meetingLink = meetingLinks[meetingTitle] || "https://meet.google.com/default-link";

    try {
       
        
        const userEmail = req.body.userEmail;

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
             console.log(`[Mock Email] To: ${userEmail}, Subject: Meeting Link for ${meetingTitle}, Link: ${meetingLink}`);
             return res.json({ msg: 'Email sent (Mock mode - Check server logs)' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Meeting Link: ${meetingTitle} - Tek'knect`,
            text: `Hello,\n\nYou have successfully registered for "${meetingTitle}".\n\nSee you there! Here is the meeting link: ${meetingLink}\n\nBest regards,\nTeam Tek'knect`
        };

        await transporter.sendMail(mailOptions);
        res.json({ msg: 'Meeting link sent to your email!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error sending email');
    }
});

module.exports = router;

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
