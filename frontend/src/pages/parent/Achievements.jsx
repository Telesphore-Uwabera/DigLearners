import React, { useState } from 'react';
import { useTranslation } from '../../lib/language';
import { getAchievementsData } from '../../services/parentMockDataService';
import '../../components/DashboardStyles.css';

const Achievements = () => {
  const { t, currentLanguage } = useTranslation();
  const data = getAchievementsData();
  const [selectedChild, setSelectedChild] = useState(data.children[0].id);
  const [filterCategory, setFilterCategory] = useState('all');

  const currentChild = data.children.find(child => child.id === selectedChild);
  
  const filteredBadges = filterCategory === 'all' 
    ? currentChild?.allBadges || []
    : currentChild?.allBadges.filter(badge => badge.category === filterCategory) || [];

  const categories = [
    { key: 'all', label: currentLanguage === 'rw' ? 'Byose' : 'All' },
    { key: 'Safety', label: currentLanguage === 'rw' ? 'Umutekano' : 'Safety' },
    { key: 'Coding', label: currentLanguage === 'rw' ? 'Gukora Code' : 'Coding' },
    { key: 'Consistency', label: currentLanguage === 'rw' ? 'Gukomeza' : 'Consistency' },
    { key: 'Milestone', label: currentLanguage === 'rw' ? 'Intsinzi' : 'Milestone' },
    { key: 'Skill', label: currentLanguage === 'rw' ? 'Ubuhanga' : 'Skill' }
  ];

  return (
    <div className="dashboard-container">
      <div className="page-container">
        <div className="page-header">
          <div className="header-content">
            <h1>
              {currentLanguage === 'rw' 
                ? 'Ibyubahiro' 
                : 'Achievements'
              }
            </h1>
            <p>
              {currentLanguage === 'rw'
                ? 'Reba ibyubahiro n\'intsinzi z\'abana banyu'
                : 'View badges and accomplishments'
              }
            </p>
          </div>
        </div>

        {/* Child Selector */}
        <div className="child-selector">
          <h3>
            {currentLanguage === 'rw' ? 'Hitamo Umwana' : 'Select Child'}
          </h3>
          <div className="child-tabs">
            {data.children.map((child) => (
              <button
                key={child.id}
                className={`child-tab ${selectedChild === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChild(child.id)}
              >
                <span className="child-avatar">{child.avatar}</span>
                <span className="child-name">{child.name}</span>
                <span className="child-badges">{child.totalBadges} {currentLanguage === 'rw' ? 'ibyubahiro' : 'badges'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <h3>
            {currentLanguage === 'rw' ? 'Hitamo Ubwoko' : 'Filter by Category'}
          </h3>
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`category-tab ${filterCategory === category.key ? 'active' : ''}`}
                onClick={() => setFilterCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Child Achievements */}
        {currentChild && (
          <div className="achievements-section">
            <div className="achievements-header">
              <div className="child-info">
                <div className="child-avatar-large">{currentChild.avatar}</div>
                <div>
                  <h2>{currentChild.name}</h2>
                  <p>{currentChild.totalBadges} {currentLanguage === 'rw' ? 'ibyubahiro byose' : 'total badges'}</p>
                </div>
              </div>
              <div className="achievements-summary">
                <div className="summary-stat">
                  <span className="stat-number">{currentChild.totalBadges}</span>
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Ibyubahiro' : 'Badges Earned'}
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{currentChild.recentBadges.length}</span>
                  <span className="stat-label">
                    {currentLanguage === 'rw' ? 'Ryihariye' : 'Recent'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Badges */}
            <div className="recent-badges">
              <h3>
                {currentLanguage === 'rw' ? 'Ibyubahiro Ryihariye' : 'Recent Badges'}
              </h3>
              <div className="badges-grid">
                {currentChild.recentBadges.map((badge) => (
                  <div key={badge.id} className="badge-card recent">
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-content">
                      <h4>{badge.title}</h4>
                      <p>{badge.description}</p>
                      <span className="badge-date">{badge.date}</span>
                    </div>
                    <div className="badge-category">{badge.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Badges */}
            <div className="all-badges">
              <h3>
                {currentLanguage === 'rw' ? 'Ibyubahiro Byose' : 'All Badges'}
              </h3>
              <div className="badges-grid">
                {filteredBadges.map((badge) => (
                  <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'not-earned'}`}>
                    <div className="badge-icon">{badge.icon}</div>
                    <div className="badge-content">
                      <h4>{badge.title}</h4>
                      <p>{badge.description}</p>
                      {badge.earned && (
                        <span className="badge-date">{badge.date}</span>
                      )}
                    </div>
                    <div className="badge-category">{badge.category}</div>
                    {badge.earned && (
                      <div className="badge-status">✅</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="summary-stats">
          <h3>
            {currentLanguage === 'rw' ? 'Incamake' : 'Summary'}
          </h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <h3>{data.summary.totalBadges}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Ibyubahiro Byose' : 'Total Badges'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🆕</div>
              <div className="stat-content">
                <h3>{data.summary.recentBadges}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Ryihariye' : 'Recent Badges'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛡️</div>
              <div className="stat-content">
                <h3>{data.summary.topCategory}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Ubwoko bw\'Icyubahiro' : 'Top Category'}
                </p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{data.summary.mostActiveChild}</h3>
                <p>
                  {currentLanguage === 'rw' ? 'Umwana ukora cyane' : 'Most Active Child'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
