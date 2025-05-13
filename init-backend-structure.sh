#!/bin/bash

echo "Creating Smart Label Backend structure..."

# Create folders
mkdir -p config controllers middleware models routes tests utils

# Create core files
touch .env .gitignore server.js README.md package.json

# Config
echo "// DB config goes here" > config/db.js

# Middleware
echo "// JWT auth middleware goes here" > middleware/auth.middleware.js

# Models
echo "// Sequelize init and associations" > models/index.js
echo "// User model definition" > models/user.model.js
echo "// Product model definition" > models/product.model.js

# Controllers
echo "// Auth controller logic" > controllers/auth.controller.js
echo "// Product controller logic" > controllers/product.controller.js

# Routes
echo "// Auth routes" > routes/auth.routes.js
echo "// Product routes" > routes/product.routes.js

# Utils
echo "// Helper to generate JWT token" > utils/generateToken.js

# Tests
echo "// API tests go here" > tests/api.test.js

# .gitignore content
echo -e "node_modules/\n.env" > .gitignore

echo "✅ Project structure created!"
