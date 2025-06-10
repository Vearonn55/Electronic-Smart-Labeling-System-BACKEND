const { ESLStatus, ESLTag } = require('../models');

// POST /api/eslstatus
const postStatusUpdate = async (req, res) => {
    try {
        const { ESLTagID, Status, BatteryLevel } = req.body;

        const tag = await ESLTag.findByPk(ESLTagID);
        if (!tag) {
            return res.status(404).json({ message: 'ESL Tag not found' });
        }

        const newStatus = await ESLStatus.create({
            ESLTagID,
            Status,
            BatteryLevel,
            Timestamp: new Date(),
        });

        res.status(201).json({ message: 'Status update recorded', newStatus });
    } catch (err) {
        console.error('Error updating ESL status:', err);
        res.status(500).json({ message: 'Failed to update status' });
    }
};

// GET /api/eslstatus/:id
const getLatestStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const latest = await ESLStatus.findOne({
            where: { ESLTagID: id },
            order: [['Timestamp', 'DESC']],
        });

        if (!latest) {
            return res.status(404).json({ message: 'No status record found' });
        }

        res.json(latest);
    } catch (err) {
        console.error('Error fetching ESL status:', err);
        res.status(500).json({ message: 'Failed to fetch status' });
    }
};

module.exports = {
    postStatusUpdate,
    getLatestStatus,
};
