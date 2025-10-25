import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LearnerLayout.css';

const LearnerLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="learner-layout">
      {/* Simple top bar for kids */}
      <header className="learner-header">
        <div className="header-left">
          <h1 className="app-title">🎮 DigLearners</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">👦 {user?.fullName?.split(' ')[0] || 'Student'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="learner-main">
        {children}
      </main>
    </div>
  );
};

export default LearnerLayout;
