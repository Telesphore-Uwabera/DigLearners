import React from 'react';
import { useTranslation } from '../../lib/language';
import { getChildrenOverviewData } from '../../services/parentMockDataService';
import '../../components/DashboardStyles.css';

const ChildrenOverview = () => {
  const { t, currentLanguage } = useTranslation();
  const data = getChildrenOverviewData();

  return (
    <div className="dashboard-container">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              {currentLanguage === 'rw' 
                ? 'Abana Banyu' 
                : 'Children Overview'
              }
            </h1>
            <p>
              {currentLanguage === 'rw'
                ? 'Reba imikurire y\'abana banyu n\'ibikorwa byabo'
                : 'Monitor your children\'s progress and activities'
              }
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👶</div>
            <div className="stat-content">
              <h3>{data.overview.totalChildren}</h3>
              <p>
                {currentLanguage === 'rw' ? 'Abana' : 'Children'}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>{data.overview.totalLessonsCompleted}</h3>
              <p>
                {currentLanguage === 'rw' ? 'Amahugurwa Yarangije' : 'Lessons Completed'}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{data.overview.totalBadges}</h3>
              <p>
                {currentLanguage === 'rw' ? 'Ibyubahiro' : 'Total Badges'}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>{data.overview.totalLearningTime}</h3>
              <p>
                {currentLanguage === 'rw' ? 'Igihe cy\'Kwiga' : 'Learning Time'}
              </p>
            </div>
          </div>
        </div>

        {/* Children Cards */}
        <div className="dashboard-grid">
          {data.children.map((child) => (
            <div key={child.id} className="child-card">
              <div className="child-header">
                <div className="child-avatar">{child.avatar}</div>
                <div className="child-info">
                  <h3>{child.name}</h3>
                  <p>{child.grade} • {child.age} {currentLanguage === 'rw' ? 'imyaka' : 'years old'}</p>
                </div>
                <div className="child-progress">
                  <div className="progress-circle">
                    <span>{child.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="child-stats">
                <div className="stat-item">
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Amahugurwa:' : 'LESSONS:'}
                  </span>
                  <span className="stat-value">{child.completedLessons}/{child.totalLessons} {currentLanguage === 'rw' ? 'yarangije' : 'completed'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Ibyubahiro:' : 'BADGES:'}
                  </span>
                  <span className="stat-value">{child.badges} 🏆</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Amatike:' : 'POINTS:'}
                  </span>
                  <span className="stat-value">{child.points} ⭐</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Imikurire:' : 'PROGRESS:'}
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${child.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="child-activity">
                <h4>
                  {currentLanguage === 'rw' ? 'Ikorwa Ryihariye' : 'Recent Activity'}
                </h4>
                <div className="activity-list">
                  {child.recentActivity.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'lesson_completed' ? '✅' : 
                         activity.type === 'badge_earned' ? '🏆' : '📚'}
                      </div>
                      <div className="activity-content">
                        <p>{activity.title}</p>
                        <span className="activity-time">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h2>
            {currentLanguage === 'rw' ? 'Ikorwa Ryihariye' : 'Recent Activity'}
          </h2>
          <div className="activity-list">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'lesson_completed' ? '✅' : 
                   activity.type === 'badge_earned' ? '🏆' : '📚'}
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.childName}</strong> {activity.activity}
                  </p>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {activity.points > 0 && (
                  <div className="activity-points">
                    +{activity.points} pts
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenOverview;
