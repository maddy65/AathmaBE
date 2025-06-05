const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, password, doctorId } = req.body;
    const doctor = new Doctor({ name, password, doctorId });
    await doctor.save();
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { doctorId, password } = req.body;
    const doctor = await Doctor.findOne({ doctorId, password });
    
    if (!doctor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful',
      doctor: {
        name: doctor.name,
        doctorId: doctor.doctorId
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;