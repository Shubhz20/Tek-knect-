const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store
const users = [];

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role, college, yearOfStudy, contactNumber, companyName } = req.body;

    try {
        let user = users.find(u => u.email === email);
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = {
            id: Date.now().toString(), // Simple ID generation
            name,
            email,
            password: hashedPassword,
            role,
            college,
            yearOfStudy,
            contactNumber,
            companyName,
            createdAt: new Date()
        };

        users.push(user);

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, role: user.role });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Role check removed to allow login by email only
        // if (user.role !== role) {
        //     return res.status(400).json({ msg: 'Invalid Role for this user' });
        // }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, role: user.role });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
 
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

 // Google Login
 router.post('/google-login', async (req, res) => {
     const { token } = req.body;
 
     try {
         // Verify the token
         const ticket = await client.verifyIdToken({
             idToken: token,
             audience: process.env.GOOGLE_CLIENT_ID,
         });
         const payload = ticket.getPayload();
         
         const { email, name, picture } = payload;
 
         let user = users.find(u => u.email === email);
 
         if (user) {
             // User exists, log them in
             const payload = {
                 user: {
                     id: user.id,
                     role: user.role
                 }
             };
 
             jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
                 if (err) throw err;
                 res.json({ token, role: user.role });
             });
         } else {
             // User doesn't exist, create proper new user
             
             // Check if email is corporate or generic
             const emailDomain = email.split('@')[1];
             const genericDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
             const isCorporate = !genericDomains.includes(emailDomain);
             
             const defaultRole = isCorporate ? 'company' : 'developer';
             const autoCompanyName = isCorporate ? emailDomain.split('.')[0] : ''; // Simple company name extraction

             // Create a random password since they used Google
             const randomPassword = Math.random().toString(36).slice(-8);
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(randomPassword, salt);
 
             user = {
                 id: Date.now().toString(),
                 name,
                 email,
                 password: hashedPassword,
                 role: defaultRole,
                 companyName: autoCompanyName, // Auto-fill company name if corporate
                 avatar: picture,
                 createdAt: new Date()
             };
 
             users.push(user);
 
             const payload = {
                 user: {
                     id: user.id,
                     role: user.role
                 }
             };
 
             jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
                 if (err) throw err;
                 res.json({ token, role: user.role });
             });
         }
 
     } catch (err) {
         console.error('Google Auth Error:', err.message);
         res.status(401).send('Google authentication failed');
     }
 });

 // Get Current User Profile
 const auth = require('../middleware/auth');
 router.get('/profile', auth, async (req, res) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 });

 // Update User Profile
 router.put('/profile', auth, async (req, res) => {
    const { name, college, yearOfStudy, course, contactNumber, companyName, designation, workingSince } = req.body;
    try {
        let userIndex = users.findIndex(u => u.id === req.user.id);
        if (userIndex === -1) return res.status(404).json({ msg: 'User not found' });

        // Update fields
        if (name) users[userIndex].name = name;
        if (college) users[userIndex].college = college;
        if (yearOfStudy) users[userIndex].yearOfStudy = yearOfStudy;
        if (course) users[userIndex].course = course;
        if (contactNumber) users[userIndex].contactNumber = contactNumber;
        if (companyName) users[userIndex].companyName = companyName;
        if (designation) users[userIndex].designation = designation;
        if (workingSince) users[userIndex].workingSince = workingSince;

        const { password, ...userWithoutPassword } = users[userIndex];
        res.json(userWithoutPassword);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
 });

module.exports = router;
