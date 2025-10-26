import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import gamifiedApiService from '../../services/gamifiedApiService';
import learnerApiService from '../../services/learnerApiService';

const LearnerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gamifiedContent, setGamifiedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    badgesEarned: 0,
    gamesCompleted: 0,
    currentStreak: 0
  });
  const [recentBadges, setRecentBadges] = useState([]);

  useEffect(() => {
    // Check if user has selected an age group
    const selectedAgeGroup = localStorage.getItem('selectedAgeGroup');
    if (!selectedAgeGroup) {
      // Redirect to age group selection
      navigate('/dashboard/age-select');
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user stats and recent badges
      const [statsResponse, badgesResponse] = await Promise.all([
        learnerApiService.getDashboardData().catch(() => ({ data: { stats: userStats } })),
        learnerApiService.getAchievements().catch(() => ({ data: { badges: [] } }))
      ]);

      setUserStats(statsResponse.data.stats || userStats);
      setRecentBadges((badgesResponse.data.badges || []).slice(0, 3));

      // Try to get user's grade-specific content first
      try {
        const response = await gamifiedApiService.getMyContent();
        setGamifiedContent(response.data.slice(0, 6)); // Show top 6 games
      } catch (gradeError) {
        // Fallback to age group content
        const ageGroup = localStorage.getItem('selectedAgeGroup');
        if (ageGroup) {
          const response = await gamifiedApiService.getContentByAgeGroup(ageGroup);
          setGamifiedContent(response.data.slice(0, 6)); // Show top 6 games
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
    // Navigate to the game player with the game data
    navigate(`/dashboard/game/${game.id}`, { state: { game } });
  };

  return (
    <div className="student-dashboard">
      {/* Simple Welcome */}
      <div className="simple-welcome">
        <h1>🎮 Choose Your Game!</h1>
      </div>

      {/* Games Grid - Main Focus */}
      <div className="main-games-section">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your games...</p>
        </div>
        ) : (
          <div className="games-grid">
            {gamifiedContent.length > 0 ? (
              gamifiedContent.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-icon-large">
                    {getGameTypeIcon(game.gameType)}
      </div>

                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  
                  <div className="game-rewards">
                    <div className="reward-item">
                      <span>⭐ {game.pointsReward} points</span>
                    </div>
                    <div className="reward-item">
                      <span>⏱️ {game.estimatedTime || 10} min</span>
          </div>
        </div>

                  <button 
                    className="play-button-large"
                    onClick={() => handleGameStart(game)}
                  >
                    🎮 PLAY NOW!
                  </button>
          </div>
              ))
            ) : (
              <div className="no-games">
                <div className="no-games-icon">🎮</div>
                <h3>Loading games...</h3>
                <p>Getting your fun games ready!</p>
        </div>
            )}
          </div>
        )}
        </div>

      {/* Simple Badges at Bottom */}
      <div className="simple-badges">
        <h2>🏆 My Badges</h2>
        <div className="badges-row">
          {recentBadges.slice(0, 3).map(badge => (
            <div key={badge.id} className="badge-simple">
              <div className="badge-icon">{badge.icon}</div>
              <span>{badge.title}</span>
          </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .student-dashboard {
            min-height: calc(100vh - 80px);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            font-family: 'Comic Sans MS', cursive, sans-serif;
          }

          .simple-welcome {
            text-align: center;
            margin-bottom: 2rem;
          }

          .simple-welcome h1 {
            color: white;
            font-size: 3rem;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }

          .main-games-section {
            margin-bottom: 2rem;
          }

          .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .game-card {
            background: white;
            border-radius: 25px;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            border: 4px solid transparent;
          }

          .game-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            border-color: #4facfe;
          }

          .game-icon-large {
            font-size: 5rem;
            margin-bottom: 1rem;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
          }

          .game-title {
            color: #2D3748;
            font-size: 1.5rem;
            margin: 0 0 1rem 0;
            font-weight: bold;
          }

          .game-description {
            color: #4A5568;
            margin: 0 0 1.5rem 0;
            font-size: 1rem;
            line-height: 1.4;
          }

          .game-rewards {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .reward-item {
            background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
            color: #2d3436;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
          }

          .play-button-large {
            background: linear-gradient(135deg, #00b894, #00cec9);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: bold;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            width: 100%;
          }

          .play-button-large:hover {
            background: linear-gradient(135deg, #00a085, #00b7b3);
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }

          .simple-badges {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 25px;
            text-align: center;
          }

          .simple-badges h2 {
            color: white;
            font-size: 2rem;
            margin: 0 0 1.5rem 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }

          .badges-row {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
          }

          .badge-simple {
            background: rgba(255,255,255,0.9);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            min-width: 100px;
            transition: all 0.3s ease;
          }

          .badge-simple:hover {
            transform: translateY(-5px);
            background: white;
          }

          .badge-simple .badge-icon {
            font-size: 2.5rem;
          }

          .badge-simple span {
            color: #2D3748;
            font-weight: bold;
            font-size: 0.9rem;
          }

          .loading-container {
            text-align: center;
            padding: 3rem;
            color: white;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255,255,255,0.3);
            border-top: 5px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .no-games {
            text-align: center;
            padding: 3rem;
            color: white;
            grid-column: 1 / -1;
          }

          .no-games-icon {
            font-size: 5rem;
            margin-bottom: 1rem;
          }

          .no-games h3 {
            font-size: 2rem;
            margin: 0 0 1rem 0;
          }

          .no-games p {
            font-size: 1.2rem;
            margin: 0;
          }

          @media (max-width: 768px) {
            .student-dashboard {
              padding: 1rem;
            }

            .simple-welcome h1 {
              font-size: 2.5rem;
            }

            .games-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .game-card {
              padding: 1.5rem;
            }

            .game-icon-large {
              font-size: 4rem;
            }

            .badges-row {
              flex-direction: column;
              align-items: center;
              gap: 1rem;
            }
          }
        `
      }} />
    </div>
  );
};

export default LearnerDashboard;
