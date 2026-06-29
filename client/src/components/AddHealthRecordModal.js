import React, { useState } from 'react';
import axios from 'axios';
import './AddHealthRecordModal.css';

const AddHealthRecordModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    heartRate: '',
    bloodPressure: '',
    weight: '',
    temperature: '',
    steps: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        heartRate: formData.heartRate ? Number.parseInt(formData.heartRate) : null,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        temperature: formData.temperature ? Number.parseFloat(formData.temperature) : null,
        steps: formData.steps ? Number.parseInt(formData.steps) : null
      };

      const response = await axios.post('/api/health-metrics', dataToSend);
      if (onSuccess) {
        onSuccess(response.data);
      }
      setFormData({ heartRate: '', bloodPressure: '', weight: '', temperature: '', steps: '', notes: '' });
      onClose();
    } catch (error) {
      console.error('Error adding health record:', error);
      alert('Failed to add health record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Health Record</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="heartRate">Heart Rate (bpm)</label>
                <input
                  type="number"
                  id="heartRate"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  placeholder="72"
                  min="40"
                  max="200"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bloodPressure">Blood Pressure</label>
                <input
                  type="text"
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  placeholder="120/80"
                  pattern="[0-9]{2,3}/[0-9]{2,3}"
                />
                <small>Format: 120/80</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="70.5"
                  step="0.1"
                  min="20"
                  max="300"
                />
              </div>

              <div className="form-group">
                <label htmlFor="temperature">Temperature (°C)</label>
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder="36.6"
                  step="0.1"
                  min="35"
                  max="42"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="steps">Steps</label>
              <input
                type="number"
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleInputChange}
                placeholder="10000"
                min="0"
                max="100000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes about your health today..."
                rows="3"
              />
            </div>

            <p className="form-note">
              <strong>Note:</strong> Fill in at least one health metric. All fields are optional.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;
