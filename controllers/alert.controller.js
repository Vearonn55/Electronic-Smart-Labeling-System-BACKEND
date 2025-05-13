const { Alert } = require('../models');

// Create a new alert
const createAlert = async (req, res) => {
    try {
        // Ensure that AlertDateTime is set to current date and time
        const alertData = {
            ...req.body,            // Spread the request body data
            AlertDateTime: req.body.AlertDateTime || new Date()  // Use provided AlertDateTime or set to current date
        };

        const alert = await Alert.create(alertData);
        res.status(201).json({ message: 'Alert created', alert });
    } catch (err) {
        console.error('Error during alert creation:', err);
        res.status(500).json({ message: 'Failed to create alert' });
    }
};

// Get all alerts
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.findAll();
        res.json(alerts);
    } catch (err) {
        console.error('Error fetching alerts:', err);
        res.status(500).json({ message: 'Failed to retrieve alerts' });
    }
};

module.exports = {
    createAlert,
    getAllAlerts
};
