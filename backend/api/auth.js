// Authentication API - Based on Use Case Diagram
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// JWT Secret (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'diglearners-secret-key-2024';

// Register endpoint 
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role = 'learner', grade, age } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email, and password are required'
      });
    }

    // Prevent teacher registration through public endpoint
    if (role === 'teacher') {
      return res.status(403).json({ 
        success: false, 
        error: 'Teacher accounts can only be created by administrators' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Create user data object
    const userData = {
      fullName,
      email,
      password: password, // Will be hashed by model hook
      role
    };

    // Add grade and age if provided (for learners)
    if (grade) {
      userData.grade = grade;
    }
    if (age) {
      userData.age = parseInt(age);
    }

    // Create new user
    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully! Please login to continue.',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    });
  }
});

// Login endpoint - Handles both teacher and student login
router.post('/login', async (req, res) => {
  try {
    const { email, password, fullName, grade, loginType } = req.body;

    // Handle teacher login (email/password)
    if (loginType === 'teacher' || (!loginType && email && password && !fullName && !grade)) {
      // Validate input for teacher login
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required',
          errorType: 'missing_credentials'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address',
          errorType: 'invalid_email_format'
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'No account found with this email address. Please check your email or create a new account.',
          errorType: 'email_not_found'
        });
      }

      // Check if user is a teacher
      if (user.role !== 'teacher' && user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'This login method is only for teachers. Please use student login instead.',
          errorType: 'wrong_login_type'
        });
      }

      // Validate password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect password. Please try again or contact support if you need help.',
          errorType: 'incorrect_password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        user: user.toJSON(),
        token
      });
    }

    // Handle student login (question-based)
    if (loginType === 'student' || (!loginType && fullName && grade && email)) {
      // Validate input for student login
      if (!fullName || !grade || !email) {
        return res.status(400).json({
          success: false,
          error: 'Name, grade, and email are required for student login',
          errorType: 'missing_student_info'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address',
          errorType: 'invalid_email_format'
        });
      }

      // Find student by email, name, and grade
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          fullName: fullName.trim(),
          grade: grade,
          role: 'learner'
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'No student found with these details. Please check your information or ask your teacher to register you.',
          errorType: 'student_not_found'
        });
      }

      // Generate JWT token for student
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Student login successful',
        user: user.toJSON(),
        token
      });
    }

    // Invalid login request
    return res.status(400).json({
      success: false,
      error: 'Invalid login request. Please provide either teacher credentials (email/password) or student information (name/grade/email).',
      errorType: 'invalid_login_request'
    });

  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific database connection errors
    if (error.name === 'SequelizeConnectionError') {
      return res.status(503).json({
        success: false,
        error: 'Service temporarily unavailable. Please try again in a few moments.',
        errorType: 'service_unavailable'
      });
    }
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid login data provided',
        errorType: 'validation_error'
      });
    }
    
    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error during login. Please try again later.',
      errorType: 'server_error'
    });
  }
});

// Logout endpoint
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a more sophisticated implementation, you might want to blacklist the token
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during logout'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: ['badges', 'classes']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email already in use'
        });
      }
    }

    // Update user
    await user.update({
      fullName: fullName || user.fullName,
      email: email || user.email
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error updating profile'
    });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Validate current password
    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Update password
    await user.update({ passwordHash: newPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error changing password'
    });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user.toJSON(),
      valid: true
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error verifying token'
    });
  }
});

// Admin-only endpoint to create teacher accounts
router.post('/admin/create-teacher', authenticateToken, async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Only administrators can create teacher accounts'
      });
    }

    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Create teacher account
    const teacher = await User.create({
      fullName,
      email,
      passwordHash: password, // Will be hashed by model hook
      role: 'teacher'
    });

    res.status(201).json({
      success: true,
      message: 'Teacher account created successfully',
      user: teacher.toJSON()
    });
  } catch (error) {
    console.error('Teacher creation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error during teacher creation' 
    });
  }
});

module.exports = router;