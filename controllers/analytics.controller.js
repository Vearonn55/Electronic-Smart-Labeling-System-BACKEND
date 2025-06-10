const db = require('../models');
const { Op, fn, col, Sequelize } = require('sequelize');
const PDFDocument = require('pdfkit');
const Sale = db.Sale;


// 1. Price History
const getPriceHistory = async (req, res) => {
    const { productId } = req.params;
    const { startDate, endDate } = req.query;

    try {
        const results = await Sale.findAll({
            where: {
                ProductID: productId,
                SaleDateTime: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            attributes: ['SaleDateTime', 'Quantity'], // No price in Sale, only quantity
            order: [['SaleDateTime', 'ASC']]
        });

        const formatted = results.map(r => ({
            date: r.SaleDateTime,
            quantity: r.Quantity
        }));

        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching price history', error: err.message });
    }
};

// 2. Sales Trends
const getSalesTrends = async (req, res) => {
    const { productId } = req.params;
    const { startDate, endDate } = req.query;

    try {
        const trends = await Sale.findAll({
            where: {
                ProductID: productId,
                SaleDateTime: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            attributes: [
                [fn('DATE', col('SaleDateTime')), 'date'],
                                          [fn('SUM', col('Quantity')), 'totalSold']
            ],
            group: [fn('DATE', col('SaleDateTime'))],
                                          order: [[fn('DATE', col('SaleDateTime')), 'ASC']]
        });

        res.status(200).json(trends);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sales trends', error: err.message });
    }
};

// 3. Download Report


const downloadReport = async (req, res) => {
    const { productId } = req.params;
    const { startDate, endDate } = req.query;

    try {
        const sales = await Sale.findAll({
            where: {
                ProductID: productId,
                SaleDateTime: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            attributes: ['SaleDateTime', 'Quantity'],
            order: [['SaleDateTime', 'ASC']]
        });

        const filename = `sales-report-${productId}-${Date.now()}.pdf`;

        // Set headers before writing
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        const doc = new PDFDocument({ bufferPages: true });
        doc.pipe(res);

        // Title
        doc.fontSize(20).text(`Sales Report`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Product ID: ${productId}`, { align: 'left' });
        doc.text(`Period: ${startDate} to ${endDate}`);
        doc.moveDown();

        // Table Header
        doc.font('Helvetica-Bold').text('Date', 100, doc.y, { continued: true });
        doc.text('Quantity', 300);
        doc.font('Helvetica');

        sales.forEach(sale => {
            doc.text(sale.SaleDateTime.toISOString().split('T')[0], 100, doc.y, { continued: true });
            doc.text(`${sale.Quantity}`, 300);
        });

        doc.end();
    } catch (err) {
        console.error('PDF generation error:', err);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error generating PDF', error: err.message });
        }
    }
};

module.exports = { downloadReport };

module.exports = {
    getPriceHistory,
    getSalesTrends,
    downloadReport
};
