const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const companyRoutes = require('./routes/companyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1', companyRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'MongoDB CRUD API is running', endpoints: '/api/v1/query-1 to /api/v1/query-12' });
});

module.exports = app;
