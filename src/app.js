const express = require('express');
const cors = require('cors');
const path = require('path')
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', employeeRoutes);
app.use('/api', authRoutes);

module.exports = app;
