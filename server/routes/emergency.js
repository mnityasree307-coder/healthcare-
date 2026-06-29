const express = require('express');
const router = express.Router();

// Mock data storage for ambulance bookings
let ambulanceBookings = [];

// POST book ambulance
router.post('/ambulance', (req, res) => {
  try {
    const {
      patientName,
      phoneNumber,
      address,
      landmark,
      emergencyType,
      description,
      coordinates
    } = req.body;

    // Generate booking
    const booking = {
      bookingId: 'EMG' + Date.now(),
      patientName,
      phoneNumber,
      address,
      landmark,
      emergencyType,
      description,
      coordinates,
      status: 'confirmed',
      estimatedTime: '10-15 minutes',
      createdAt: new Date().toISOString(),
      ambulanceDetails: {
        number: 'AMB-' + Math.floor(Math.random() * 1000),
        driver: 'John Driver',
        driverPhone: '+1-234-567-8901'
      }
    };

    ambulanceBookings.push(booking);

    // In a real application, this would:
    // 1. Find nearest available ambulance
    // 2. Calculate ETA
    // 3. Send notifications to ambulance crew
    // 4. Send SMS/notification to patient
    // 5. Start real-time tracking

    res.status(201).json({
      success: true,
      message: 'Ambulance booked successfully',
      bookingId: booking.bookingId,
      estimatedTime: booking.estimatedTime,
      ambulanceDetails: booking.ambulanceDetails,
      trackingUrl: `/api/emergency/track/${booking.bookingId}`
    });
  } catch (error) {
    console.error('Error booking ambulance:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to book ambulance' 
    });
  }
});

// GET all emergency bookings
router.get('/bookings', (req, res) => {
  try {
    res.json(ambulanceBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// GET specific booking details
router.get('/track/:bookingId', (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = ambulanceBookings.find(b => b.bookingId === bookingId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // In a real application, this would return live GPS coordinates
    const tracking = {
      ...booking,
      ambulanceLocation: {
        lat: booking.coordinates.lat + 0.01,
        lng: booking.coordinates.lng + 0.01
      },
      eta: '8 minutes',
      status: 'on_the_way'
    };

    res.json(tracking);
  } catch (error) {
    console.error('Error tracking ambulance:', error);
    res.status(500).json({ error: 'Failed to track ambulance' });
  }
});

// PUT update booking status
router.put('/bookings/:bookingId', (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    const index = ambulanceBookings.findIndex(b => b.bookingId === bookingId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    ambulanceBookings[index].status = status;
    ambulanceBookings[index].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      booking: ambulanceBookings[index]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// POST log emergency call
router.post('/log', (req, res) => {
  try {
    const { emergencyType, contactNumber, notes } = req.body;
    
    const log = {
      id: Date.now(),
      emergencyType,
      contactNumber,
      notes,
      timestamp: new Date().toISOString()
    };

    // In a real application, this would be stored in database
    console.log('Emergency call logged:', log);

    res.json({
      success: true,
      message: 'Emergency call logged',
      logId: log.id
    });
  } catch (error) {
    console.error('Error logging emergency:', error);
    res.status(500).json({ error: 'Failed to log emergency' });
  }
});

module.exports = router;
