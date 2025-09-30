// Teacher App - Teacher Interface
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const TeacherDashboard = () => {
  const { t } = useLanguage()
  return (
    <div className="teacher-dashboard">
      <h1>{t('teacher.dashboard')}</h1>
      <p>Manage your classes and students</p>
      <div className="dashboard-grid">
        <div className="card">
          <h3>My Classes</h3>
          <p>Manage your learning classes</p>
        </div>
        <div className="card">
          <h3>Students</h3>
          <p>View student progress</p>
        </div>
        <div className="card">
          <h3>Lessons</h3>
          <p>Create and assign lessons</p>
        </div>
        <div className="card">
          <h3>Analytics</h3>
          <p>View class performance</p>
        </div>
      </div>
    </div>
  )
}

const TeacherApp = ({ user, onLogout }) => {
  const { t } = useLanguage()

  return (
    <div className="teacher-app">
      <header className="app-header">
        <h1>DigLearners - {t('role.teacher')}</h1>
        <div className="user-info">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={onLogout} className="logout-btn">
            {t('nav.logout')}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<TeacherDashboard />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/classes" element={<div>Classes Page</div>} />
          <Route path="/students" element={<div>Students Page</div>} />
          <Route path="/lessons" element={<div>Lessons Page</div>} />
          <Route path="/analytics" element={<div>Analytics Page</div>} />
        </Routes>
      </main>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .teacher-app {
          min-height: 100vh;
          background: #f8f9fa;
        }
        
        .app-header {
          background: #059669;
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
        
        .teacher-dashboard h1 {
          color: #059669;
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
          border-left: 4px solid #059669;
        }
        
        .card h3 {
          color: #059669;
          margin-bottom: 1rem;
        }
        `
      }} />
    </div>
  )
}

export default TeacherApp
