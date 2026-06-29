import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaHeartbeat, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaChartBar,
  FaAmbulance,
  FaMedkit,
  FaUser 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/health-metrics', icon: <FaHeartbeat />, label: 'Health Metrics' },
    { path: '/appointments', icon: <FaCalendarAlt />, label: 'Appointments' },
    { path: '/medical-records', icon: <FaFileAlt />, label: 'Medical Records' },
    { path: '/reports', icon: <FaChartBar />, label: 'Reports' },
    { path: '/emergency', icon: <FaAmbulance />, label: 'Emergency', highlight: true },
    { path: '/first-aid', icon: <FaMedkit />, label: 'First Aid' },
    { path: '/profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
