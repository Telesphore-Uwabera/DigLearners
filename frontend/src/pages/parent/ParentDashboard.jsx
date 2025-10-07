import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icons/Icon';
import '../../components/DashboardStyles.css';

const ParentDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>Parent Dashboard</h1>
            <p>Monitor your child's learning progress and activities</p>
          </div>
        </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="child" size={24} />
          </div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Children</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="book" size={24} />
          </div>
          <div className="stat-content">
            <h3>24</h3>
            <p>Lessons Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="achievement" size={24} />
          </div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Total Badges</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Icon name="clock" size={24} />
          </div>
          <div className="stat-content">
            <h3>15h</h3>
            <p>Learning Time</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/dashboard/children" className="dashboard-card">
          <div className="card-icon">
            <Icon name="child" size={32} />
          </div>
          <div className="card-content">
            <h3>My Children</h3>
            <p>View and manage your children's profiles</p>
            <div className="card-stats">
              <span>2 active learners</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/progress" className="dashboard-card">
          <div className="card-icon">
            <Icon name="analytics" size={32} />
          </div>
          <div className="card-content">
            <h3>Progress Reports</h3>
            <p>Detailed learning progress for each child</p>
            <div className="card-stats">
              <span>82% average progress</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/achievements" className="dashboard-card">
          <div className="card-icon">
            <Icon name="achievement" size={32} />
          </div>
          <div className="card-content">
            <h3>Achievements</h3>
            <p>View badges and accomplishments</p>
            <div className="card-stats">
              <span>12 badges earned</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/schedule" className="dashboard-card">
          <div className="card-icon">
            <Icon name="calendar" size={32} />
          </div>
          <div className="card-content">
            <h3>Schedule</h3>
            <p>View learning schedules and activities</p>
            <div className="card-stats">
              <span>3 lessons this week</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/communication" className="dashboard-card">
          <div className="card-icon">
            <Icon name="message" size={32} />
          </div>
          <div className="card-content">
            <h3>Communication</h3>
            <p>Messages from teachers and administrators</p>
            <div className="card-stats">
              <span>2 unread messages</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
        
        <Link to="/dashboard/reports" className="dashboard-card">
          <div className="card-icon">
            <Icon name="report" size={24} />
          </div>
          <div className="card-content">
            <h3>Reports</h3>
            <p>Weekly and monthly progress reports</p>
            <div className="card-stats">
              <span>New reports available</span>
            </div>
          </div>
          <div className="card-arrow">→</div>
        </Link>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <Icon name="check" size={20} />
            </div>
            <div className="activity-content">
              <p><strong>Alice completed:</strong> Introduction to Programming</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Icon name="achievement" size={20} />
            </div>
            <div className="activity-content">
              <p><strong>John earned badge:</strong> Fast Learner</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Icon name="book" size={20} />
            </div>
            <div className="activity-content">
              <p><strong>New lesson assigned:</strong> Safe Internet Browsing</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Icon name="analytics" size={20} />
            </div>
            <div className="activity-content">
              <p><strong>Weekly report generated:</strong> Alice's learning progress</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Children Overview</h2>
        <div className="children-grid">
          <div className="child-card">
            <div className="child-header">
              <div className="child-avatar">A</div>
              <div className="child-info">
                <h3>Alice Uwimana</h3>
                <p>Class A • 9 years old</p>
              </div>
            </div>
            <div className="child-stats">
              <div className="stat">
                <span className="stat-label">Lessons:</span>
                <span className="stat-value">12/15 completed</span>
              </div>
              <div className="stat">
                <span className="stat-label">Badges:</span>
                <span className="stat-value">
                  <Icon name="achievement" size={16} style={{ marginRight: '4px' }} />
                  7
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Points:</span>
                <span className="stat-value">
                  <Icon name="star" size={16} style={{ marginRight: '4px' }} />
                  450
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">85%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%', backgroundColor: '#10b981' }}></div>
            </div>
          </div>

          <div className="child-card">
            <div className="child-header">
              <div className="child-avatar">J</div>
              <div className="child-info">
                <h3>John Mukasa</h3>
                <p>Class B • 10 years old</p>
              </div>
            </div>
            <div className="child-stats">
              <div className="stat">
                <span className="stat-label">Lessons:</span>
                <span className="stat-value">9/12 completed</span>
              </div>
              <div className="stat">
                <span className="stat-label">Badges:</span>
                <span className="stat-value">
                  <Icon name="achievement" size={16} style={{ marginRight: '4px' }} />
                  5
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Points:</span>
                <span className="stat-value">
                  <Icon name="star" size={16} style={{ marginRight: '4px' }} />
                  380
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">78%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '78%', backgroundColor: '#f59e0b' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParentDashboard;

