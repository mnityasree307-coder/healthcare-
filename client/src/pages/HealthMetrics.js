import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthMetrics.css';

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState([
    { id: 1, date: '2026-01-12', heartRate: 72, bloodPressure: '120/80', weight: 70, steps: 8500 },
    { id: 2, date: '2026-01-11', heartRate: 75, bloodPressure: '118/78', weight: 70.5, steps: 9200 },
    { id: 3, date: '2026-01-10', heartRate: 70, bloodPressure: '122/82', weight: 71, steps: 7800 },
    { id: 4, date: '2026-01-09', heartRate: 73, bloodPressure: '119/79', weight: 71, steps: 10200 },
  ]);

  const [newMetric, setNewMetric] = useState({
    heartRate: '',
    bloodPressure: '',
    weight: '',
    steps: ''
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('/api/health-metrics');
        if (response.data) {
          setMetrics(response.data);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };
    fetchMetrics();
  }, []);

  const handleInputChange = (e) => {
    setNewMetric({
      ...newMetric,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/health-metrics', {
        ...newMetric,
        date: new Date().toISOString().split('T')[0]
      });
      setMetrics([response.data, ...metrics]);
      setNewMetric({ heartRate: '', bloodPressure: '', weight: '', steps: '' });
    } catch (error) {
      // Mock add
      const newEntry = {
        id: metrics.length + 1,
        date: new Date().toISOString().split('T')[0],
        ...newMetric,
        heartRate: parseInt(newMetric.heartRate),
        weight: parseFloat(newMetric.weight),
        steps: parseInt(newMetric.steps)
      };
      setMetrics([newEntry, ...metrics]);
      setNewMetric({ heartRate: '', bloodPressure: '', weight: '', steps: '' });
    }
  };

  return (
    <div className="health-metrics">
      <div className="page-header">
        <h2>Health Metrics</h2>
        <p>Track and monitor your health data</p>
      </div>

      <div className="add-metric-form">
        <h3>Add New Metric</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Heart Rate (bpm)</label>
              <input
                type="number"
                name="heartRate"
                value={newMetric.heartRate}
                onChange={handleInputChange}
                placeholder="72"
                required
              />
            </div>
            <div className="form-group">
              <label>Blood Pressure</label>
              <input
                type="text"
                name="bloodPressure"
                value={newMetric.bloodPressure}
                onChange={handleInputChange}
                placeholder="120/80"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={newMetric.weight}
                onChange={handleInputChange}
                placeholder="70"
                required
              />
            </div>
            <div className="form-group">
              <label>Steps</label>
              <input
                type="number"
                name="steps"
                value={newMetric.steps}
                onChange={handleInputChange}
                placeholder="10000"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Add Metric</button>
        </form>
      </div>

      <div className="metrics-history">
        <h3>Metrics History</h3>
        <div className="metrics-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Weight</th>
                <th>Steps</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.id}>
                  <td>{metric.date}</td>
                  <td>{metric.heartRate} bpm</td>
                  <td>{metric.bloodPressure}</td>
                  <td>{metric.weight} kg</td>
                  <td>{metric.steps.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;
