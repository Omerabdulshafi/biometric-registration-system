const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/biometric_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models
const User = require('./models/User');
const Refugee = require('./models/Refugee');

// Authentication Middleware
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'operator'
        });
        
        await user.save();
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Refugee CRUD Operations
app.post('/api/refugees', authenticate, async (req, res) => {
    try {
        const refugee = new Refugee({
            ...req.body,
            registeredBy: req.user.userId
        });
        
        await refugee.save();
        res.status(201).json(refugee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/refugees', authenticate, async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;
        const query = {};
        
        if (search) {
            query.$or = [
                { registrationNumber: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
                { nationalID: { $regex: search, $options: 'i' } }
            ];
        }
        
        const refugees = await Refugee.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        
        const total = await Refugee.countDocuments(query);
        
        res.json({
            refugees,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/refugees/:id', authenticate, async (req, res) => {
    try {
        const refugee = await Refugee.findById(req.params.id);
        if (!refugee) {
            return res.status(404).json({ error: 'Refugee not found' });
        }
        res.json(refugee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/refugees/:id', authenticate, async (req, res) => {
    try {
        const refugee = await Refugee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!refugee) {
            return res.status(404).json({ error: 'Refugee not found' });
        }
        res.json(refugee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Biometric search endpoints
app.post('/api/refugees/search/fingerprint', authenticate, async (req, res) => {
    try {
        const { fingerprintData } = req.body;
        // In a real system, you would use fingerprint matching algorithm
        const refugee = await Refugee.findOne({
            'biometrics.fingerprintData': fingerprintData
        });
        res.json({ found: !!refugee, refugee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/refugees/search/iris', authenticate, async (req, res) => {
    try {
        const { irisData } = req.body;
        // In a real system, you would use iris matching algorithm
        const refugee = await Refugee.findOne({
            'biometrics.irisData': irisData
        });
        res.json({ found: !!refugee, refugee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});