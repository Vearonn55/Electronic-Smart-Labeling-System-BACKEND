const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    try {
        const { UserName, Password, Role, Email } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            UserName,
            Password: hashedPassword,
            Role,
            Email
        });

        const token = jwt.sign(
            { UserID: newUser.UserID, Role: newUser.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token, user: newUser });
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { UserName, Password } = req.body;

        const user = await User.findOne({ where: { UserName } });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { UserID: user.UserID, Role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Login failed' });
    }
};

module.exports = {
    register,
    login
};
