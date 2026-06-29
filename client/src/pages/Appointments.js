import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', date: '2026-01-15', time: '10:00 AM', status: 'confirmed' },
    { id: 2, doctor: 'Dr. Michael Johnson', specialty: 'General Physician', date: '2026-01-20', time: '2:30 PM', status: 'pending' },
    { id: 3, doctor: 'Dr. Emily Davis', specialty: 'Dermatologist', date: '2026-01-25', time: '11:00 AM', status: 'confirmed' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        if (response.data) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };
    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/appointments', formData);
      setAppointments([...appointments, response.data]);
    } catch (error) {
      // Mock add
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        status: 'pending'
      };
      setAppointments([...appointments, newAppointment]);
    }
    setFormData({ doctor: '', specialty: '', date: '', time: '', notes: '' });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setAppointments(appointments.filter(apt => apt.id !== id));
    } catch (error) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const getStatusClass = (status) => {
    return status === 'confirmed' ? 'status-confirmed' : 'status-pending';
  };

  return (
    <div className="appointments">
      <div className="page-header">
        <div>
          <h2>Appointments</h2>
          <p>Manage your medical appointments</p>
        </div>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          <FaCalendarPlus /> New Appointment
        </button>
      </div>

      {showForm && (
        <div className="appointment-form">
          <h3>Book New Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  placeholder="Dr. John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  placeholder="Cardiologist"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes..."
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Book Appointment</button>
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-content">
              <div className="appointment-doctor">
                <h4>{appointment.doctor}</h4>
                <p>{appointment.specialty}</p>
              </div>
              <div className="appointment-details">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span>{appointment.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="detail-item">
                  <span className={`status ${getStatusClass(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="appointment-actions">
              <button className="icon-btn edit-btn">
                <FaEdit />
              </button>
              <button className="icon-btn delete-btn" onClick={() => handleDelete(appointment.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
