Smart Label System - Backend Documentation 

1. Project Overview 

This backend powers the Smart Label System, managing: 

• User accounts and authentication 

• Product and category management 

• Price update tracking and history 

• Regulatory alert generation 

• Sales recording 

• Report generation and export 

• QR Code Generation for each product 

 

Backend Stack 

• Runtime: Node.js 

• Framework: Express.js 

• ORM: Sequelize 

• Database: MySQL 

• Auth: JWT-based authentication 

 

2. API Modules Overview 

 

2.1 Authentication Module 

Path: /api/auth 

• POST /register: Register a new user (Status: ✅ Implemented) 

• POST /login: Authenticate user and return JWT token (Status: ✅ Implemented) 

 

Roles: 

• Admin 

• Staff 

• Regulatory 

 

Token Usage: 

• Header: Authorization: Bearer <token> 

 

Middleware: 

• authenticate: Validates JWT token (Status: ✅ Implemented) 

• authorize([roles]): Restricts access to specific user roles (Status: ✅ Implemented) 

 

2.2 Product Management Module 

Path: /api/products 

• POST /: Add a new product (Admin, Staff) (Status: ✅ Implemented) 

• GET /: Retrieve all products (Authenticated) (Status: ✅ Implemented) 

• PUT /:id/price: Update a product’s price and log the change (Admin, Staff) (Status: ✅ Implemented) 

 

Product Fields: 

• Name 

• Description 

• NutritionalFacts 

• CategoryID 

• Price 

• ExpiryDate 

• StockQuantity 

• QRCode (Newly added, automatically generated on product creation) 

 

Price Update Logging: 

• Triggers a new record in PriceChanges 

• Tracks OldPrice, NewPrice, ChangedByUserID, ChangeDateTime (Status: ✅ Implemented) 

 

2.3 Category Management Module 

Path: /api/categories 

• POST /: Create a new category (Admin only) (Status: ✅ Implemented) 

• GET /: List all categories (Authenticated users) (Status: ✅ Implemented) 

 

Controller: category.controller.js 

• createCategory: Create a new category (Status: ✅ Implemented) 

• getAllCategories: Retrieve all categories (Status: ✅ Implemented) 

 

Routes: category.routes.js 

• Uses authenticate and authorize([‘Admin’]) middleware (Status: ✅ Implemented) 

 

2.4 Price Change Tracking Module 

• Status: ✅ Implemented 

• Purpose: Logs every product price update 

• Data stored in PriceChanges table 

• Enables rollback, audits, and historical pricing reports 

 

2.5 Regulatory Alert System 

• Status: ✅ Implemented 

• Automatically creates alerts when product price exceeds category’s max allowed price 

• Related Tables: RegulatoryLimits, Alerts 

• Endpoint: 

• GET /api/alerts: List all alerts (Admin, Regulatory) (Status: ✅ Implemented) 

• Optional query: ?status=Pending (Status: ✅ Implemented) 

 

2.6 Sales Logging Module 

• Status: ✅ Implemented 

• Purpose: Record each sale of a product for stock management and sales reports 

• Endpoint: 

• POST /api/sales: Log a sale (Admin, Staff) (Status: ✅ Implemented) 

• GET /api/sales: List sales history (Authenticated) (Status: ✅ Implemented) 

 

2.7 Report Generation Module 

• Status: ✅ Implemented 

• Purpose: Export reports for: 

• Pricing history 

• Compliance checks 

• Sales trends 

• Fields: 

• ReportType 

• GeneratedByUserID 

• GeneratedDateTime 

• FilePath 

• Endpoint: 

• POST /api/reports: Generate a new report (Admin only) (Status: ✅ Implemented) 

• GET /api/reports: Retrieve all reports (Authenticated) (Status: ✅ Implemented) 

 

CSV Report Generation: 

• Converts JSON data to CSV format 

• Endpoint: POST /api/reports/csv (Status: ✅ Implemented) 

 

PDF Report Generation: 

• Converts sales data to a PDF file 

• Endpoint: POST /api/reports/pdf (Status: ✅ Implemented) 

 

QR Code Generation for Products: 

• Each product will have a unique QR code generated on creation 

• The QR code will be stored in the QRCode field of the Products table. 

• QR codes are generated using the qrcode library 

 

3. Sequelize Models Summary 

Users 

• UserID 

• UserName 

• Password 

• Email 

• Role 

Products 

• ProductID 

• Name 

• Description 

• NutritionalFacts 

• CategoryID 

• Price 

• ExpiryDate 

• StockQuantity 

• QRCode 

PriceChanges 

• ChangeID 

• ProductID 

• OldPrice 

• NewPrice 

• ChangeDateTime 

• ChangedByUserID 

RegulatoryLimits 

• LimitID 

• ProductCategoryID 

• MaxPrice 

• RegulationDate 

• Alerts 

• AlertID 

• ProductID 

• AlertType 

• AlertDateTime 

• Status 

Sales 

• SaleID 

• ProductID 

• Quantity 

• SaleDateTime 

Reports 

• ReportID 

• GeneratedByUserID 

• ReportType 

• GeneratedDateTime 

• FilePath 

 

4. Environment Configuration (.env) 

PORT=5050 
DB_HOST=localhost 
DB_USER=smartuser 
DB_PASSWORD=smartpassword 
DB_NAME=smart_label_db 
JWT_SECRET=smartlabelsecret 

 

 

5. Project Commands 

• Start dev server: npm run dev 

• Start production server: npm run start 

• Access MySQL: mysql -u root -p 

• Get fresh auth token: 

curl -X POST http://localhost:5050/api/auth/login \ 
-H "Content-Type: application/json" \ 
-d '{"UserName": "admin", "Password": "admin123"}' 

 

 

6. Next Development Goals 

• Implement more granular role-based access control for users. 

• Expand sales tracking with customer information. 

• Optimize database queries for large datasets. 

• Integrate with external systems (e.g., inventory management or POS systems). 

 

Maintained by: Backend Developer - Smart Label System 

 

Documentation updated: April 10, 2025 

 stay up to date : https://doguakdeniz-my.sharepoint.com/:w:/r/personal/21000155_emu_edu_tr/_layouts/15/Doc.aspx?sourcedoc=%7B89BA29FE-AB2D-439A-BDFE-846FAC5CA996%7D&file=Smart_Label_Backend_Documentation_v2.docx&action=default&mobileredirect=true&DefaultItemOpen=1&ct=1744322411504&wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&cid=3640b863-b119-4caf-8f0f-a0a0d0f3fbac&wdPreviousSessionSrc=HarmonyWeb&wdPreviousSession=55c2f8af-7228-4df3-abe7-6d9f37f51df9
