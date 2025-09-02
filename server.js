const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { syncDB } = require('./models');
const { db } = require('./models');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware

/** 1) CORS: allow absolutely everything in dev */
app.use(cors()); // default = allow all origins, headers, methods

/** 2) Force-allow every preflight before any routes */
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // Minimal headers so the browser is happy
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.sendStatus(204); // never 404 on preflight
  }
  next();
});


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
const esltagRoutes = require('./routes/esltag.routes'); // ✅ ADD THIS

// Mount routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/eslstatus', eslStatusRoutes);
app.use('/api/esltag', esltagRoutes); // ✅ ADD THIS
// Export folder
app.use('/exports', express.static('exports'));

// Connect and sync DB
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('MySQL connected successfully');

        await syncDB();
        console.log('All models synchronized successfully');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect or sync database:', err);
    }
};

startServer();
