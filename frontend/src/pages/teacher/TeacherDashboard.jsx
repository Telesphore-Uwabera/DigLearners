import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icons/Icon';
import teacherApiService from '../../services/teacherApiService';
import '../../components/DashboardStyles.css';

const TeacherDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await teacherApiService.getDashboardData();
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="page-container">
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="page-container">
          <div className="error-message">
            <h2>Error loading dashboard</h2>
            <p>{error}</p>
            <button onClick={fetchDashboardData} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentActivity = dashboardData?.recentActivity || [];

  return (
    <div className="dashboard-container">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>Teacher Dashboard</h1>
            <p>Welcome back! Here's an overview of your teaching activities</p>
          </div>
        </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="assignment" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.draftLessons || 0}</h3>
            <p>Draft Lessons</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="student" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalStudents || 0}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="book" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalLessons || 0}</h3>
            <p>Total Lessons</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="progress" size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.averageProgress || 0}%</h3>
            <p>Avg Progress</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/dashboard/assignments" className="dashboard-card">
          <div className="card-icon">
            <Icon name="assignment" size={32} />
          </div>
          <div className="card-content">
            <h3>Create Work</h3>
            <p>Create assignments and lessons for students</p>
            <div className="card-stats">
              <span>24 assignments • 15 pending</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/students" className="dashboard-card">
          <div className="card-icon">
            <Icon name="student" size={32} />
          </div>
          <div className="card-content">
            <h3>Students</h3>
            <p>View student progress and performance</p>
            <div className="card-stats">
              <span>87% average progress</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/lessons" className="dashboard-card">
          <div className="card-icon">
            <Icon name="book" size={32} />
          </div>
          <div className="card-content">
            <h3>Lessons</h3>
            <p>Create and assign educational content</p>
            <div className="card-stats">
              <span>24 lessons assigned</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/assignments" className="dashboard-card">
          <div className="card-icon">
            <Icon name="assignment" size={32} />
          </div>
          <div className="card-content">
            <h3>Assignments</h3>
            <p>Track assignment completion and grades</p>
            <div className="card-stats">
              <span>15 pending reviews</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/analytics" className="dashboard-card">
          <div className="card-icon">
            <Icon name="analytics" size={32} />
          </div>
          <div className="card-content">
            <h3>Analytics</h3>
            <p>View detailed performance analytics</p>
            <div className="card-stats">
              <span>Weekly reports available</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/schedule" className="dashboard-card">
          <div className="card-icon">
            <Icon name="calendar" size={24} />
          </div>
          <div className="card-content">
            <h3>Schedule</h3>
            <p>Manage your teaching schedule and deadlines</p>
            <div className="card-stats">
              <span>5 upcoming deadlines</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
      </div>

      {/* Student Progress Monitoring Section */}
      <div className="student-progress-section">
        <h2>📊 Student Progress Monitoring</h2>
        <div className="progress-monitoring-grid">
          <div className="progress-card">
            <div className="progress-header">
              <h3>👥 Grade 3 Students</h3>
              <span className="progress-count">12 students</span>
            </div>
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="stat-number">85%</span>
                <span className="stat-label">Average Progress</span>
              </div>
              <div className="progress-stat">
                <span className="stat-number">8</span>
                <span className="stat-label">Lessons Completed</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '85%'}}></div>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-header">
              <h3>👥 Grade 4 Students</h3>
              <span className="progress-count">15 students</span>
            </div>
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="stat-number">92%</span>
                <span className="stat-label">Average Progress</span>
              </div>
              <div className="progress-stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Lessons Completed</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '92%'}}></div>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-header">
              <h3>👥 Grade 5 Students</h3>
              <span className="progress-count">18 students</span>
            </div>
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="stat-number">78%</span>
                <span className="stat-label">Average Progress</span>
              </div>
              <div className="progress-stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Lessons Completed</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '78%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Student Progress */}
      <div className="individual-progress-section">
        <h2>👨‍🎓 Individual Student Progress</h2>
        <div className="student-list">
          <div className="student-progress-item">
            <div className="student-info">
              <div className="student-avatar">👦</div>
              <div className="student-details">
                <h4>Alex Johnson</h4>
                <p>Grade 3 • Explorer Level</p>
              </div>
            </div>
            <div className="student-progress">
              <div className="progress-stats">
                <span className="points">⭐ 850 points</span>
                <span className="lessons">📚 12 lessons</span>
                <span className="badges">🏆 5 badges</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="student-progress-item">
            <div className="student-info">
              <div className="student-avatar">👧</div>
              <div className="student-details">
                <h4>Emma Smith</h4>
                <p>Grade 4 • Adventurer Level</p>
              </div>
            </div>
            <div className="student-progress">
              <div className="progress-stats">
                <span className="points">⭐ 420 points</span>
                <span className="lessons">📚 8 lessons</span>
                <span className="badges">🏆 3 badges</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="student-progress-item">
            <div className="student-info">
              <div className="student-avatar">👦</div>
              <div className="student-details">
                <h4>David Wilson</h4>
                <p>Grade 5 • Pathfinder Level</p>
              </div>
            </div>
            <div className="student-progress">
              <div className="progress-stats">
                <span className="points">⭐ 1200 points</span>
                <span className="lessons">📚 15 lessons</span>
                <span className="badges">🏆 8 badges</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <Icon name="book" size={20} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.student?.name || 'Student'}</strong> completed 
                    <strong> {activity.lesson?.title || 'lesson'}</strong>
                  </p>
                  <span className="activity-time">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-activity">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeacherDashboard;

