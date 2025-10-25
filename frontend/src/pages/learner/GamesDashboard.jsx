import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gamifiedApiService from '../../services/gamifiedApiService';
import './GamesDashboard.css';

const GamesDashboard = () => {
  const location = useLocation();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const ageGroup = location.state?.ageGroup || localStorage.getItem('selectedAgeGroup');
  const initialContent = location.state?.content || JSON.parse(localStorage.getItem('ageGroupContent') || '[]');

  useEffect(() => {
    if (initialContent && initialContent.length > 0) {
      setContent(initialContent);
      setLoading(false);
    } else if (ageGroup) {
      fetchContent();
    } else {
      setError('No age group selected. Please go back and select your age group.');
      setLoading(false);
    }
  }, [ageGroup, initialContent]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      // First try to get user's grade-specific content
      try {
        const response = await gamifiedApiService.getMyContent();
        setContent(response.data);
        localStorage.setItem('userContent', JSON.stringify(response.data));
        localStorage.setItem('userGrade', response.userGrade);
      } catch (gradeError) {
        // Fallback to age group content if grade-specific fails
        console.log('Grade-specific content not available, using age group content');
        const response = await gamifiedApiService.getContentByAgeGroup(ageGroup);
        setContent(response.data);
        localStorage.setItem('ageGroupContent', JSON.stringify(response.data));
      }
    } catch (err) {
      setError('Failed to load games. Please try again.');
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter(item => {
    const subjectMatch = selectedFilter === 'all' || item.subject === selectedFilter;
    const difficultyMatch = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    return subjectMatch && difficultyMatch;
  });

  const subjects = [...new Set(content.map(item => item.subject))];
  const difficulties = [...new Set(content.map(item => item.difficulty))];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getGameTypeIcon = (gameType) => {
    switch (gameType) {
      case 'puzzle': return '🧩';
      case 'quiz': return '❓';
      case 'interactive': return '🎮';
      case 'story': return '📚';
      case 'simulation': return '🎯';
      case 'creative': return '🎨';
      default: return '🎮';
    }
  };

  const handleGameStart = (game) => {
    // Store the selected game in localStorage
    localStorage.setItem('selectedGame', JSON.stringify(game));
    // Navigate to the game player with the game data
    window.location.href = `/dashboard/game/${game.id}`;
  };

  if (loading) {
    return (
      <div className="games-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your games...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={fetchContent}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="games-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>🎮 Your Learning Games</h1>
          <p>Choose from {content.length} games designed for your age group</p>
        </div>
        <div className="age-group-badge">
          Age Group: {ageGroup}
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="subject-filter">Subject:</label>
          <select
            id="subject-filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">Difficulty:</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Games Grid */}
      <div className="games-grid">
        {filteredContent.length === 0 ? (
          <div className="no-games">
            <div className="no-games-icon">🎮</div>
            <h3>No games found</h3>
            <p>Try adjusting your filters to see more games.</p>
          </div>
        ) : (
          filteredContent.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-header">
                <div className="game-icon">
                  {getGameTypeIcon(game.gameType)}
                </div>
                <div className="game-badges">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                  >
                    {game.difficulty}
                  </span>
                  <span className="subject-badge">
                    {game.subject}
                  </span>
                </div>
              </div>

              <div className="game-content">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-description">{game.description}</p>
                
                <div className="game-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span>{game.estimatedTime || 10} min</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⭐</span>
                    <span>{game.pointsReward} points</span>
                  </div>
                  {game.badgeReward && (
                    <div className="meta-item">
                      <span className="meta-icon">🏆</span>
                      <span>{game.badgeReward}</span>
                    </div>
                  )}
                </div>

                {game.learningObjectives && (
                  <div className="learning-objectives">
                    <h4>What you'll learn:</h4>
                    <p>{game.learningObjectives}</p>
                  </div>
                )}
              </div>

              <div className="game-actions">
                <button 
                  className="play-button"
                  onClick={() => handleGameStart(game)}
                >
                  🎮 Play Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GamesDashboard;
