// Learner App - Student Interface
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

// Placeholder components - these would be implemented based on your specific requirements
const LearnerDashboard = () => {
  const { t } = useLanguage()
  return (
    <div className="learner-dashboard">
      <h1>{t('student.dashboard')}</h1>
      <p>Welcome to your learning dashboard!</p>
      <div className="dashboard-grid">
        <div className="card">
          <h3>My Progress</h3>
          <p>Track your learning journey</p>
        </div>
        <div className="card">
          <h3>Lessons</h3>
          <p>Continue your lessons</p>
        </div>
        <div className="card">
          <h3>Badges</h3>
          <p>View your achievements</p>
        </div>
      </div>
    </div>
  )
}

const LearnerApp = ({ user, onLogout }) => {
  const { t } = useLanguage()

  return (
    <div className="learner-app">
      <header className="app-header">
        <h1>DigLearners - {t('role.learner')}</h1>
        <div className="user-info">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={onLogout} className="logout-btn">
            {t('nav.logout')}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LearnerDashboard />} />
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/lessons" element={<div>Lessons Page</div>} />
          <Route path="/progress" element={<div>Progress Page</div>} />
          <Route path="/badges" element={<div>Badges Page</div>} />
        </Routes>
      </main>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .learner-app {
          min-height: 100vh;
          background: #f8f9fa;
        }
        
        .app-header {
          background: #0ea5a4;
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
        
        .learner-dashboard h1 {
          color: #0ea5a4;
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
          border-left: 4px solid #0ea5a4;
        }
        
        .card h3 {
          color: #0ea5a4;
          margin-bottom: 1rem;
        }
        `
      }} />
    </div>
  )
}

export default LearnerApp
