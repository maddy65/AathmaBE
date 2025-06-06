const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  issues: { 
    type: [String], 
    enum: [
      'Anxiety', 
      'Sleeplessness', 
      'Lack of concentration', 
      'Stress', 
      'Lack of Focus', 
      'Motivation', 
      'Work Stress', 
      'Shopping Addiction'
    ] 
  },
  note: { type: String },
  meditationPreferences: { type: String },
  schedule: { type: String },
  nextAppointment: { type: Date },
  selfHelpRoutines: { 
    type: [String],
    enum: [
      'Sleep Therapy',
      'Meditation Routine',
      'Working Session',
      'Custom Plan'
    ]
  },
  doctorId: { 
    type: String,
    ref: 'Doctor',
    required: true 
  }
}, { timestamps: true });

patientSchema.index({ doctorId: 1, nextAppointment: 1 });

module.exports = mongoose.model('Patient', patientSchema);