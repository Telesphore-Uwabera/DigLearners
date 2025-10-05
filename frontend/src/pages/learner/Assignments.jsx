import React, { useState } from 'react'
import { useTranslation } from '../../lib/language'
import { mockAssignments, getAssignmentsByStatus, formatDate, formatTimeAgo } from '../../services/mockDataService'
import '../../components/CodePlayStyles.css'
import '../../components/DashboardStyles.css'

export default function Assignments() {
  const { t } = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [assignments] = useState(mockAssignments)

  const statusFilters = [
    { id: 'all', name: 'All Assignments', icon: '📋', color: '#1976D2' },
    { id: 'assigned', name: 'Assigned', icon: '📝', color: '#FF9800' },
    { id: 'in_progress', name: 'In Progress', icon: '🔄', color: '#2196F3' },
    { id: 'completed', name: 'Completed', icon: '✅', color: '#4CAF50' }
  ]

  const getFilteredAssignments = () => {
    if (selectedStatus === 'all') {
      return assignments
    }
    return getAssignmentsByStatus(selectedStatus)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return '#FF9800'
      case 'in_progress': return '#2196F3'
      case 'completed': return '#4CAF50'
      default: return '#9E9E9E'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'assigned': return '📝'
      case 'in_progress': return '🔄'
      case 'completed': return '✅'
      default: return '❓'
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isOverdue = (dueDate) => {
    return getDaysUntilDue(dueDate) < 0
  }

  const isDueSoon = (dueDate) => {
    const days = getDaysUntilDue(dueDate)
    return days >= 0 && days <= 3
  }

  const filteredAssignments = getFilteredAssignments()

  return (
    <div className="assignments-page">
      {/* CodePlay-style header */}
      <div className="lesson-header codeplay-header">
        <div className="header-left">
          <h1 className="codeplay-title">CodePlay</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="avatar">📋</div>
            <span className="user-name">My Assignments</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lesson-content">
        {/* Assignment Stats */}
        <div className="assignment-stats">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <div className="stat-value">{assignments.length}</div>
              <div className="stat-label">Total Assignments</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <div className="stat-value">
                {getAssignmentsByStatus('in_progress').length}
              </div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">
                {getAssignmentsByStatus('completed').length}
              </div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">
                {assignments.reduce((sum, assignment) => sum + assignment.points, 0)}
              </div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="status-filter">
          <h3>Filter by Status</h3>
          <div className="status-buttons">
            {statusFilters.map(status => (
              <button
                key={status.id}
                className={`status-button ${selectedStatus === status.id ? 'active' : ''}`}
                style={{ borderColor: status.color }}
                onClick={() => setSelectedStatus(status.id)}
              >
                <span className="status-icon">{status.icon}</span>
                <span className="status-name">{status.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Assignments List */}
        <div className="assignments-list">
          {filteredAssignments.map(assignment => (
            <div key={assignment.id} className={`assignment-card ${assignment.status}`}>
              <div className="assignment-header">
                <div className="assignment-title">
                  <h4>{assignment.title}</h4>
                  <div className="assignment-meta">
                    <span className="teacher">👩‍🏫 {assignment.teacher}</span>
                    <span className="points">⭐ {assignment.points} points</span>
                  </div>
                </div>
                
                <div className="assignment-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(assignment.status) }}
                  >
                    {getStatusIcon(assignment.status)} {assignment.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="assignment-content">
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-progress">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percentage">{assignment.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${assignment.progress}%`,
                        backgroundColor: getStatusColor(assignment.status)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="assignment-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span className="detail-label">Due:</span>
                    <span className={`detail-value ${isOverdue(assignment.dueDate) ? 'overdue' : ''} ${isDueSoon(assignment.dueDate) ? 'due-soon' : ''}`}>
                      {formatDate(assignment.dueDate)}
                    </span>
                    {isOverdue(assignment.dueDate) && (
                      <span className="overdue-badge">OVERDUE</span>
                    )}
                    {isDueSoon(assignment.dueDate) && !isOverdue(assignment.dueDate) && (
                      <span className="due-soon-badge">Due Soon</span>
                    )}
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📚</span>
                    <span className="detail-label">Lessons:</span>
                    <span className="detail-value">{assignment.lessons.length} lesson(s)</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-icon">📝</span>
                    <span className="detail-label">Assigned:</span>
                    <span className="detail-value">{formatTimeAgo(assignment.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="assignment-actions">
                {assignment.status === 'assigned' && (
                  <button className="start-assignment-button">
                    ▶️ Start Assignment
                  </button>
                )}
                
                {assignment.status === 'in_progress' && (
                  <button className="continue-assignment-button">
                    🔄 Continue Assignment
                  </button>
                )}
                
                {assignment.status === 'completed' && (
                  <button className="review-assignment-button">
                    👁️ Review Assignment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button">
              📊 View Progress Report
            </button>
            <button className="action-button">
              📧 Contact Teacher
            </button>
            <button className="action-button">
              📅 View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
