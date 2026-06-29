const express = require('express');
const router = express.Router();

// Mock data storage
let appointments = [
  { 
    id: 1, 
    doctor: 'Dr. Sarah Smith', 
    specialty: 'Cardiologist', 
    date: '2026-01-15', 
    time: '10:00 AM', 
    status: 'confirmed' 
  },
  { 
    id: 2, 
    doctor: 'Dr. Michael Johnson', 
    specialty: 'General Physician', 
    date: '2026-01-20', 
    time: '2:30 PM', 
    status: 'pending' 
  },
  { 
    id: 3, 
    doctor: 'Dr. Emily Davis', 
    specialty: 'Dermatologist', 
    date: '2026-01-25', 
    time: '11:00 AM', 
    status: 'confirmed' 
  }
];

// GET all appointments
router.get('/', (req, res) => {
  try {
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST new appointment
router.post('/', (req, res) => {
  try {
    const newAppointment = {
      id: appointments.length + 1,
      ...req.body,
      status: 'pending'
    };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// PUT update appointment
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...req.body };
      res.json(appointments[index]);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE appointment
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    appointments = appointments.filter(apt => apt.id !== id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router;
