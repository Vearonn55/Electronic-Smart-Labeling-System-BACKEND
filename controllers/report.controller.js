const fs = require('fs');
const path = require('path');
const { Report, Sale, Alert, PriceChange, User, Product } = require('../models');
const { parse } = require('json2csv'); // Import json2csv
const PDFDocument = require('pdfkit'); // Import pdfkit

const generateReport = async (req, res) => {
    try {
        const { type } = req.body;
        const userId = req.user.UserID; // Get the user who generated the report

        // Check if type is valid
        const validReportTypes = ['Sales', 'Alerts', 'PriceChanges'];
        if (!validReportTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid report type' });
        }

        const timestamp = Date.now();
        const fileName = `${type}_report_${timestamp}.json`;
        const filePath = path.join(__dirname, '..', 'exports', fileName);

        let data;

        // Get data based on report type
        if (type === 'Sales') {
            data = await Sale.findAll({ include: Product });
        } else if (type === 'Alerts') {
            data = await Alert.findAll({ include: Product });
        } else if (type === 'PriceChanges') {
            data = await PriceChange.findAll({ include: [Product, User] });
        }

        // Write data to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // Create a report record in the database
        const report = await Report.create({
            GeneratedByUserID: userId,
            ReportType: type,
            GeneratedDateTime: new Date(),
                                           FilePath: `/exports/${fileName}`
        });

        res.status(201).json({ message: 'Report generated successfully', report, data });
    } catch (err) {
        console.error('Error generating report:', err);
        res.status(500).json({ message: 'Report generation failed', error: err.message });
    }
};

// Fetch all generated reports
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ include: User });
        res.json(reports);
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
    }
};

// Generate CSV report
const generateCSVReport = async (req, res) => {
    try {
        const { type } = req.body;
        let data;

        if (type === 'Sales') {
            data = await Sale.findAll({
                include: Product,
                raw: true,  // This returns plain objects instead of Sequelize instances
                nest: true  // This flattens the nested associations like Product inside Sale
            });
        } else {
            return res.status(400).json({ message: 'Invalid report type' });
        }

        // Convert JSON data to CSV format
        const csv = parse(data);

        const fileName = `${type}_report_${Date.now()}.csv`;
        const filePath = path.join(__dirname, '..', 'exports', fileName);

        // Write CSV file to disk
        fs.writeFileSync(filePath, csv);

        res.status(201).json({ message: 'CSV report generated', filePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Report generation failed' });
    }
};

// Generate PDF report
const generatePDFReport = async (req, res) => {
    try {
        const { type } = req.body;
        let data;

        if (type === 'Sales') {
            data = await Sale.findAll({
                include: Product,
                raw: true, // This ensures that Sequelize does not return instances but plain data
                nest: true // This will flatten the included data
            });
        } else {
            return res.status(400).json({ message: 'Invalid report type' });
        }

        const fileName = `${type}_report_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '..', 'exports', fileName);

        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(25).text(`Report: ${type}`, { align: 'center' });

        doc.fontSize(12).text('---------------------------------------');

        data.forEach((sale, index) => {
            doc.text(`${index + 1}. Product: ${sale.Product.Name}`);
            doc.text(`   Sale Date: ${sale.SaleDateTime}`);
            doc.text(`   Quantity: ${sale.Quantity}`);
            doc.text(`   Price: ${sale.Product.Price}`);
            doc.text('---------------------------------------');
        });

        doc.end();

        res.status(201).json({ message: 'PDF report generated', filePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Report generation failed' });
    }
};

module.exports = { generateReport, getAllReports, generateCSVReport, generatePDFReport };
