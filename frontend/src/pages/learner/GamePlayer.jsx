import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './GamePlayer.css';

const GamePlayer = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState('intro'); // intro, playing, completed
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeStarted, setTimeStarted] = useState(null);

  useEffect(() => {
    // Get game data from localStorage or location state
    const gameData = location.state?.game || JSON.parse(localStorage.getItem('selectedGame') || 'null');
    
    if (gameData) {
      setGame(gameData);
      setLoading(false);
    } else {
      // If no game data, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [gameId, location.state, navigate]);

  const startGame = () => {
    setGameState('playing');
    setTimeStarted(Date.now());
  };

  const completeGame = (finalScore = 100) => {
    const timeSpent = timeStarted ? Math.round((Date.now() - timeStarted) / 1000) : 0;
    setScore(finalScore);
    setGameState('completed');
    
    // Save progress to localStorage (in a real app, this would be sent to the backend)
    const gameProgress = {
      gameId: game.id,
      title: game.title,
      score: finalScore,
      timeSpent,
      completedAt: new Date().toISOString(),
      pointsEarned: game.pointsReward || 10
    };
    
    const existingProgress = JSON.parse(localStorage.getItem('gameProgress') || '[]');
    existingProgress.push(gameProgress);
    localStorage.setItem('gameProgress', JSON.stringify(existingProgress));
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const renderGameContent = () => {
    if (!game) return null;

    switch (game.gameType) {
      case 'puzzle':
        return <PuzzleGame game={game} onComplete={completeGame} onProgress={setProgress} />;
      case 'quiz':
        return <QuizGame game={game} onComplete={completeGame} onProgress={setProgress} />;
      case 'interactive':
        return <InteractiveGame game={game} onComplete={completeGame} onProgress={setProgress} />;
      case 'story':
        return <StoryGame game={game} onComplete={completeGame} onProgress={setProgress} />;
      default:
        return <DefaultGame game={game} onComplete={completeGame} onProgress={setProgress} />;
    }
  };

  if (loading) {
    return (
      <div className="game-player">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Loading Game...</h2>
          <p>Getting your adventure ready!</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-player">
        <div className="error-screen">
          <div className="error-icon">😞</div>
          <h2>Game Not Found</h2>
          <p>Sorry, we couldn't find this game.</p>
          <button className="back-button" onClick={handleBackToDashboard}>
            🏠 Back to Games
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'intro') {
    return (
      <div className="game-player">
        <div className="game-intro">
          <div className="intro-header">
            <div className="game-icon-huge">
              {getGameTypeIcon(game.gameType)}
            </div>
            <h1>{game.title}</h1>
            <p className="game-description">{game.description}</p>
          </div>

          <div className="game-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-icon">🎯</span>
                <div>
                  <h3>Learning Goals</h3>
                  <p>{game.learningObjectives || 'Have fun while learning!'}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <h3>Time Needed</h3>
                  <p>{game.estimatedTime || 10} minutes</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">⭐</span>
                <div>
                  <h3>Points to Earn</h3>
                  <p>{game.pointsReward || 10} points</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🏆</span>
                <div>
                  <h3>Badge Reward</h3>
                  <p>{game.badgeReward || 'Completion Badge'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-actions">
            <button className="start-button" onClick={startGame}>
              🚀 Start Game!
            </button>
            <button className="back-button" onClick={handleBackToDashboard}>
              ← Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="game-player">
        <div className="completion-screen">
          <div className="completion-celebration">
            <div className="celebration-icon">🎉</div>
            <h1>Congratulations!</h1>
            <p>You completed <strong>{game.title}</strong>!</p>
          </div>

          <div className="completion-stats">
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <div>
                <h3>Score</h3>
                <p>{score}%</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🏆</span>
              <div>
                <h3>Points Earned</h3>
                <p>+{game.pointsReward || 10}</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎖️</span>
              <div>
                <h3>Badge Unlocked</h3>
                <p>{game.badgeReward || 'Game Master'}</p>
              </div>
            </div>
          </div>

          <div className="completion-actions">
            <button className="play-again-button" onClick={() => setGameState('intro')}>
              🔄 Play Again
            </button>
            <button className="back-button" onClick={handleBackToDashboard}>
              🏠 Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-player">
      <div className="game-header">
        <button className="exit-button" onClick={handleBackToDashboard}>
          ← Exit Game
        </button>
        <h2>{game.title}</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="game-content">
        {renderGameContent()}
      </div>
    </div>
  );
};

// Helper function to get game type icon
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

// Simple game components for different game types
const PuzzleGame = ({ game, onComplete, onProgress }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [solved, setSolved] = useState(false);

  const puzzles = [
    { question: "What comes next? 🐶 🐱 🐶 ?", answer: "🐱", options: ["🐶", "🐱", "🐭", "🐹"] },
    { question: "Which shape is different?", answer: "🔺", options: ["🔴", "🔴", "🔺", "🔴"] },
    { question: "Complete the pattern: 🌟 ⭐ 🌟 ?", answer: "⭐", options: ["🌟", "⭐", "💫", "✨"] }
  ];

  const handleAnswer = (answer) => {
    if (answer === puzzles[currentPuzzle].answer) {
      setSolved(true);
      onProgress(((currentPuzzle + 1) / puzzles.length) * 100);
      
      setTimeout(() => {
        if (currentPuzzle < puzzles.length - 1) {
          setCurrentPuzzle(currentPuzzle + 1);
          setSolved(false);
        } else {
          onComplete(100);
        }
      }, 1500);
    }
  };

  return (
    <div className="puzzle-game">
      <div className="puzzle-question">
        <h3>{puzzles[currentPuzzle].question}</h3>
      </div>
      
      {solved ? (
        <div className="correct-answer">
          <div className="success-icon">✅</div>
          <p>Correct! Well done!</p>
        </div>
      ) : (
        <div className="puzzle-options">
          {puzzles[currentPuzzle].options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      
      <div className="puzzle-progress">
        Puzzle {currentPuzzle + 1} of {puzzles.length}
      </div>
    </div>
  );
};

const QuizGame = ({ game, onComplete, onProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { question: "What should you do before crossing the street?", answer: "Look both ways", options: ["Run quickly", "Look both ways", "Close your eyes", "Jump"] },
    { question: "Which is a safe password?", answer: "MyDog123!", options: ["123", "password", "MyDog123!", "abc"] },
    { question: "What color means 'stop' in traffic lights?", answer: "Red", options: ["Green", "Yellow", "Red", "Blue"] }
  ];

  const handleAnswer = (answer) => {
    setAnswered(true);
    let newScore = score;
    
    if (answer === questions[currentQuestion].answer) {
      newScore = score + 1;
      setScore(newScore);
    }
    
    onProgress(((currentQuestion + 1) / questions.length) * 100);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
      } else {
        onComplete((newScore / questions.length) * 100);
      }
    }, 2000);
  };

  return (
    <div className="quiz-game">
      <div className="quiz-question">
        <h3>{questions[currentQuestion].question}</h3>
      </div>
      
      {answered ? (
        <div className="answer-feedback">
          <p>Good job! Moving to next question...</p>
        </div>
      ) : (
        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      
      <div className="quiz-progress">
        Question {currentQuestion + 1} of {questions.length} | Score: {score}
      </div>
    </div>
  );
};

const InteractiveGame = ({ game, onComplete, onProgress }) => {
  const [clicks, setClicks] = useState(0);
  const targetClicks = 10;

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    onProgress((newClicks / targetClicks) * 100);
    
    if (newClicks >= targetClicks) {
      setTimeout(() => onComplete(100), 1000);
    }
  };

  return (
    <div className="interactive-game">
      <h3>Click the button {targetClicks} times!</h3>
      <div className="click-area">
        <button className="click-button" onClick={handleClick}>
          🎯 Click Me! ({clicks}/{targetClicks})
        </button>
      </div>
      {clicks >= targetClicks && (
        <div className="completion-message">
          <p>🎉 Great job! You did it!</p>
        </div>
      )}
    </div>
  );
};

const StoryGame = ({ game, onComplete, onProgress }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const story = [
    { text: "Once upon a time, there was a brave little mouse...", image: "🐭" },
    { text: "The mouse wanted to learn about computers!", image: "💻" },
    { text: "First, the mouse learned to use a keyboard.", image: "⌨️" },
    { text: "Then, the mouse learned to browse safely online.", image: "🌐" },
    { text: "The mouse became a digital expert! The End.", image: "🏆" }
  ];

  const nextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onProgress((newPage / story.length) * 100);
    
    if (newPage >= story.length - 1) {
      setTimeout(() => onComplete(100), 2000);
    }
  };

  return (
    <div className="story-game">
      <div className="story-page">
        <div className="story-image">{story[currentPage].image}</div>
        <p className="story-text">{story[currentPage].text}</p>
      </div>
      
      {currentPage < story.length - 1 && (
        <button className="next-button" onClick={nextPage}>
          Next →
        </button>
      )}
      
      <div className="story-progress">
        Page {currentPage + 1} of {story.length}
      </div>
    </div>
  );
};

const DefaultGame = ({ game, onComplete, onProgress }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    onProgress((newStep / totalSteps) * 100);
    
    if (newStep >= totalSteps) {
      onComplete(100);
    }
  };

  return (
    <div className="default-game">
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      
      <div className="game-content">
        <p>Step {step + 1}: Learning about {game.subject}!</p>
        <div className="learning-content">
          {game.content ? (
            <div dangerouslySetInnerHTML={{ __html: game.content }} />
          ) : (
            <p>This is an interactive learning experience about {game.subject}.</p>
          )}
        </div>
      </div>
      
      {step < totalSteps && (
        <button className="continue-button" onClick={nextStep}>
          Continue Learning →
        </button>
      )}
    </div>
  );
};

export default GamePlayer;
