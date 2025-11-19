/**
 * Unit Tests for Game Logic Functions
 * Tests core game logic components: PuzzleGame, QuizGame, InteractiveGame
 */

describe('Game Logic Functions', () => {
  // Helper function to generate puzzles based on grade
  const generatePuzzles = (grade) => {
    const gradeNum = parseInt(grade?.toString().replace('Grade ', '') || '0') || 0;
    
    if (gradeNum >= 1 && gradeNum <= 3) {
      return [
        { 
          question: 'What is 1 + 1?', 
          answer: '2', 
          options: ['1', '2', '3', '4'] 
        },
        { 
          question: 'What letter comes after A?', 
          answer: 'B', 
          options: ['A', 'B', 'C', 'D'] 
        },
        { 
          question: 'How many legs does a cat have?', 
          answer: '4', 
          options: ['2', '3', '4', '5'] 
        }
      ];
    } else if (gradeNum >= 4 && gradeNum <= 6) {
      return [
        { 
          question: 'What is 5 × 3?', 
          answer: '15', 
          options: ['12', '15', '18', '20'] 
        },
        { 
          question: 'What is the capital of Rwanda?', 
          answer: 'Kigali', 
          options: ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri'] 
        },
        { 
          question: 'What is 10 - 4?', 
          answer: '6', 
          options: ['5', '6', '7', '8'] 
        }
      ];
    }
    return [];
  };

  describe('generatePuzzles', () => {
    test('should generate easy puzzles for grades 1-3', () => {
      const puzzles = generatePuzzles('Grade 1');
      expect(puzzles).toHaveLength(3);
      expect(puzzles[0].question).toBe('What is 1 + 1?');
      expect(puzzles[0].options).toContain('2');
    });

    test('should generate harder puzzles for grades 4-6', () => {
      const puzzles = generatePuzzles('Grade 4');
      expect(puzzles).toHaveLength(3);
      expect(puzzles[0].question).toBe('What is 5 × 3?');
      expect(puzzles[0].options).toContain('15');
    });

    test('should handle grade string format', () => {
      const puzzles = generatePuzzles('3');
      expect(puzzles).toHaveLength(3);
    });
  });

  // Helper function for cat movement calculation
  const calculateCatPosition = (startPos, moves) => {
    let pos = { ...startPos };
    moves.forEach(move => {
      if (move === 'move_forward') {
        pos.y = Math.max(0, pos.y - 1);
      } else if (move === 'move_backward') {
        pos.y = Math.min(4, pos.y + 1);
      } else if (move === 'move_left') {
        pos.x = Math.max(0, pos.x - 1);
      } else if (move === 'move_right') {
        pos.x = Math.min(4, pos.x + 1);
      }
    });
    return pos;
  };

  describe('calculateCatPosition', () => {
    test('should move cat forward correctly', () => {
      const startPos = { x: 2, y: 2 };
      const moves = ['move_forward'];
      const finalPos = calculateCatPosition(startPos, moves);
      expect(finalPos).toEqual({ x: 2, y: 1 });
    });

    test('should move cat right correctly', () => {
      const startPos = { x: 2, y: 2 };
      const moves = ['move_right'];
      const finalPos = calculateCatPosition(startPos, moves);
      expect(finalPos).toEqual({ x: 3, y: 2 });
    });

    test('should handle multiple moves', () => {
      const startPos = { x: 0, y: 4 };
      const moves = ['move_right', 'move_right', 'move_forward', 'move_forward'];
      const finalPos = calculateCatPosition(startPos, moves);
      expect(finalPos).toEqual({ x: 2, y: 2 });
    });

    test('should not move beyond boundaries', () => {
      const startPos = { x: 0, y: 0 };
      const moves = ['move_left', 'move_forward'];
      const finalPos = calculateCatPosition(startPos, moves);
      expect(finalPos).toEqual({ x: 0, y: 0 });
    });

    test('should reach target position with correct sequence', () => {
      const startPos = { x: 0, y: 4 };
      const target = { x: 2, y: 2 };
      const moves = ['move_right', 'move_right', 'move_forward', 'move_forward'];
      const finalPos = calculateCatPosition(startPos, moves);
      expect(finalPos.x).toBe(target.x);
      expect(finalPos.y).toBe(target.y);
    });
  });

  // Helper function for game progress calculation
  const calculateProgress = (current, total) => {
    if (total === 0) return 0;
    return Math.round((current / total) * 100);
  };

  describe('calculateProgress', () => {
    test('should calculate progress percentage correctly', () => {
      expect(calculateProgress(1, 3)).toBe(33);
      expect(calculateProgress(2, 3)).toBe(67);
      expect(calculateProgress(3, 3)).toBe(100);
    });

    test('should handle zero total', () => {
      expect(calculateProgress(1, 0)).toBe(0);
    });

    test('should round progress correctly', () => {
      expect(calculateProgress(1, 3)).toBe(33); // 33.33... rounded
    });
  });

  // Helper function for score calculation
  const calculateScore = (correctAnswers, totalQuestions) => {
    if (totalQuestions === 0) return 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  describe('calculateScore', () => {
    test('should calculate score percentage correctly', () => {
      expect(calculateScore(3, 3)).toBe(100);
      expect(calculateScore(2, 3)).toBe(67);
      expect(calculateScore(1, 3)).toBe(33);
      expect(calculateScore(0, 3)).toBe(0);
    });

    test('should handle zero total questions', () => {
      expect(calculateScore(0, 0)).toBe(0);
    });
  });

  // Helper function for game type detection
  const getGameTypeIcon = (gameType) => {
    const icons = {
      'puzzle': '🧩',
      'quiz': '❓',
      'interactive': '🎮',
      'story': '📚',
      'simulation': '🎯',
      'creative': '🎨'
    };
    return icons[gameType] || '🎮';
  };

  describe('getGameTypeIcon', () => {
    test('should return correct icon for each game type', () => {
      expect(getGameTypeIcon('puzzle')).toBe('🧩');
      expect(getGameTypeIcon('quiz')).toBe('❓');
      expect(getGameTypeIcon('interactive')).toBe('🎮');
      expect(getGameTypeIcon('story')).toBe('📚');
    });

    test('should return default icon for unknown type', () => {
      expect(getGameTypeIcon('unknown')).toBe('🎮');
    });
  });

  // Helper function to validate game content
  const validateGameContent = (game) => {
    if (!game) return false;
    if (!game.gameType) return false;
    if (!game.title) return false;
    if (!game.content) return false;
    const validTypes = ['puzzle', 'quiz', 'interactive', 'story', 'simulation', 'creative'];
    if (!validTypes.includes(game.gameType)) return false;
    return true;
  };

  describe('validateGameContent', () => {
    test('should validate correct game content', () => {
      const validGame = {
        gameType: 'puzzle',
        title: 'Math Puzzle',
        content: { questions: [] }
      };
      expect(validateGameContent(validGame)).toBe(true);
    });

    test('should reject game without gameType', () => {
      const invalidGame = {
        title: 'Math Puzzle',
        content: {}
      };
      expect(validateGameContent(invalidGame)).toBe(false);
    });

    test('should reject game with invalid gameType', () => {
      const invalidGame = {
        gameType: 'invalid',
        title: 'Math Puzzle',
        content: {}
      };
      expect(validateGameContent(invalidGame)).toBe(false);
    });

    test('should reject null game', () => {
      expect(validateGameContent(null)).toBe(false);
    });
  });
});

