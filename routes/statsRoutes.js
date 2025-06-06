// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.get('/doctor/:doctorId/stats', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const now = new Date();

    // Get active patient count
    const activeCount = await Patient.countDocuments({ doctorId });

    // Get next upcoming appointment (future appointments only)
    const nextPatient = await Patient.findOne({ 
      doctorId,
      nextAppointment: { $gte: now } // Only future appointments
    })
    .sort({ nextAppointment: 1 }) // Nearest first
    .select('name nextAppointment -_id'); // Only return name and appointment

    // Format response
    const response = {
      activeCount,
      nextAppointment: nextPatient ? {
        name: nextPatient.name,
        status: "Confirmed",
        day: nextPatient.nextAppointment.toLocaleDateString('en-US'),
        time: nextPatient.nextAppointment.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      } : null
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;