const express = require('express');
const router = express.Router();

// Mock function to calculate averages
const calculateAverage = (arr) => {
  if (!arr.length) return 0;
  return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(1);
};

// GET reports data
router.get('/', (req, res) => {
  try {
    // Mock data for demonstration
    const mockHealthMetrics = [
      { heartRate: 72, weight: 70 },
      { heartRate: 75, weight: 70.5 },
      { heartRate: 70, weight: 71 },
      { heartRate: 73, weight: 70.8 },
      { heartRate: 72, weight: 70.5 }
    ];

    const heartRates = mockHealthMetrics.map(m => m.heartRate);
    const weights = mockHealthMetrics.map(m => m.weight);

    const reportData = {
      summary: {
        totalAppointments: 12,
        completedAppointments: 8,
        upcomingAppointments: 2,
        totalRecords: 15,
        avgHeartRate: Number(calculateAverage(heartRates)),
        avgWeight: Number(calculateAverage(weights))
      },
      recentMetrics: [
        { date: '2026-01-12', heartRate: 72, bloodPressure: '120/80', weight: 70 },
        { date: '2026-01-11', heartRate: 75, bloodPressure: '118/78', weight: 70.5 },
        { date: '2026-01-10', heartRate: 70, bloodPressure: '122/82', weight: 71 },
        { date: '2026-01-09', heartRate: 73, bloodPressure: '119/79', weight: 70.8 },
        { date: '2026-01-08', heartRate: 72, bloodPressure: '120/80', weight: 70.5 }
      ],
      monthlyTrends: {
        heartRate: [70, 72, 71, 73, 72, 74, 72],
        weight: [71, 70.8, 70.5, 70.5, 70.3, 70.2, 70]
      }
    };

    res.json(reportData);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// POST generate custom report
router.post('/generate', (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    // In a real application, this would:
    // 1. Query data from the specified date range
    // 2. Generate a PDF/Excel file
    // 3. Store it temporarily
    // 4. Return a download link

    const reportId = Date.now();
    
    res.json({
      success: true,
      message: 'Report generated successfully',
      reportId: reportId,
      downloadUrl: `/api/reports/download/${reportId}`,
      dateRange: { startDate, endDate }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// GET download report
router.get('/download/:reportId', (req, res) => {
  try {
    const { reportId } = req.params;
    
    // In a real application, this would stream the generated file
    res.json({
      message: 'Report download endpoint',
      reportId: reportId,
      note: 'In production, this would stream the actual file'
    });
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ error: 'Failed to download report' });
  }
});

module.exports = router;
