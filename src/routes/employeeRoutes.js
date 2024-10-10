const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeById, upload } = require('../controllers/employeeController');
const router = express.Router();

router.post('/employees', upload.single('f_Image'), createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
