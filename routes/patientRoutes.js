const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Create patient (associated with doctor)
router.post('/', async (req, res) => {
  try {
    const { doctorId, ...patientData } = req.body;
    
    // Verify doctor exists using string doctorId
    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const patient = new Patient({
      ...patientData,
      doctorId: doctor.doctorId // Store the string doctorId
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all patients for a specific doctor (using string doctorId)
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    // First verify doctor exists
    const doctor = await Doctor.findOne({ doctorId: req.params.doctorId });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    const patients = await Patient.find({ doctorId: req.params.doctorId });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single patient
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update patient
router.patch('/:id', async (req, res) => {
  try {
    // If updating doctorId, verify the new doctor exists
    if (req.body.doctorId) {
      const doctor = await Doctor.findOne({ doctorId: req.body.doctorId });
      if (!doctor) {
        return res.status(404).json({ error: 'New doctor not found' });
      }
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;