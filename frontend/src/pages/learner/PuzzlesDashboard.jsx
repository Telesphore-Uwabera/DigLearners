import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import gamifiedApiService from '../../services/gamifiedApiService';
import { getContentByGrade } from '../../lib/contentFilter';
import './GamesDashboard.css';

const PuzzlesDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [initialized, setInitialized] = useState(false);

  const ageGroup = useMemo(() => {
    return location.state?.ageGroup || localStorage.getItem('selectedAgeGroup');
  }, [location.state?.ageGroup]);

  useEffect(() => {
    if (initialized) return;

    let initialContent = null;
    if (location.state?.content) {
      initialContent = location.state.content;
    } else {
      try {
        const stored = localStorage.getItem('ageGroupContent');
        initialContent = stored ? JSON.parse(stored) : [];
      } catch (e) {
        initialContent = [];
      }
    }

    if (initialContent && Array.isArray(initialContent) && initialContent.length > 0) {
      // Filter only puzzles
      let puzzlesOnly = initialContent.filter(item => 
        item.gameType?.toLowerCase() === 'puzzle'
      );
      
      // Apply grade-based filtering
      const userGrade = user?.grade || localStorage.getItem('userGrade');
      if (userGrade) {
        puzzlesOnly = getContentByGrade(puzzlesOnly, userGrade);
      }
      
      setContent(puzzlesOnly);
      setLoading(false);
      setInitialized(true);
    } else if (ageGroup) {
      fetchContent().then(() => setInitialized(true));
    } else {
      setError('No age group selected. Please go back and select your age group.');
      setLoading(false);
      setInitialized(true);
    }
  }, [ageGroup, initialized, location.state?.content]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError('');
      
      const currentAgeGroup = location.state?.ageGroup || localStorage.getItem('selectedAgeGroup');
      
      try {
        const response = await gamifiedApiService.getMyContent();
        const contentData = response.data || response;
        if (Array.isArray(contentData) && contentData.length > 0) {
          // Filter only puzzles
          let puzzlesOnly = contentData.filter(item => 
            item.gameType?.toLowerCase() === 'puzzle'
          );
          
          // Apply grade-based filtering
          const userGrade = response.userGrade || user?.grade || localStorage.getItem('userGrade');
          if (userGrade) {
            puzzlesOnly = getContentByGrade(puzzlesOnly, userGrade);
            localStorage.setItem('userGrade', userGrade);
          }
          
          setContent(puzzlesOnly);
          localStorage.setItem('userContent', JSON.stringify(contentData));
          return;
        } else {
          throw new Error('No content returned');
        }
      } catch (gradeError) {
        if (currentAgeGroup) {
          const response = await gamifiedApiService.getContentByAgeGroup(currentAgeGroup);
          const contentData = response.data || response;
          if (Array.isArray(contentData) && contentData.length > 0) {
            // Filter only puzzles
            let puzzlesOnly = contentData.filter(item => 
              item.gameType?.toLowerCase() === 'puzzle'
            );
            
            // Apply grade-based filtering if user has a grade
            const userGrade = user?.grade || localStorage.getItem('userGrade');
            if (userGrade) {
              puzzlesOnly = getContentByGrade(puzzlesOnly, userGrade);
            }
            
            setContent(puzzlesOnly);
            localStorage.setItem('ageGroupContent', JSON.stringify(contentData));
            return;
          }
        }
        throw new Error('No puzzles available');
      }
    } catch (err) {
      setError('Failed to load puzzles. Please try again.');
      console.error('Error fetching puzzles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleGameStart = (game) => {
    localStorage.setItem('selectedGame', JSON.stringify(game));
    window.location.href = `/dashboard/game/${game.id}`;
  };

  if (loading) {
    return (
      <div className="games-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading puzzles... 🧩</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops!</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchContent}>
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
          <h1>🧩 Fun Puzzles!</h1>
          <p>Challenge your brain with these cool puzzles! 🧠</p>
        </div>
      </div>

      <div className="games-grid">
        {content.length === 0 ? (
          <div className="no-games">
            <div className="no-games-icon">🧩</div>
            <h3>No puzzles yet!</h3>
            <p>More puzzles coming soon! 🎉</p>
          </div>
        ) : (
          content.map((puzzle) => (
            <div key={puzzle.id} className="game-card">
              <div className="game-header">
                <div className="game-icon">🧩</div>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(puzzle.difficulty) }}
                >
                  {puzzle.difficulty}
                </span>
              </div>

              <div className="game-content">
                <h3 className="game-title">{puzzle.title}</h3>
                <p className="game-description">{puzzle.description}</p>
                
                <div className="game-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⭐</span>
                    <span>{puzzle.pointsReward} points</span>
                  </div>
                </div>
              </div>

              <div className="game-actions">
                <button 
                  className="play-button"
                  onClick={() => handleGameStart(puzzle)}
                >
                  🧩 Let's Play!
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PuzzlesDashboard;

