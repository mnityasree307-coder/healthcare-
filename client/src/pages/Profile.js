import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '123 Health Street, Medical City',
    emergencyContact: '+1 234-567-8901',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'None'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        if (response.data) {
          setProfile(response.data);
          setEditedProfile(response.data);
        }
      } catch (error) {
        console.log('Using mock data');
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/profile', editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      // Mock save
      setProfile(editedProfile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <h2>My Profile</h2>
          <p>Manage your personal and medical information</p>
        </div>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            <div className="info-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            <div className="info-item">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedProfile.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>
            <div className="info-item">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editedProfile.dateOfBirth}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.dateOfBirth}</p>
              )}
            </div>
            <div className="info-item">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={editedProfile.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{profile.gender}</p>
              )}
            </div>
            <div className="info-item">
              <label>Blood Group</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodGroup"
                  value={editedProfile.bloodGroup}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.bloodGroup}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item full-width">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editedProfile.address}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.address}</p>
              )}
            </div>
            <div className="info-item">
              <label>Emergency Contact</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="emergencyContact"
                  value={editedProfile.emergencyContact}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.emergencyContact}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Medical Information</h3>
          <div className="info-grid">
            <div className="info-item full-width">
              <label>Allergies</label>
              {isEditing ? (
                <input
                  type="text"
                  name="allergies"
                  value={editedProfile.allergies}
                  onChange={handleInputChange}
                  placeholder="List any allergies"
                />
              ) : (
                <p>{profile.allergies}</p>
              )}
            </div>
            <div className="info-item full-width">
              <label>Chronic Conditions</label>
              {isEditing ? (
                <input
                  type="text"
                  name="chronicConditions"
                  value={editedProfile.chronicConditions}
                  onChange={handleInputChange}
                  placeholder="List any chronic conditions"
                />
              ) : (
                <p>{profile.chronicConditions}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
