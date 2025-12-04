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
    const { email, password, role } = req.body;

    try {
        let user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check role match
        if (user.role !== role) {
            return res.status(400).json({ msg: 'Invalid Role for this user' });
        }

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

module.exports = router;
