const express = require('express');
const router = express.Router();

// Mock data for dashboard
const mockData = {
  healthData: {
    heartRate: 72,
    bloodPressure: '120/80',
    weight: 70,
    temperature: 36.6
  },
  appointments: [
    { 
      id: 1, 
      doctor: 'Dr. Sarah Smith', 
      specialty: 'Cardiologist', 
      date: '2026-01-15', 
      time: '10:00 AM' 
    },
    { 
      id: 2, 
      doctor: 'Dr. Michael Johnson', 
      specialty: 'General Physician', 
      date: '2026-01-20', 
      time: '2:30 PM' 
    }
  ]
};

// GET dashboard data
router.get('/', (req, res) => {
  try {
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
