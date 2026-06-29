import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileUpload, FaDownload, FaEye } from 'react-icons/fa';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const [records, setRecords] = useState([
    { id: 1, title: 'Blood Test Results', type: 'Lab Report', date: '2026-01-10', doctor: 'Dr. Smith', size: '2.5 MB' },
    { id: 2, title: 'X-Ray Chest', type: 'Imaging', date: '2026-01-05', doctor: 'Dr. Johnson', size: '5.1 MB' },
    { id: 3, title: 'Prescription', type: 'Prescription', date: '2025-12-28', doctor: 'Dr. Davis', size: '1.2 MB' },
    { id: 4, title: 'Medical History', type: 'Report', date: '2025-12-15', doctor: 'Dr. Wilson', size: '3.8 MB' },
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    type: '',
    doctor: '',
    file: null
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/api/medical-records');
        if (response.data) {
          setRecords(response.data);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setUploadData({
      ...uploadData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('type', uploadData.type);
    formData.append('doctor', uploadData.doctor);
    formData.append('file', uploadData.file);

    try {
      const response = await axios.post('/api/medical-records', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setRecords([response.data, ...records]);
    } catch (error) {
      // Mock add
      const newRecord = {
        id: records.length + 1,
        title: uploadData.title,
        type: uploadData.type,
        date: new Date().toISOString().split('T')[0],
        doctor: uploadData.doctor,
        size: uploadData.file ? `${(uploadData.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB'
      };
      setRecords([newRecord, ...records]);
    }
    setUploadData({ title: '', type: '', doctor: '', file: null });
    setShowUpload(false);
  };

  const handleDownload = (id) => {
    console.log(`Downloading record ${id}`);
    // In real app, this would trigger file download
  };

  const handleView = (id) => {
    console.log(`Viewing record ${id}`);
    // In real app, this would open file viewer
  };

  const getTypeClass = (type) => {
    const typeMap = {
      'Lab Report': 'type-lab',
      'Imaging': 'type-imaging',
      'Prescription': 'type-prescription',
      'Report': 'type-report'
    };
    return typeMap[type] || 'type-default';
  };

  return (
    <div className="medical-records">
      <div className="page-header">
        <div>
          <h2>Medical Records</h2>
          <p>View and manage your medical documents</p>
        </div>
        <button className="upload-button" onClick={() => setShowUpload(!showUpload)}>
          <FaFileUpload /> Upload Record
        </button>
      </div>

      {showUpload && (
        <div className="upload-form">
          <h3>Upload New Record</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Document Title</label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.title}
                  onChange={handleInputChange}
                  placeholder="Blood Test Results"
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={uploadData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Report">Report</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="doctor"
                value={uploadData.doctor}
                onChange={handleInputChange}
                placeholder="Dr. John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label>Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Upload</button>
              <button type="button" className="cancel-button" onClick={() => setShowUpload(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="records-grid">
        {records.map((record) => (
          <div key={record.id} className="record-card">
            <div className="record-header">
              <span className={`record-type ${getTypeClass(record.type)}`}>
                {record.type}
              </span>
              <span className="record-size">{record.size}</span>
            </div>
            <div className="record-body">
              <h4>{record.title}</h4>
              <div className="record-info">
                <p className="record-doctor">{record.doctor}</p>
                <p className="record-date">{record.date}</p>
              </div>
            </div>
            <div className="record-actions">
              <button className="action-btn view-btn" onClick={() => handleView(record.id)}>
                <FaEye /> View
              </button>
              <button className="action-btn download-btn" onClick={() => handleDownload(record.id)}>
                <FaDownload /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
