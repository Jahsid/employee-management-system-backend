const User = require('../models/User');

// User Login
const loginUser = async (req, res) => {
    const { f_userName, f_Pwd } = req.body;
    try {
        const user = await User.findOne({ f_userName, f_Pwd });
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginUser };
