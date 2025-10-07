import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icons/Icon';

const ParentDashboard = () => {
  const children = [
    {
      id: 1,
      name: "Alex",
      age: 8,
      avatar: "👦",
      level: "Explorer",
      points: 850,
      lessonsCompleted: 12,
      badges: 5,
      streak: 7,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Emma",
      age: 6,
      avatar: "👧",
      level: "Adventurer",
      points: 420,
      lessonsCompleted: 8,
      badges: 3,
      streak: 3,
      lastActivity: "1 day ago"
    }
  ];

  const recentActivities = [
    { id: 1, child: "Alex", activity: "Completed Block Coding Lesson 3", time: "2 hours ago", icon: "🧩" },
    { id: 2, child: "Emma", activity: "Earned Safety Hero Badge", time: "1 day ago", icon: "🛡️" },
    { id: 3, child: "Alex", activity: "Achieved 7-day learning streak", time: "2 days ago", icon: "🔥" },
    { id: 4, child: "Emma", activity: "Finished Typing Lesson 2", time: "3 days ago", icon: "⌨️" }
  ];

  return (
    <div className="parent-dashboard">
      <div className="parent-header">
        <div className="welcome-section">
          <h1>👨‍👩‍👧‍👦 Welcome to Your Family Dashboard!</h1>
          <p>Keep track of your children's amazing learning journey! 🌟</p>
        </div>
        <div className="parent-avatar">
          <div className="avatar-circle">👨‍👩‍👧‍👦</div>
          <div className="parent-info">
            <h3>Parent Dashboard</h3>
            <p>Family Learning Center</p>
          </div>
        </div>
      </div>

      <div className="children-section">
        <h2>👶 My Children</h2>
        <div className="children-grid">
          {children.map(child => (
            <div key={child.id} className="child-card">
              <div className="child-header">
                <div className="child-avatar">{child.avatar}</div>
                <div className="child-info">
                  <h3>{child.name}</h3>
                  <p>Age {child.age} • {child.level}</p>
                </div>
                <div className="child-status">
                  <span className="status-dot"></span>
                  <span>Active</span>
        </div>
      </div>

              <div className="child-stats">
                <div className="stat">
                  <div className="stat-icon">⭐</div>
          <div className="stat-content">
                    <span className="stat-number">{child.points}</span>
                    <span className="stat-label">Points</span>
          </div>
        </div>
                <div className="stat">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
                    <span className="stat-number">{child.lessonsCompleted}</span>
                    <span className="stat-label">Lessons</span>
          </div>
        </div>
                <div className="stat">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
                    <span className="stat-number">{child.badges}</span>
                    <span className="stat-label">Badges</span>
          </div>
        </div>
                <div className="stat">
                  <div className="stat-icon">🔥</div>
          <div className="stat-content">
                    <span className="stat-number">{child.streak}</span>
                    <span className="stat-label">Streak</span>
          </div>
        </div>
      </div>

              <div className="child-actions">
                <Link to={`/child/${child.id}/progress`} className="action-btn primary">
                  View Progress 📊
        </Link>
                <Link to={`/child/${child.id}/achievements`} className="action-btn secondary">
                  See Badges 🏆
        </Link>
      </div>

              <div className="last-activity">
                <span>Last active: {child.lastActivity}</span>
            </div>
          </div>
          ))}
            </div>
          </div>

      <div className="recent-activities">
        <h2>🎉 Recent Family Activities</h2>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
                <div className="activity-child">{activity.child}</div>
                <div className="activity-text">{activity.activity}</div>
                <div className="activity-time">{activity.time}</div>
            </div>
              <div className="activity-badge">✅</div>
          </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>🎯 Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/children" className="action-card action-1">
            <div className="action-icon">👶</div>
            <span>Manage Children</span>
          </Link>
          <Link to="/reports" className="action-card action-2">
            <div className="action-icon">📊</div>
            <span>Progress Reports</span>
          </Link>
          <Link to="/achievements" className="action-card action-3">
            <div className="action-icon">🏆</div>
            <span>Family Achievements</span>
          </Link>
          <Link to="/schedule" className="action-card action-4">
            <div className="action-icon">📅</div>
            <span>Learning Schedule</span>
          </Link>
          <Link to="/communication" className="action-card action-5">
            <div className="action-icon">💬</div>
            <span>Teacher Messages</span>
          </Link>
          <Link to="/settings" className="action-card action-6">
            <div className="action-icon">⚙️</div>
            <span>Account Settings</span>
          </Link>
            </div>
          </div>

      <div className="encouragement-section">
        <div className="encouragement-card">
          <div className="encouragement-icon">🌟</div>
          <div className="encouragement-content">
            <h3>Great Job Supporting Your Children!</h3>
            <p>Your children are making amazing progress in their digital learning journey. Keep encouraging them to explore and learn!</p>
            </div>
          </div>
        </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .parent-dashboard {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 2rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .parent-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #0ea5a4 0%, #0891b2 100%);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 40px rgba(14, 165, 164, 0.3);
            position: relative;
            overflow: hidden;
          }

          .parent-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
            pointer-events: none;
          }

          .welcome-section {
            position: relative;
            z-index: 1;
          }

          .welcome-section h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-weight: 700;
          }

          .welcome-section p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            margin: 0;
            font-weight: 400;
          }

          .parent-avatar {
            display: flex;
            align-items: center;
            gap: 1rem;
            position: relative;
            z-index: 1;
          }

          .avatar-circle {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
          }

          .parent-info h3 {
            color: white;
            font-size: 1.5rem;
            margin: 0 0 0.25rem 0;
            font-weight: 600;
          }

          .parent-info p {
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            font-weight: 400;
          }

          .children-section {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
          }

          .children-section h2 {
            color: #1e293b;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            text-align: center;
            font-weight: 700;
            position: relative;
          }

          .children-section h2::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: linear-gradient(135deg, #0ea5a4, #0891b2);
            border-radius: 2px;
          }

          .children-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
          }

          .child-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            position: relative;
            overflow: hidden;
          }

          .child-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #0ea5a4, #0891b2);
          }

          .child-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border-color: #0ea5a4;
          }

          .child-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .child-avatar {
            font-size: 3rem;
          }

          .child-info h3 {
            color: #2D3748;
            font-size: 1.3rem;
            margin: 0 0 0.25rem 0;
          }

          .child-info p {
            color: #4A5568;
            margin: 0;
            font-size: 0.9rem;
          }

          .child-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            color: #4CAF50;
            font-size: 0.9rem;
            font-weight: bold;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            background: #4CAF50;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .child-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
            transition: all 0.2s ease;
          }

          .stat:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .stat-icon {
            font-size: 1.5rem;
          }

          .stat-content {
            display: flex;
            flex-direction: column;
          }

          .stat-number {
            color: #2D3748;
            font-size: 1.2rem;
            font-weight: bold;
            line-height: 1;
          }

          .stat-label {
            color: #4A5568;
            font-size: 0.8rem;
          }

          .child-actions {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .action-btn {
            flex: 1;
            padding: 0.875rem 1rem;
            border-radius: 12px;
            text-decoration: none;
            text-align: center;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .action-btn.primary {
            background: linear-gradient(135deg, #0ea5a4 0%, #0891b2 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(14, 165, 164, 0.3);
          }

          .action-btn.secondary {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          }

          .action-btn.primary:hover {
            box-shadow: 0 8px 25px rgba(14, 165, 164, 0.4);
          }

          .action-btn.secondary:hover {
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
          }

          .last-activity {
            text-align: center;
            color: #4A5568;
            font-size: 0.8rem;
            font-style: italic;
          }

          .recent-activities {
            background: white;
            padding: 2rem;
            border-radius: 25px;
            margin-bottom: 2rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          }

          .recent-activities h2 {
            color: #2D3748;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .activities-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .activity-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: linear-gradient(135deg, #F8F9FA, #E8F5E8);
            padding: 1rem;
            border-radius: 15px;
            border: 2px solid #E2E8F0;
          }

          .activity-icon {
            font-size: 2rem;
          }

          .activity-content {
            flex: 1;
          }

          .activity-child {
            color: #2D3748;
            font-weight: bold;
            font-size: 0.9rem;
          }

          .activity-text {
            color: #4A5568;
            font-size: 1rem;
            margin: 0.25rem 0;
          }

          .activity-time {
            color: #4A5568;
            font-size: 0.8rem;
            font-style: italic;
          }

          .activity-badge {
            font-size: 1.5rem;
          }

          .quick-actions {
            background: white;
            padding: 2rem;
            border-radius: 25px;
            margin-bottom: 2rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          }

          .quick-actions h2 {
            color: #2D3748;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .action-card {
            background: white;
            border: 3px solid;
            border-radius: 20px;
            padding: 1.5rem;
            text-decoration: none;
            text-align: center;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .action-1 { border-color: #FF677D; }
          .action-2 { border-color: #F8B400; }
          .action-3 { border-color: #B9FBC0; }
          .action-4 { border-color: #FFB3BA; }
          .action-5 { border-color: #D4A5A5; }
          .action-6 { border-color: #FF677D; }

          .action-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }

          .action-icon {
            font-size: 2rem;
          }

          .action-card span {
            color: #2D3748;
            font-weight: bold;
            font-size: 0.9rem;
          }

          .encouragement-section {
            background: white;
            padding: 2rem;
            border-radius: 25px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          }

          .encouragement-card {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            background: linear-gradient(135deg, #FFB3BA, #B9FBC0);
            padding: 2rem;
            border-radius: 20px;
            border: 3px solid #E2E8F0;
          }

          .encouragement-icon {
            font-size: 3rem;
          }

          .encouragement-content h3 {
            color: #2D3748;
            font-size: 1.5rem;
            margin: 0 0 0.5rem 0;
          }

          .encouragement-content p {
            color: #4A5568;
            margin: 0;
            font-size: 1rem;
            line-height: 1.4;
          }

          @media (max-width: 768px) {
            .parent-dashboard {
              padding: 1rem;
            }

            .parent-header {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }

            .welcome-section h1 {
              font-size: 2rem;
            }

            .children-grid {
              grid-template-columns: 1fr;
            }

            .child-stats {
              grid-template-columns: repeat(2, 1fr);
            }

            .actions-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `
      }} />
    </div>
  );
};

export default ParentDashboard;