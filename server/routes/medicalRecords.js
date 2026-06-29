const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Mock data storage
let medicalRecords = [
  { 
    id: 1, 
    title: 'Blood Test Results', 
    type: 'Lab Report', 
    date: '2026-01-10', 
    doctor: 'Dr. Smith', 
    size: '2.5 MB',
    fileName: 'blood-test.pdf'
  },
  { 
    id: 2, 
    title: 'X-Ray Chest', 
    type: 'Imaging', 
    date: '2026-01-05', 
    doctor: 'Dr. Johnson', 
    size: '5.1 MB',
    fileName: 'xray-chest.pdf'
  },
  { 
    id: 3, 
    title: 'Prescription', 
    type: 'Prescription', 
    date: '2025-12-28', 
    doctor: 'Dr. Davis', 
    size: '1.2 MB',
    fileName: 'prescription.pdf'
  },
  { 
    id: 4, 
    title: 'Medical History', 
    type: 'Report', 
    date: '2025-12-15', 
    doctor: 'Dr. Wilson', 
    size: '3.8 MB',
    fileName: 'medical-history.pdf'
  }
];

// GET all medical records
router.get('/', (req, res) => {
  try {
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medical records' });
  }
});

// POST new medical record with file upload
router.post('/', upload.single('file'), (req, res) => {
  try {
    const newRecord = {
      id: medicalRecords.length + 1,
      title: req.body.title,
      type: req.body.type,
      doctor: req.body.doctor,
      date: new Date().toISOString().split('T')[0],
      fileName: req.file ? req.file.filename : 'unknown',
      size: req.file ? `${(req.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB'
    };
    medicalRecords.unshift(newRecord);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload medical record' });
  }
});

// DELETE medical record
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    medicalRecords = medicalRecords.filter(record => record.id !== id);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

module.exports = router;
