const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['developer', 'company'],
        required: true
    },
    // Developer specific fields
    college: {
        type: String
    },
    yearOfStudy: {
        type: String
    },
    contactNumber: {
        type: String
    },
    // Company specific fields
    companyName: {
        type: String
    },
    // Common fields
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
