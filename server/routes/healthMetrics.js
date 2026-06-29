const express = require('express');
const router = express.Router();

// Mock data storage
let healthMetrics = [
  { id: 1, date: '2026-01-12', heartRate: 72, bloodPressure: '120/80', weight: 70, steps: 8500 },
  { id: 2, date: '2026-01-11', heartRate: 75, bloodPressure: '118/78', weight: 70.5, steps: 9200 },
  { id: 3, date: '2026-01-10', heartRate: 70, bloodPressure: '122/82', weight: 71, steps: 7800 },
  { id: 4, date: '2026-01-09', heartRate: 73, bloodPressure: '119/79', weight: 71, steps: 10200 }
];

// GET all health metrics
router.get('/', (req, res) => {
  try {
    res.json(healthMetrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health metrics' });
  }
});

// POST new health metric
router.post('/', (req, res) => {
  try {
    const newMetric = {
      id: healthMetrics.length + 1,
      ...req.body
    };
    healthMetrics.unshift(newMetric);
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add health metric' });
  }
});

// DELETE health metric
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    healthMetrics = healthMetrics.filter(metric => metric.id !== id);
    res.json({ message: 'Metric deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete metric' });
  }
});

module.exports = router;
