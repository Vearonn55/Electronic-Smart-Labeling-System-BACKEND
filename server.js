const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncDB } = require('./models');
const { db } = require('./models');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes');
const alertRoutes = require('./routes/alert.routes');
const reportRoutes = require('./routes/report.routes');
const eslStatusRoutes = require('./routes/eslstatus.routes');
const analyticsRoutes = require('./routes/analytics.routes');

// Mount routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/eslstatus', eslStatusRoutes);
app.use('/api/analytics', analyticsRoutes);

// Export folder
app.use('/exports', express.static('exports'));

// Connect and sync DB
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('MySQL connected successfully');

        await syncDB();
        console.log('All models synchronized successfully');

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect or sync database:', err);
    }
};

startServer();
