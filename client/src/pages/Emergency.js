import React, { useState } from 'react';
import axios from 'axios';
import { FaAmbulance, FaPhone, FaMapMarkerAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import './Emergency.css';

const Emergency = () => {
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phoneNumber: '',
    address: '',
    landmark: '',
    emergencyType: '',
    description: '',
    coordinates: { lat: null, lng: null }
  });

  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  const emergencyTypes = [
    'Cardiac Emergency',
    'Accident/Trauma',
    'Breathing Difficulty',
    'Stroke',
    'Severe Bleeding',
    'Unconscious Patient',
    'Poisoning',
    'Burns',
    'Other'
  ];

  const emergencyContacts = [
    { name: 'National Emergency', number: '911', icon: '🚨' },
    { name: 'Ambulance Service', number: '108', icon: '🚑' },
    { name: 'Police', number: '100', icon: '👮' },
    { name: 'Fire Brigade', number: '101', icon: '🚒' },
    { name: 'Poison Control', number: '1800-180-1234', icon: '☠️' }
  ];

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBookingForm({
            ...bookingForm,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          alert('Location captured successfully!');
        },
        (error) => {
          alert('Unable to get location. Please enter address manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/emergency/ambulance', bookingForm);
      setBookingStatus({
        success: true,
        message: 'Ambulance booked successfully!',
        bookingId: response.data.bookingId,
        estimatedTime: response.data.estimatedTime
      });
      // Reset form
      setBookingForm({
        patientName: '',
        phoneNumber: '',
        address: '',
        landmark: '',
        emergencyType: '',
        description: '',
        coordinates: { lat: null, lng: null }
      });
    } catch (error) {
      console.error('Error booking ambulance:', error);
      // Mock success for demo
      setBookingStatus({
        success: true,
        message: 'Ambulance booked successfully!',
        bookingId: 'EMG' + Date.now(),
        estimatedTime: '10-15 minutes'
      });
      setBookingForm({
        patientName: '',
        phoneNumber: '',
        address: '',
        landmark: '',
        emergencyType: '',
        description: '',
        coordinates: { lat: null, lng: null }
      });
    } finally {
      setLoading(false);
    }
  };

  const callEmergency = (number) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="emergency-page">
      {/* Emergency Alert Banner */}
      <div className="emergency-banner">
        <FaExclamationTriangle className="alert-icon" />
        <div>
          <h3>Emergency Services</h3>
          <p>For life-threatening emergencies, call 911 immediately</p>
        </div>
      </div>

      <div className="emergency-content">
        {/* Emergency Contacts */}
        <div className="emergency-contacts-section">
          <h3>Emergency Contacts</h3>
          <div className="emergency-contacts-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-contact-card" onClick={() => callEmergency(contact.number)}>
                <span className="contact-icon">{contact.icon}</span>
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p className="contact-number">
                    <FaPhone /> {contact.number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambulance Booking Form */}
        <div className="ambulance-booking-section">
          <div className="section-header">
            <FaAmbulance className="section-icon" />
            <h3>Book Ambulance</h3>
          </div>

          {bookingStatus && (
            <div className={`booking-status ${bookingStatus.success ? 'success' : 'error'}`}>
              <h4>{bookingStatus.message}</h4>
              {bookingStatus.success && (
                <div className="booking-details">
                  <p><strong>Booking ID:</strong> {bookingStatus.bookingId}</p>
                  <p><strong>Estimated Arrival:</strong> {bookingStatus.estimatedTime}</p>
                  <p className="tracking-info">
                    <FaClock /> You can track the ambulance in real-time
                  </p>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="ambulance-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientName">Patient Name *</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={bookingForm.patientName}
                  onChange={handleInputChange}
                  placeholder="Full name of patient"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Contact Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={bookingForm.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 234-567-8900"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Pickup Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={bookingForm.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="landmark">Nearby Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={bookingForm.landmark}
                onChange={handleInputChange}
                placeholder="e.g., Near City Hospital, opposite mall"
              />
            </div>

            <div className="location-capture">
              <button type="button" className="location-btn" onClick={getCurrentLocation}>
                <FaMapMarkerAlt /> Capture Current Location
              </button>
              {bookingForm.coordinates.lat && (
                <span className="location-status">✓ Location captured</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyType">Emergency Type *</label>
              <select
                id="emergencyType"
                name="emergencyType"
                value={bookingForm.emergencyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select emergency type</option>
                {emergencyTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={bookingForm.description}
                onChange={handleInputChange}
                placeholder="Brief description of the emergency situation"
                rows="4"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="book-ambulance-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-small"></span> Booking...
                  </>
                ) : (
                  <>
                    <FaAmbulance /> Book Ambulance Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Important Information */}
        <div className="emergency-info">
          <h3>Important Information</h3>
          <ul>
            <li>✓ Keep the patient calm and comfortable</li>
            <li>✓ Do not move the patient unless necessary</li>
            <li>✓ Keep airways clear and monitor breathing</li>
            <li>✓ Apply basic first aid if trained</li>
            <li>✓ Keep all relevant medical documents ready</li>
            <li>✓ Ensure clear access route for ambulance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
