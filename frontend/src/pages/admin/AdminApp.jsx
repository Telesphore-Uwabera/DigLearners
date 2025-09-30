// Admin App - Administrator Interface
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const AdminDashboard = () => {
  const { t } = useLanguage()
  return (
    <div className="admin-dashboard">
      <h1>{t('admin.dashboard')}</h1>
      <p>Manage the entire platform</p>
      <div className="dashboard-grid">
        <div className="card">
          <h3>User Management</h3>
          <p>Manage all users and roles</p>
        </div>
        <div className="card">
          <h3>Content Management</h3>
          <p>Create and manage lessons</p>
        </div>
        <div className="card">
          <h3>Analytics</h3>
          <p>Platform-wide analytics</p>
        </div>
        <div className="card">
          <h3>System Settings</h3>
          <p>Configure platform settings</p>
        </div>
      </div>
    </div>
  )
}

const AdminApp = ({ user, onLogout }) => {
  const { t } = useLanguage()

  return (
    <div className="admin-app">
      <header className="app-header">
        <h1>DigLearners - {t('role.admin')}</h1>
        <div className="user-info">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={onLogout} className="logout-btn">
            {t('nav.logout')}
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<div>User Management Page</div>} />
          <Route path="/content" element={<div>Content Management Page</div>} />
          <Route path="/analytics" element={<div>Analytics Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </main>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .admin-app {
          min-height: 100vh;
          background: #f8f9fa;
        }
        
        .app-header {
          background: #dc2626;
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
        
        .admin-dashboard h1 {
          color: #dc2626;
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
          border-left: 4px solid #dc2626;
        }
        
        .card h3 {
          color: #dc2626;
          margin-bottom: 1rem;
        }
        `
      }} />
    </div>
  )
}

export default AdminApp
