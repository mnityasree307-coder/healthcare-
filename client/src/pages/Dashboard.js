import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeartbeat, FaWeight, FaTint, FaThermometerHalf, FaAmbulance, FaMedkit } from 'react-icons/fa';
import BookAppointmentModal from '../components/BookAppointmentModal';
import AddHealthRecordModal from '../components/AddHealthRecordModal';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    weight: 70,
    temperature: 36.6
  });

  const [appointments, setAppointments] = useState([]);
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const [showAddHealthRecord, setShowAddHealthRecord] = useState(false);

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard');
        if (response.data) {
          setHealthData(response.data.healthData || healthData);
          setAppointments(response.data.appointments || []);
        }
      } catch (error) {
        console.log('Using mock data');
        // Mock upcoming appointments
        setAppointments([
          { id: 1, doctor: 'Dr. Smith', specialty: 'Cardiologist', date: '2026-01-15', time: '10:00 AM' },
          { id: 2, doctor: 'Dr. Johnson', specialty: 'General Physician', date: '2026-01-20', time: '2:30 PM' }
        ]);
      }
    };
    fetchData();
  }, []);

  const healthCards = [
    { icon: <FaHeartbeat />, title: 'Heart Rate', value: `${healthData.heartRate} bpm`, color: '#ef4444' },
    { icon: <FaTint />, title: 'Blood Pressure', value: healthData.bloodPressure, color: '#06b6d4' },
    { icon: <FaWeight />, title: 'Weight', value: `${healthData.weight} kg`, color: '#10b981' },
    { icon: <FaThermometerHalf />, title: 'Temperature', value: `${healthData.temperature}°C`, color: '#f59e0b' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome Back!</h2>
        <p>Here's your health overview</p>
      </div>

      {/* Emergency Quick Access */}
      <div className="emergency-quick-access">
        <button className="emergency-btn ambulance" onClick={() => navigate('/emergency')}>
          <FaAmbulance className="emergency-icon" />
          <div>
            <h4>Emergency</h4>
            <p>Book Ambulance</p>
          </div>
        </button>
        <button className="emergency-btn first-aid" onClick={() => navigate('/first-aid')}>
          <FaMedkit className="emergency-icon" />
          <div>
            <h4>First Aid</h4>
            <p>Get Immediate Help</p>
          </div>
        </button>
      </div>

      <div className="health-cards">
        {healthCards.map((card, index) => (
          <div key={index} className="health-card">
            <div className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p className="card-value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <h3>Upcoming Appointments</h3>
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{appointment.doctor}</h4>
                  <p>{appointment.specialty}</p>
                </div>
                <div className="appointment-time">
                  <p>{appointment.date}</p>
                  <p className="time">{appointment.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No upcoming appointments</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="action-button primary" onClick={() => setShowBookAppointment(true)}>
            Book Appointment
          </button>
          <button className="action-button secondary" onClick={() => setShowAddHealthRecord(true)}>
            Add Health Record
          </button>
          <button className="action-button secondary" onClick={() => navigate('/reports')}>
            View Reports
          </button>
        </div>
      </div>

      {/* Modals */}
      <BookAppointmentModal 
        isOpen={showBookAppointment}
        onClose={() => setShowBookAppointment(false)}
        onSuccess={(newAppointment) => {
          setAppointments([newAppointment, ...appointments]);
          alert('Appointment booked successfully!');
        }}
      />
      
      <AddHealthRecordModal 
        isOpen={showAddHealthRecord}
        onClose={() => setShowAddHealthRecord(false)}
        onSuccess={(newRecord) => {
          // Update health data if available
          if (newRecord.heartRate) setHealthData({...healthData, heartRate: newRecord.heartRate});
          alert('Health record added successfully!');
        }}
      />
    </div>
  );
};

export default Dashboard;
