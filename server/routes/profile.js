const express = require('express');
const router = express.Router();

// Mock user profile data
let userProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 234-567-8900',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  bloodGroup: 'O+',
  address: '123 Health Street, Medical City',
  emergencyContact: '+1 234-567-8901',
  allergies: 'Penicillin, Peanuts',
  chronicConditions: 'None'
};

// GET user profile
router.get('/', (req, res) => {
  try {
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT update user profile
router.put('/', (req, res) => {
  try {
    userProfile = { ...userProfile, ...req.body };
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
