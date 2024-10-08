const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', employeeRoutes);
app.use('/api', authRoutes);

module.exports = app;
