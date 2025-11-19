/**
 * Validation Tests - Verify the platform meets initial problem statement requirements
 * 1. Teacher-managed, code-based login system
 * 2. Gamified lessons with diverse activity types
 * 3. Simple and secure access for young children
 */

const request = require('supertest');
const { app } = require('../server');
const { User, GamifiedContent, GamifiedProgress } = require('../models');
const { sequelize } = require('../models');

describe('Validation Tests - Problem Statement Requirements', () => {
  beforeAll(async () => {
    // Ensure we're using in-memory SQLite for tests
    process.env.NODE_ENV = 'test';
    process.env.DB_STORAGE = ':memory:';
    process.env.DB_DIALECT = '';
    process.env.DATABASE_URL = '';
    
    // Test database connection first
    try {
      await sequelize.authenticate();
      console.log('Test database connection established.');
    } catch (error) {
      console.error('Test database connection failed:', error);
      throw error;
    }
    
    // Sync database
    try {
      await sequelize.sync({ force: true });
      console.log('Test database synced successfully.');
    } catch (error) {
      console.error('Test database sync failed:', error);
      throw error;
    }
  }, 30000); // Increase timeout to 30 seconds

  afterAll(async () => {
    await sequelize.close();
  }, 10000);

  describe('Requirement 1: Teacher-Managed, Code-Based Login System', () => {
    test('should allow teachers to create student accounts with registration codes', async () => {
      // Create teacher
      const teacher = await User.create({
        fullName: 'Validation Teacher',
        email: 'validation@teacher.com',
        password: 'password123',
        role: 'teacher'
      });

      const teacherLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'teacher',
          email: 'validation@teacher.com',
          password: 'password123'
        });

      const teacherToken = teacherLoginResponse.body.token;

      // Teacher creates student with registration code
      const studentResponse = await request(app)
        .post('/api/teacher/register-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({
          fullName: 'Validation Student',
          grade: '3',
          age: 9
        });

      expect(studentResponse.status).toBe(201);
      expect(studentResponse.body.success).toBe(true);
      expect(studentResponse.body.data.registrationCode).toBeDefined();
      expect(studentResponse.body.data.registrationCode).toMatch(/^[A-Z0-9]{6}$/);
    });

    test('should allow students to login using only registration code (simple for kids)', async () => {
      // Create student with registration code
      const registrationCode = await User.generateUniqueRegistrationCode();
      await User.create({
        fullName: 'Simple Login Student',
        role: 'learner',
        grade: '3',
        age: 9,
        registrationCode
      });

      // Student logs in with only registration code (no email/password needed)
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'student',
          registrationCode: registrationCode
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.token).toBeDefined();
      expect(loginResponse.body.user.role).toBe('learner');
    });

    test('should ensure registration codes are unique and secure', async () => {
      const codes = new Set();
      
      for (let i = 0; i < 10; i++) {
        const code = await User.generateUniqueRegistrationCode();
        
        // Check uniqueness
        expect(codes.has(code)).toBe(false);
        codes.add(code);
        
        // Check format (6 alphanumeric characters)
        expect(code).toMatch(/^[A-Z0-9]{6}$/);
      }
    });
  });

  describe('Requirement 2: Gamified Lessons with Diverse Activity Types', () => {
    test('should support multiple game types', async () => {
      const gameTypes = ['puzzle', 'quiz', 'interactive', 'story', 'simulation', 'creative'];
      
      for (const gameType of gameTypes) {
        const game = await GamifiedContent.create({
          title: `${gameType} Game`,
          description: `A ${gameType} game`,
          grade: 'Grade 3',
          ageGroup: '7-8',
          gameType: gameType,
          difficulty: 'beginner',
          subject: 'Digital Literacy',
          content: { test: true },
          isActive: true
        });

        expect(game.gameType).toBe(gameType);
      }

      // Verify all types are stored
      const allGames = await GamifiedContent.findAll();
      const storedTypes = new Set(allGames.map(g => g.gameType));
      gameTypes.forEach(type => {
        expect(storedTypes.has(type)).toBe(true);
      });
    });

    test('should support grade-appropriate content', async () => {
      const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
      
      for (const grade of grades) {
        const game = await GamifiedContent.create({
          title: `Game for ${grade}`,
          description: `Content for ${grade}`,
          grade: grade,
          ageGroup: '7-8',
          gameType: 'puzzle',
          difficulty: 'beginner',
          subject: 'Math',
          content: {},
          isActive: true
        });

        expect(game.grade).toBe(grade);
      }

      // Verify games are grade-specific
      const grade3Games = await GamifiedContent.findAll({
        where: { grade: 'Grade 3' }
      });
      expect(grade3Games.length).toBeGreaterThan(0);
      grade3Games.forEach(game => {
        expect(game.grade).toBe('Grade 3');
      });
    });

    test('should support different difficulty levels', async () => {
      const difficulties = ['beginner', 'intermediate', 'advanced'];
      
      for (const difficulty of difficulties) {
        const game = await GamifiedContent.create({
          title: `${difficulty} Game`,
          description: `A ${difficulty} game`,
          grade: 'Grade 3',
          ageGroup: '7-8',
          gameType: 'quiz',
          difficulty: difficulty,
          subject: 'Math',
          content: {},
          isActive: true
        });

        expect(game.difficulty).toBe(difficulty);
      }
    });

    test('should support different subjects', async () => {
      const subjects = ['Digital Literacy', 'Math', 'Science', 'Language'];
      
      for (const subject of subjects) {
        const game = await GamifiedContent.create({
          title: `${subject} Game`,
          description: `A ${subject} game`,
          grade: 'Grade 3',
          ageGroup: '7-8',
          gameType: 'interactive',
          difficulty: 'beginner',
          subject: subject,
          content: {},
          isActive: true
        });

        expect(game.subject).toBe(subject);
      }
    });
  });

  describe('Requirement 3: Simple and Secure Access for Young Children', () => {
    test('should allow students to login with minimal information (only registration code)', async () => {
      const registrationCode = await User.generateUniqueRegistrationCode();
      await User.create({
        fullName: 'Simple Access Student',
        role: 'learner',
        grade: '3',
        age: 9,
        registrationCode
      });

      // Student only needs registration code - no email, password, or complex info
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          registrationCode: registrationCode
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
    });

    test('should validate registration code format to prevent errors', async () => {
      // Test invalid formats
      const invalidCodes = ['abc', '123', 'ABCDEFG', 'abc123', 'ABC-12'];
      
      for (const invalidCode of invalidCodes) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            loginType: 'student',
            registrationCode: invalidCode
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(['invalid_registration_code_format', 'student_not_found']).toContain(response.body.errorType);
      }
    });

    test('should provide clear error messages for young users', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'student',
          registrationCode: 'FAKE01'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
      // Error message should be clear and user-friendly
      expect(typeof response.body.error).toBe('string');
    });

    test('should ensure data persistence across sessions', async () => {
      // Create student
      const registrationCode = await User.generateUniqueRegistrationCode();
      const student = await User.create({
        fullName: 'Persistence Validation Student',
        role: 'learner',
        grade: '3',
        age: 9,
        registrationCode
      });

      // Create game
      const game = await GamifiedContent.create({
        title: 'Validation Game',
        description: 'Test game',
        grade: 'Grade 3',
        ageGroup: '7-8',
        gameType: 'puzzle',
        difficulty: 'beginner',
        subject: 'Math',
        content: {},
        isActive: true
      });

      // Student logs in and plays
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'student',
          registrationCode: registrationCode
        });

      const token = loginResponse.body.token;

      // Record progress
      await request(app)
        .post('/api/gamified/progress')
        .set('Authorization', `Bearer ${token}`)
        .send({
          contentId: game.id,
          score: 80,
          progressPercentage: 100,
          timeSpent: 200,
          isCompleted: true
        });

      // Verify student data persists
      const updatedStudent = await User.findByPk(student.id);
      expect(updatedStudent.totalPoints).toBeGreaterThan(0);

      // Verify progress persists
      const progress = await GamifiedProgress.findOne({
        where: { userId: student.id, contentId: game.id }
      });
      expect(progress).not.toBeNull();
      expect(progress.isCompleted).toBe(true);
    });
  });

  describe('Integration: Complete Platform Functionality', () => {
    test('should enable complete workflow: teacher manages students → students login → students play games', async () => {
      // 1. Teacher creates account and logs in
      const teacher = await User.create({
        fullName: 'Integration Validation Teacher',
        email: 'integration.val@teacher.com',
        password: 'password123',
        role: 'teacher'
      });

      const teacherLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'teacher',
          email: 'integration.val@teacher.com',
          password: 'password123'
        });

      const teacherToken = teacherLoginResponse.body.token;

      // 2. Teacher creates student accounts
      const student1Response = await request(app)
        .post('/api/teacher/register-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({
          fullName: 'Student 1',
          grade: '3',
          age: 9
        });

      const student2Response = await request(app)
        .post('/api/teacher/register-student')
        .set('Authorization', `Bearer ${teacherToken}`)
        .send({
          fullName: 'Student 2',
          grade: '4',
          age: 10
        });

      expect(student1Response.status).toBe(201);
      expect(student2Response.status).toBe(201);

      // 3. Create games for different grades
      const game1 = await GamifiedContent.create({
        title: 'Grade 3 Puzzle',
        description: 'Puzzle for Grade 3',
        grade: 'Grade 3',
        ageGroup: '7-8',
        gameType: 'puzzle',
        difficulty: 'beginner',
        subject: 'Math',
        content: {},
        isActive: true
      });

      const game2 = await GamifiedContent.create({
        title: 'Grade 4 Quiz',
        description: 'Quiz for Grade 4',
        grade: 'Grade 4',
        ageGroup: '9-10',
        gameType: 'quiz',
        difficulty: 'beginner',
        subject: 'Digital Literacy',
        content: {},
        isActive: true
      });

      // 4. Students login and access games
      const student1Login = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'student',
          registrationCode: student1Response.body.data.registrationCode
        });

      const student2Login = await request(app)
        .post('/api/auth/login')
        .send({
          loginType: 'student',
          registrationCode: student2Response.body.data.registrationCode
        });

      expect(student1Login.status).toBe(200);
      expect(student2Login.status).toBe(200);

      // 5. Students play games
      const student1Games = await request(app)
        .get('/api/gamified/my-content')
        .set('Authorization', `Bearer ${student1Login.body.token}`);

      const student2Games = await request(app)
        .get('/api/gamified/my-content')
        .set('Authorization', `Bearer ${student2Login.body.token}`);

      expect(student1Games.status).toBe(200);
      expect(student2Games.status).toBe(200);

      // Verify grade-appropriate content
      const student1GameIds = student1Games.body.data.map(g => g.id);
      const student2GameIds = student2Games.body.data.map(g => g.id);

      // Student 1 should see Grade 3 games
      expect(student1GameIds).toContain(game1.id);
      
      // Student 2 should see Grade 4 games
      expect(student2GameIds).toContain(game2.id);

      // 6. Students complete games and earn points
      await request(app)
        .post('/api/gamified/progress')
        .set('Authorization', `Bearer ${student1Login.body.token}`)
        .send({
          contentId: game1.id,
          score: 100,
          progressPercentage: 100,
          timeSpent: 300,
          isCompleted: true
        });

      const updatedStudent1 = await User.findByPk(student1Response.body.data.id);
      expect(updatedStudent1.totalPoints).toBeGreaterThan(0);
    });
  });
});

