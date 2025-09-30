// DigLearners Backend Server
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Import models and initialize database
const { initializeDatabase } = require('./models');

// Import API routes
const authRoutes = require('./api/auth');
const contentRoutes = require('./api/content');
const learningRoutes = require('./api/learning');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'DigLearners API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/learning', learningRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'DigLearners API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login user',
        'POST /api/auth/logout': 'Logout user',
        'GET /api/auth/profile': 'Get user profile',
        'PUT /api/auth/profile': 'Update user profile',
        'PUT /api/auth/change-password': 'Change password',
        'GET /api/auth/verify': 'Verify token'
      },
      content: {
        'GET /api/content/lessons': 'Get all lessons',
        'GET /api/content/lessons/:id': 'Get lesson by ID',
        'POST /api/content/lessons': 'Create lesson (Admin)',
        'PUT /api/content/lessons/:id': 'Update lesson (Admin)',
        'DELETE /api/content/lessons/:id': 'Delete lesson (Admin)',
        'GET /api/content/classes': 'Get learning classes',
        'GET /api/content/classes/:id': 'Get class by ID',
        'POST /api/content/classes': 'Create class (Teacher/Admin)',
        'POST /api/content/classes/:classId/lessons/:lessonId': 'Assign lesson to class',
        'GET /api/content/classes/:id/lessons': 'Get lessons for class',
        'GET /api/content/lessons/:id/stats': 'Get lesson statistics'
      },
      learning: {
        'GET /api/learning/lessons': 'Get available lessons for learner',
        'GET /api/learning/lessons/:id': 'Get lesson content',
        'POST /api/learning/lessons/:id/progress': 'Record lesson progress',
        'GET /api/learning/progress': 'Get user progress summary',
        'GET /api/learning/badges': 'Get user badges',
        'GET /api/learning/badges/available': 'Get available badges',
        'GET /api/learning/activities': 'Get gamified activities',
        'GET /api/learning/classes': 'Get user classes',
        'POST /api/learning/classes/:classId/join': 'Join class',
        'GET /api/learning/children/:childId/progress': 'Get child progress (Parent)'
      }
    },
    authentication: {
      type: 'Bearer Token',
      header: 'Authorization: Bearer <token>',
      note: 'Include the token in the Authorization header for protected routes'
    },
    roles: {
      admin: 'Full system access',
      teacher: 'Class and lesson management',
      learner: 'Learning activities and progress',
      parent: 'Child progress monitoring'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      error: 'Duplicate entry',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /api',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/content/lessons',
      'GET /api/learning/lessons'
    ]
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 DigLearners API server running on port ${PORT}`);
      console.log(`📚 Health check: http://localhost:${PORT}/health`);
      console.log(`📖 API docs: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();
