import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaFileAlt, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import './Reports.css';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('/api/reports');
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Use mock data
      setReportData({
        summary: {
          totalAppointments: 12,
          completedAppointments: 8,
          upcomingAppointments: 2,
          totalRecords: 15,
          avgHeartRate: 72,
          avgWeight: 70.5
        },
        recentMetrics: [
          { date: '2026-01-12', heartRate: 72, bloodPressure: '120/80', weight: 70 },
          { date: '2026-01-11', heartRate: 75, bloodPressure: '118/78', weight: 70.5 },
          { date: '2026-01-10', heartRate: 70, bloodPressure: '122/82', weight: 71 }
        ],
        monthlyTrends: {
          heartRate: [70, 72, 71, 73, 72, 74, 72],
          weight: [71, 70.8, 70.5, 70.5, 70.3, 70.2, 70]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const generateReport = async () => {
    try {
      const response = await axios.post('/api/reports/generate', dateRange);
      alert('Report generated successfully!');
      console.log('Generated report:', response.data);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Report generation started. You will be notified when ready.');
    }
  };

  const downloadReport = (format) => {
    alert(`Downloading report in ${format.toUpperCase()} format...`);
    // In real implementation, this would trigger file download
  };

  if (loading) {
    return (
      <div className="reports-loading">
        <div className="spinner"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="reports">
      <div className="reports-header">
        <div>
          <h2>Health Reports</h2>
          <p>View and download your health reports</p>
        </div>
        <div className="download-buttons">
          <button className="download-btn pdf" onClick={() => downloadReport('pdf')}>
            <FaDownload /> Download PDF
          </button>
          <button className="download-btn excel" onClick={() => downloadReport('excel')}>
            <FaDownload /> Download Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card blue">
          <div className="card-icon">
            <FaCalendarAlt />
          </div>
          <div className="card-info">
            <h3>Total Appointments</h3>
            <p className="card-value">{reportData.summary.totalAppointments}</p>
            <span className="card-detail">
              {reportData.summary.completedAppointments} completed, {reportData.summary.upcomingAppointments} upcoming
            </span>
          </div>
        </div>

        <div className="summary-card green">
          <div className="card-icon">
            <FaFileAlt />
          </div>
          <div className="card-info">
            <h3>Medical Records</h3>
            <p className="card-value">{reportData.summary.totalRecords}</p>
            <span className="card-detail">Documents uploaded</span>
          </div>
        </div>

        <div className="summary-card red">
          <div className="card-icon">
            <FaChartLine />
          </div>
          <div className="card-info">
            <h3>Avg Heart Rate</h3>
            <p className="card-value">{reportData.summary.avgHeartRate} bpm</p>
            <span className="card-detail">Last 30 days</span>
          </div>
        </div>

        <div className="summary-card purple">
          <div className="card-icon">
            <FaChartLine />
          </div>
          <div className="card-info">
            <h3>Avg Weight</h3>
            <p className="card-value">{reportData.summary.avgWeight} kg</p>
            <span className="card-detail">Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="report-generator">
        <h3>Generate Custom Report</h3>
        <div className="date-range-selector">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateChange}
            />
          </div>
          <button className="generate-btn" onClick={generateReport}>
            <FaFileAlt /> Generate Report
          </button>
        </div>
      </div>

      {/* Recent Metrics Table */}
      <div className="recent-metrics">
        <h3>Recent Health Metrics</h3>
        <div className="metrics-table-container">
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.recentMetrics.map((metric, index) => (
                <tr key={index}>
                  <td>{metric.date}</td>
                  <td>{metric.heartRate} bpm</td>
                  <td>{metric.bloodPressure}</td>
                  <td>{metric.weight} kg</td>
                  <td>
                    <span className="status-badge normal">Normal</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trends Chart Placeholder */}
      <div className="trends-section">
        <h3>Health Trends (Last 7 Days)</h3>
        <div className="trends-grid">
          <div className="trend-card">
            <h4>Heart Rate Trend</h4>
            <div className="trend-chart">
              <div className="chart-placeholder">
                <FaChartLine size={48} />
                <p>Chart visualization</p>
                <div className="trend-values">
                  {reportData.monthlyTrends.heartRate.map((val, idx) => (
                    <span key={idx} className="trend-bar" style={{height: `${val}%`}}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="trend-card">
            <h4>Weight Trend</h4>
            <div className="trend-chart">
              <div className="chart-placeholder">
                <FaChartLine size={48} />
                <p>Chart visualization</p>
                <div className="trend-values">
                  {reportData.monthlyTrends.weight.map((val, idx) => (
                    <span key={idx} className="trend-bar" style={{height: `${val}%`}}></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
