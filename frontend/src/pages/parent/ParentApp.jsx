// Parent App - Parent Interface
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const ParentDashboard = () => {
  const { t } = useLanguage()
  return (
    <div className="parent-dashboard">
      <h1>{t('parent.dashboard')}</h1>
      <p>Monitor your child's learning progress</p>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Child Progress</h3>
          <p>View detailed learning progress</p>
        </div>
        <div className="card">
          <h3>Achievements</h3>
          <p>See badges and accomplishments</p>
        </div>
        <div className="card">
          <h3>Time Spent</h3>
          <p>Track learning time</p>
        </div>
        <div className="card">
          <h3>Reports</h3>
          <p>Weekly and monthly reports</p>
        </div>
      </div>
    </div>
  )
}

const ParentApp = ({ user, onLogout }) => {
  const { t } = useLanguage()

  return (
    <div className="parent-app">
      <header className="app-header">
        <h1>DigLearners - {t('role.parent')}</h1>
        <div className="user-info">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={onLogout} className="logout-btn">
            {t('nav.logout')}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ParentDashboard />} />
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/progress" element={<div>Progress Page</div>} />
          <Route path="/achievements" element={<div>Achievements Page</div>} />
          <Route path="/reports" element={<div>Reports Page</div>} />
        </Routes>
      </main>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .parent-app {
          min-height: 100vh;
          background: #f8f9fa;
        }
        
        .app-header {
          background: #7c3aed;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .app-main {
          padding: 2rem;
        }
        
        .parent-dashboard h1 {
          color: #7c3aed;
          margin-bottom: 2rem;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #7c3aed;
        }
        
        .card h3 {
          color: #7c3aed;
          margin-bottom: 1rem;
        }
        `
      }} />
    </div>
  )
}

export default ParentApp
