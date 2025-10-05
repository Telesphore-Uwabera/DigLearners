import React, { useState } from 'react'
import { useTranslation } from '../../lib/language'
import { mockBadges, mockAchievements, getEarnedBadges, getPendingBadges, formatDate } from '../../services/mockDataService'
import AchievementNotification from '../../components/AchievementNotification'
import '../../components/CodePlayStyles.css'
import '../../components/DashboardStyles.css'

export default function Achievements() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showNotification, setShowNotification] = useState(false)
  const [currentBadge, setCurrentBadge] = useState(null)

  const categories = [
    { id: 'all', name: 'All Badges', icon: '🏆', color: '#1976D2' },
    { id: 'achievement', name: 'Achievements', icon: '🎯', color: '#4CAF50' },
    { id: 'milestone', name: 'Milestones', icon: '📈', color: '#FF9800' },
    { id: 'special', name: 'Special', icon: '⭐', color: '#9C27B0' }
  ]

  const getFilteredBadges = () => {
    if (selectedCategory === 'all') {
      return mockBadges
    }
    return mockBadges.filter(badge => badge.category === selectedCategory)
  }

  const simulateAchievement = (badge) => {
    setCurrentBadge(badge)
    setShowNotification(true)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
    setCurrentBadge(null)
  }

  const earnedBadges = getEarnedBadges()
  const pendingBadges = getPendingBadges()
  const completionRate = Math.round((earnedBadges.length / mockBadges.length) * 100)

  return (
    <div className="achievements-page">
      {/* Achievement Notification */}
      {showNotification && (
        <AchievementNotification
          badge={currentBadge}
          points={currentBadge?.points}
          isVisible={showNotification}
          onClose={handleNotificationClose}
        />
      )}

      {/* CodePlay-style header */}
      <div className="lesson-header codeplay-header">
        <div className="header-left">
          <h1 className="codeplay-title">CodePlay</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="avatar">🏆</div>
            <span className="user-name">My Achievements</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lesson-content">
        {/* Achievement Overview */}
        <div className="achievement-overview">
          <div className="overview-stats">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <div className="stat-value">{earnedBadges.length}</div>
                <div className="stat-label">Badges Earned</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{completionRate}%</div>
                <div className="stat-label">Completion Rate</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-value">
                  {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)}
                </div>
                <div className="stat-label">Points from Badges</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <div className="stat-value">{pendingBadges.length}</div>
                <div className="stat-label">Available Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="recent-achievements">
          <h3>🎉 Recent Achievements</h3>
          <div className="recent-badges">
            {mockAchievements.recentAchievements.map(achievement => (
              <div key={achievement.id} className="recent-badge">
                <div className="badge-icon">{achievement.icon}</div>
                <div className="badge-info">
                  <div className="badge-name">{achievement.name}</div>
                  <div className="badge-date">
                    Earned {formatDate(achievement.earnedAt)}
                  </div>
                </div>
                <button 
                  className="test-notification-button"
                  onClick={() => simulateAchievement(achievement)}
                >
                  🎉 Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <h3>Filter by Category</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                style={{ borderColor: category.color }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Badge Collection */}
        <div className="badge-collection">
          <h3>🏆 Badge Collection</h3>
          <div className="badges-grid">
            {getFilteredBadges().map(badge => (
              <div 
                key={badge.id} 
                className={`badge-card ${badge.isEarned ? 'earned' : 'locked'}`}
              >
                <div className="badge-card-icon">{badge.icon}</div>
                <div className="badge-card-name">{badge.name}</div>
                <div className="badge-card-description">{badge.description}</div>
                <div className="badge-card-points">+{badge.points} pts</div>
                
                {badge.isEarned && (
                  <div className="badge-earned-info">
                    <div className="earned-date">
                      Earned {formatDate(badge.earnedAt)}
                    </div>
                    <button 
                      className="celebrate-button"
                      onClick={() => simulateAchievement(badge)}
                    >
                      🎉 Celebrate
                    </button>
                  </div>
                )}
                
                {!badge.isEarned && (
                  <div className="badge-locked-info">
                    <div className="locked-text">Keep learning to unlock!</div>
                    <div className="progress-hint">
                      Complete more lessons to earn this badge
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Badges */}
        <div className="upcoming-badges">
          <h3>🎯 Upcoming Badges</h3>
          <div className="upcoming-list">
            {mockAchievements.upcomingBadges.map(badge => (
              <div key={badge.id} className="upcoming-badge">
                <div className="upcoming-icon">{badge.icon}</div>
                <div className="upcoming-info">
                  <div className="upcoming-name">{badge.name}</div>
                  <div className="upcoming-description">{badge.description}</div>
                  <div className="upcoming-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(badge.progress / badge.required) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {badge.progress}/{badge.required} completed
                    </div>
                  </div>
                </div>
                <div className="upcoming-points">+{badge.points || 50} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Tips */}
        <div className="achievement-tips">
          <h3>💡 Tips to Earn More Badges</h3>
          <div className="tips-grid">
            <div className="tip-item">
              <div className="tip-icon">📚</div>
              <div className="tip-content">
                <div className="tip-title">Complete Lessons</div>
                <div className="tip-description">Finish lessons to earn achievement badges</div>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">🔥</div>
              <div className="tip-content">
                <div className="tip-title">Maintain Streaks</div>
                <div className="tip-description">Learn daily to earn streak badges</div>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">⭐</div>
              <div className="tip-content">
                <div className="tip-title">Perfect Scores</div>
                <div className="tip-description">Get 100% on lessons for special badges</div>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-icon">🏆</div>
              <div className="tip-content">
                <div className="tip-title">Top Rankings</div>
                <div className="tip-description">Be among the top performers weekly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
