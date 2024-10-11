const multer = require('multer');
const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
});

const createEmployee = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
        
        const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
        const f_Image = req.file ? req.file.filename : null;

        if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingEmployee = await Employee.findOne({ f_Email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newEmployee = new Employee({
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Image
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: error.message });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
        const f_Image = req.file ? req.file.filename : undefined;

        const updateData = {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course
        };

        if (f_Image) {
            updateData.f_Image = f_Image;
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            { f_Id: req.params.id }, 
            updateData, 
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ f_Id: req.params.id});
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ f_Id: req.params.id });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeById, upload };
