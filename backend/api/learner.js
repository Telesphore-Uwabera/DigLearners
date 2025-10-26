// Learner API - Student dashboard and functionality endpoints
const express = require('express');
const { User, Lesson, Progress, Badge, UserBadge, GamifiedContent } = require('../models');
const { authenticateToken, requireLearner } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get learner dashboard data
router.get('/dashboard', authenticateToken, requireLearner, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user stats
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Get user's progress data
    const progressData = await Progress.findAll({
      where: { userId },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'pointsReward']
        }
      ]
    });

    // Calculate stats
    const totalPoints = user.totalPoints || 0;
    const completedLessons = progressData.filter(p => p.isCompleted).length;
    const totalLessons = progressData.length;
    const averageScore = progressData.length > 0 
      ? Math.round(progressData.reduce((sum, p) => sum + (p.score || 0), 0) / progressData.length)
      : 0;

    // Get recent badges
    const recentBadges = await UserBadge.findAll({
      where: { userId },
      include: [
        {
          model: Badge,
          as: 'badge',
          attributes: ['id', 'name', 'description', 'icon', 'points']
        }
      ],
      order: [['earnedAt', 'DESC']],
      limit: 3
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalPoints,
          badgesEarned: recentBadges.length,
          gamesCompleted: completedLessons,
          currentStreak: 0, // TODO: Implement streak calculation
          averageScore,
          totalLessons
        },
        recentBadges: recentBadges.map(ub => ({
          id: ub.badge.id,
          name: ub.badge.name,
          description: ub.badge.description,
          icon: ub.badge.icon,
          points: ub.badge.points,
          earnedAt: ub.earnedAt
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching learner dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching dashboard data'
    });
  }
});

// Get learner achievements and badges
router.get('/achievements', authenticateToken, requireLearner, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get all badges
    const allBadges = await Badge.findAll({
      order: [['points', 'DESC']]
    });

    // Get user's earned badges
    const earnedBadges = await UserBadge.findAll({
      where: { userId },
      include: [
        {
          model: Badge,
          as: 'badge',
          attributes: ['id', 'name', 'description', 'icon', 'points', 'category', 'criteria']
        }
      ],
      order: [['earnedAt', 'DESC']]
    });

    // Create earned badges map
    const earnedBadgeIds = new Set(earnedBadges.map(eb => eb.badge.id));

    // Separate earned and available badges
    const badges = allBadges.map(badge => ({
      id: badge.id,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      points: badge.points,
      category: badge.category,
      criteria: badge.criteria,
      isEarned: earnedBadgeIds.has(badge.id),
      earnedAt: earnedBadges.find(eb => eb.badge.id === badge.id)?.earnedAt || null
    }));

    const earned = badges.filter(b => b.isEarned);
    const available = badges.filter(b => !b.isEarned);

    res.json({
      success: true,
      data: {
        badges: {
          earned,
          available,
          total: badges.length,
          earnedCount: earned.length
        },
        achievements: earned.map(badge => ({
          id: badge.id,
          title: badge.name,
          description: badge.description,
          icon: badge.icon,
          points: badge.points,
          earnedAt: badge.earnedAt
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching learner achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching achievements'
    });
  }
});

// Get learner's gamified content based on grade
router.get('/my-content', authenticateToken, requireLearner, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user's grade
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Get content based on user's grade
    let whereClause = { isActive: true };
    
    if (user.grade) {
      whereClause.grade = user.grade;
    } else if (user.age) {
      // Map age to grade if grade is not set
      const ageToGrade = {
        6: 'Grade 1', 7: 'Grade 2', 8: 'Grade 3', 9: 'Grade 4',
        10: 'Grade 5', 11: 'Grade 6', 12: 'Grade 7', 13: 'Grade 8',
        14: 'Grade 9', 15: 'Grade 10', 16: 'Grade 11', 17: 'Grade 12'
      };
      const mappedGrade = ageToGrade[user.age];
      if (mappedGrade) {
        whereClause.grade = mappedGrade;
      }
    }

    const content = await GamifiedContent.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
      limit: 20
    });

    res.json({
      success: true,
      data: content.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        gameType: item.gameType,
        difficulty: item.difficulty,
        pointsReward: item.pointsReward,
        estimatedTime: item.estimatedTime,
        grade: item.grade,
        ageGroup: item.ageGroup,
        content: item.content,
        instructions: item.instructions,
        learningObjectives: item.learningObjectives
      }))
    });

  } catch (error) {
    console.error('Error fetching learner content:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching content'
    });
  }
});

// Update learner progress
router.post('/progress', authenticateToken, requireLearner, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lessonId, score, timeSpent, isCompleted } = req.body;

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        error: 'Lesson ID is required'
      });
    }

    // Find or create progress record
    let progress = await Progress.findOne({
      where: { userId, lessonId }
    });

    if (progress) {
      // Update existing progress
      await progress.update({
        score: score || progress.score,
        timeSpent: timeSpent || progress.timeSpent,
        isCompleted: isCompleted !== undefined ? isCompleted : progress.isCompleted,
        completionDate: isCompleted ? new Date() : progress.completionDate
      });
    } else {
      // Create new progress record
      progress = await Progress.create({
        userId,
        lessonId,
        score: score || 0,
        timeSpent: timeSpent || 0,
        isCompleted: isCompleted || false,
        completionDate: isCompleted ? new Date() : null
      });
    }

    // Update user's total points if lesson is completed
    if (isCompleted && score) {
      const user = await User.findByPk(userId);
      if (user) {
        await user.update({
          totalPoints: (user.totalPoints || 0) + (score * 10) // 10 points per score point
        });
      }
    }

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    });

  } catch (error) {
    console.error('Error updating learner progress:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error updating progress'
    });
  }
});

// Get learner's lesson progress
router.get('/progress', authenticateToken, requireLearner, async (req, res) => {
  try {
    const userId = req.user.userId;

    const progress = await Progress.findAll({
      where: { userId },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'moduleType', 'difficulty', 'estimatedDuration']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: progress.map(p => ({
        id: p.id,
        lessonId: p.lessonId,
        lesson: p.lesson,
        score: p.score,
        timeSpent: p.timeSpent,
        isCompleted: p.isCompleted,
        completionDate: p.completionDate,
        progressPercentage: p.progressPercentage,
        lastAccessedAt: p.lastAccessedAt
      }))
    });

  } catch (error) {
    console.error('Error fetching learner progress:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching progress'
    });
  }
});

module.exports = router;
