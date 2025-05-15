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

// alert pending -> resolved
const resolveAlert = async (req, res) => {
    try {
        const { id } = req.params; // Alert ID from the request parameter

        // Find the alert by ID
        const alert = await Alert.findByPk(id);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        // Check if the current status is 'Pending'
        if (alert.Status === 'Resolved') {
            return res.status(400).json({ message: 'Alert is already resolved' });
        }

        // Update the status to 'Resolved'
        alert.Status = 'Resolved';
        await alert.save();

        res.status(200).json({ message: 'Alert status updated to resolved', alert });
    } catch (err) {
        console.error('Error resolving alert:', err);
        res.status(500).json({ message: 'Failed to resolve alert' });
    }
};

module.exports = {
    createAlert,
    getAllAlerts,
    resolveAlert,
};
