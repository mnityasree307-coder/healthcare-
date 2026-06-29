import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>HealthCare+</h1>
      </div>
      <div className="navbar-actions">
        <button className="icon-button">
          <FaBell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div 
          className="user-profile" 
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <FaUserCircle size={32} />
          <span>{user?.name || 'User'}</span>
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-item user-info">
                <strong>{user?.name || 'User'}</strong>
                <small>{user?.email}</small>
              </div>
              <div className="user-menu-divider"></div>
              <button className="user-menu-item logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
