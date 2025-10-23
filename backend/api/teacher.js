// Teacher API - Real data endpoints for teacher dashboard
const express = require('express');
const { Lesson, LearningClass, Progress, User, ClassLesson } = require('../models');
const { authenticateToken, requireTeacher } = require('../middleware/auth');

const router = express.Router();

// Get teacher dashboard data
router.get('/dashboard', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    
    // Get teacher's classes
    const classes = await LearningClass.findAll({
      where: { teacherId },
      include: [
        {
          model: User,
          as: 'students',
          through: { attributes: [] }
        }
      ]
    });

    // Get teacher's lessons
    const lessons = await Lesson.findAll({
      where: { teacherId },
      order: [['createdAt', 'DESC']]
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentProgress = await Progress.findAll({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: sevenDaysAgo
        }
      },
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['id', 'title']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Calculate statistics
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students.length, 0);
    const totalLessons = lessons.length;
    const publishedLessons = lessons.filter(l => l.status === 'published').length;
    const draftLessons = lessons.filter(l => l.status === 'draft').length;

    // Calculate average progress
    const allProgress = await Progress.findAll({
      include: [
        {
          model: Lesson,
          as: 'lesson',
          where: { teacherId }
        }
      ]
    });

    const averageProgress = allProgress.length > 0 
      ? Math.round(allProgress.reduce((sum, p) => sum + p.progressPercentage, 0) / allProgress.length)
      : 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalStudents,
          totalLessons,
          publishedLessons,
          draftLessons,
          averageProgress
        },
        classes,
        lessons: lessons.slice(0, 5), // Recent lessons
        recentActivity: recentProgress
      }
    });

  } catch (error) {
    console.error('Error fetching teacher dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching dashboard data'
    });
  }
});

// Get teacher's lessons
router.get('/lessons', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { status, subject, grade } = req.query;

    const whereClause = { teacherId };
    if (status && status !== 'all') whereClause.status = status;
    if (subject && subject !== 'all') whereClause.subject = subject;
    if (grade && grade !== 'all') whereClause.grade = grade;

    const lessons = await Lesson.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    // Get progress data for each lesson
    const lessonsWithProgress = await Promise.all(lessons.map(async (lesson) => {
      const progress = await Progress.findAll({
        where: { lessonId: lesson.id },
        include: [
          {
            model: User,
            as: 'student',
            attributes: ['id', 'name']
          }
        ]
      });

      const completedCount = progress.filter(p => p.isCompleted).length;
      const totalStudents = progress.length;
      const averageScore = progress.length > 0 
        ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
        : 0;

      return {
        ...lesson.toJSON(),
        studentsCompleted: completedCount,
        totalStudents,
        averageScore
      };
    }));

    res.json({
      success: true,
      lessons: lessonsWithProgress
    });

  } catch (error) {
    console.error('Error fetching teacher lessons:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching lessons'
    });
  }
});

// Create new lesson
router.post('/lessons', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const {
      title,
      subject,
      grade,
      content,
      description,
      difficulty = 'beginner',
      estimatedDuration,
      objectives = [],
      resources = []
    } = req.body;

    // Validate required fields
    if (!title || !subject || !grade || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title, subject, grade, and content are required'
      });
    }

    const lesson = await Lesson.create({
      title,
      subject,
      grade,
      content,
      description,
      difficulty,
      estimatedDuration,
      objectives: JSON.stringify(objectives),
      resources: JSON.stringify(resources),
      teacherId,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      lesson: lesson.toJSON()
    });

  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error creating lesson'
    });
  }
});

// Update lesson
router.put('/lessons/:id', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const lessonId = req.params.id;
    const updateData = req.body;

    // Check if lesson belongs to teacher
    const lesson = await Lesson.findOne({
      where: { id: lessonId, teacherId }
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found or access denied'
      });
    }

    // Update lesson
    await lesson.update(updateData);

    res.json({
      success: true,
      lesson: lesson.toJSON()
    });

  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error updating lesson'
    });
  }
});

// Publish lesson
router.post('/lessons/:id/publish', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const lessonId = req.params.id;

    const lesson = await Lesson.findOne({
      where: { id: lessonId, teacherId }
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found or access denied'
      });
    }

    await lesson.update({ status: 'published' });

    res.json({
      success: true,
      message: 'Lesson published successfully'
    });

  } catch (error) {
    console.error('Error publishing lesson:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error publishing lesson'
    });
  }
});

// Delete lesson
router.delete('/lessons/:id', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const lessonId = req.params.id;

    const lesson = await Lesson.findOne({
      where: { id: lessonId, teacherId }
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found or access denied'
      });
    }

    await lesson.destroy();

    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error deleting lesson'
    });
  }
});

// Get teacher's students
router.get('/students', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { grade, status } = req.query;

    // Get teacher's classes
    const classes = await LearningClass.findAll({
      where: { teacherId },
      include: [
        {
          model: User,
          as: 'students',
          through: { attributes: [] },
          where: { role: 'learner' }
        }
      ]
    });

    // Flatten students from all classes
    let students = [];
    classes.forEach(cls => {
      students = students.concat(cls.students);
    });

    // Filter by grade if specified
    if (grade && grade !== 'all') {
      students = students.filter(student => student.grade === grade);
    }

    // Get progress data for each student
    const studentsWithProgress = await Promise.all(students.map(async (student) => {
      const progress = await Progress.findAll({
        where: { userId: student.id },
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'title', 'subject']
          }
        ]
      });

      const completedLessons = progress.filter(p => p.isCompleted).length;
      const totalLessons = progress.length;
      const averageScore = progress.length > 0 
        ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
        : 0;

      return {
        ...student.toJSON(),
        completedLessons,
        totalLessons,
        averageScore,
        lastActive: progress.length > 0 ? progress[0].updatedAt : null
      };
    }));

    res.json({
      success: true,
      students: studentsWithProgress
    });

  } catch (error) {
    console.error('Error fetching teacher students:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching students'
    });
  }
});

// Get analytics data
router.get('/analytics', authenticateToken, requireTeacher, async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { period = 'week' } = req.query;

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get lesson performance
    const lessons = await Lesson.findAll({
      where: { teacherId },
      include: [
        {
          model: Progress,
          as: 'progress',
          where: {
            createdAt: {
              [require('sequelize').Op.gte]: startDate
            }
          },
          required: false
        }
      ]
    });

    // Calculate analytics
    const totalLessons = lessons.length;
    const totalStudents = await User.count({
      where: { role: 'learner' },
      include: [
        {
          model: LearningClass,
          as: 'classes',
          where: { teacherId }
        }
      ]
    });

    const totalProgress = await Progress.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: startDate
        }
      },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          where: { teacherId }
        }
      ]
    });

    const completedProgress = await Progress.count({
      where: {
        isCompleted: true,
        createdAt: {
          [require('sequelize').Op.gte]: startDate
        }
      },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          where: { teacherId }
        }
      ]
    });

    const completionRate = totalProgress > 0 ? Math.round((completedProgress / totalProgress) * 100) : 0;

    res.json({
      success: true,
      analytics: {
        totalLessons,
        totalStudents,
        totalProgress,
        completedProgress,
        completionRate,
        period
      }
    });

  } catch (error) {
    console.error('Error fetching teacher analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error fetching analytics'
    });
  }
});

module.exports = router;
