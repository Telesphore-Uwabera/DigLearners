// Sample Data Seeder for DigLearners
const { User, Lesson, LearningClass, Progress, Badge } = require('../models');
const bcrypt = require('bcryptjs');

const sampleData = {
  // Sample Teachers
  teachers: [
    {
      fullName: 'Pierre Nkurunziza',
      email: 'pierre@diglearners.rw',
      password: 'teacher123',
      role: 'teacher',
      grade: 'Grade 3'
    },
    {
      fullName: 'Marie Claire',
      email: 'marie@diglearners.rw',
      password: 'teacher123',
      role: 'teacher',
      grade: 'Grade 4'
    }
  ],

  // Sample Students
  students: [
    {
      fullName: 'Alice Uwimana',
      email: 'alice@student.rw',
      password: 'student123',
      role: 'learner',
      grade: 'Grade 3',
      age: 8
    },
    {
      fullName: 'Jean Baptiste',
      email: 'jean@student.rw',
      password: 'student123',
      role: 'learner',
      grade: 'Grade 3',
      age: 8
    },
    {
      fullName: 'Grace Niyonsaba',
      email: 'grace@student.rw',
      password: 'student123',
      role: 'learner',
      grade: 'Grade 4',
      age: 9
    },
    {
      fullName: 'Peter Nkurunziza',
      email: 'peter@student.rw',
      password: 'student123',
      role: 'learner',
      grade: 'Grade 4',
      age: 9
    }
  ],


  // Sample Lessons
  lessons: [
    {
      title: 'Introduction to Digital Literacy',
      subject: 'Digital Literacy',
      grade: 'Grade 3',
      content: 'Welcome to digital literacy! In this lesson, you will learn about computers, tablets, and how to use them safely. We will explore basic computer parts, practice using a mouse and keyboard, and learn about safe online behavior.',
      description: 'Learn the basics of using computers and digital devices',
      moduleType: 'general',
      difficulty: 'beginner',
      estimatedDuration: 30,
      objectives: JSON.stringify([
        'Understand basic digital concepts',
        'Learn computer navigation',
        'Practice safe online behavior'
      ]),
      resources: JSON.stringify([
        'Interactive presentation',
        'Practice exercises',
        'Assessment quiz'
      ]),
      status: 'published'
    },
    {
      title: 'Safe Browsing Practices',
      subject: 'Safe Browsing',
      grade: 'Grade 4',
      content: 'Learn how to stay safe while browsing the internet. Discover important safety rules, learn about passwords, personal information, and safe websites. Practice identifying safe websites and recognizing online threats.',
      description: 'Learn how to stay safe while browsing the internet',
      moduleType: 'safety',
      difficulty: 'intermediate',
      estimatedDuration: 25,
      objectives: JSON.stringify([
        'Identify safe websites',
        'Recognize online threats',
        'Practice secure browsing'
      ]),
      resources: JSON.stringify([
        'Video tutorial',
        'Interactive scenarios',
        'Safety checklist'
      ]),
      status: 'published'
    },
    {
      title: 'Touch Typing Fundamentals',
      subject: 'Typing Skills',
      grade: 'Grade 5',
      content: 'Master the fundamental skills of using a keyboard. Learn proper finger placement, practice basic typing patterns, and build typing speed. Practice using the mouse to click, drag, and scroll.',
      description: 'Master the fundamental skills of using a mouse and keyboard',
      moduleType: 'typing',
      difficulty: 'beginner',
      estimatedDuration: 35,
      objectives: JSON.stringify([
        'Learn proper finger placement',
        'Practice basic typing patterns',
        'Build typing speed'
      ]),
      resources: JSON.stringify([
        'Typing exercises',
        'Speed tests',
        'Progress tracking'
      ]),
      status: 'published'
    },
    {
      title: 'Block Coding Basics',
      subject: 'Block Coding',
      grade: 'Grade 5',
      content: 'Start your coding journey with block programming! Learn to create simple programs using visual blocks. Understand basic programming concepts like sequences, loops, and conditions through fun, interactive activities.',
      description: 'Learn basic programming concepts using visual blocks',
      moduleType: 'coding',
      difficulty: 'beginner',
      estimatedDuration: 40,
      objectives: JSON.stringify([
        'Understand basic programming concepts',
        'Create simple programs with blocks',
        'Learn about sequences and loops'
      ]),
      resources: JSON.stringify([
        'Block coding platform',
        'Step-by-step tutorials',
        'Creative projects'
      ]),
      status: 'draft'
    }
  ],

  // Sample Badges
  badges: [
    {
      name: 'Fast Learner',
      description: 'Completed 5 lessons in one week',
      criteria: 'Complete 5 lessons within 7 days',
      icon: '🏆',
      points: 50,
      category: 'achievement'
    },
    {
      name: 'Digital Safety Champion',
      description: 'Completed all safety lessons',
      criteria: 'Complete all safety-related lessons',
      icon: '🛡️',
      points: 100,
      category: 'achievement'
    },
    {
      name: 'Typing Master',
      description: 'Achieved 30 WPM typing speed',
      criteria: 'Achieve 30 words per minute typing speed',
      icon: '⌨️',
      points: 75,
      category: 'achievement'
    },
    {
      name: 'Code Explorer',
      description: 'Completed first coding project',
      criteria: 'Complete your first coding project',
      icon: '💻',
      points: 60,
      category: 'achievement'
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create teachers
    console.log('👨‍🏫 Creating teachers...');
    const teachers = [];
    for (const teacherData of sampleData.teachers) {
      const { password, ...userData } = teacherData;
      const passwordHash = await bcrypt.hash(password, 12);
      const teacher = await User.create({
        ...userData,
        passwordHash
      });
      teachers.push(teacher);
      console.log(`✅ Created teacher: ${teacher.fullName}`);
    }

    // Create students
    console.log('👨‍🎓 Creating students...');
    const students = [];
    for (const studentData of sampleData.students) {
      const { password, ...userData } = studentData;
      const passwordHash = await bcrypt.hash(password, 12);
      const student = await User.create({
        ...userData,
        passwordHash
      });
      students.push(student);
      console.log(`✅ Created student: ${student.fullName}`);
    }


    // Create lessons
    console.log('📚 Creating lessons...');
    const lessons = [];
    for (let i = 0; i < sampleData.lessons.length; i++) {
      const lessonData = {
        ...sampleData.lessons[i],
        teacherId: teachers[i % teachers.length].id
      };
      const lesson = await Lesson.create(lessonData);
      lessons.push(lesson);
      console.log(`✅ Created lesson: ${lesson.title}`);
    }

    // Create badges
    console.log('🏆 Creating badges...');
    const badges = [];
    for (const badgeData of sampleData.badges) {
      const badge = await Badge.create(badgeData);
      badges.push(badge);
      console.log(`✅ Created badge: ${badge.name}`);
    }

    // Create learning classes
    console.log('🏫 Creating learning classes...');
    const classes = [];
    const classData = [
      {
        name: 'Digital Literacy Grade 3',
        subject: 'Digital Literacy',
        grade: 'Grade 3',
        teacherId: teachers[0].id,
        description: 'Introduction to digital literacy for Grade 3 students'
      },
      {
        name: 'Safe Browsing Grade 4',
        subject: 'Safe Browsing',
        grade: 'Grade 4',
        teacherId: teachers[1].id,
        description: 'Internet safety for Grade 4 students'
      }
    ];

    for (const clsData of classData) {
      const cls = await LearningClass.create(clsData);
      classes.push(cls);
      console.log(`✅ Created class: ${cls.name}`);
    }

    // Create some progress data
    console.log('📊 Creating progress data...');
    const progressData = [
      {
        userId: students[0].id,
        lessonId: lessons[0].id,
        progressPercentage: 85,
        score: 88,
        isCompleted: true,
        completedAt: new Date()
      },
      {
        userId: students[1].id,
        lessonId: lessons[0].id,
        progressPercentage: 92,
        score: 95,
        isCompleted: true,
        completedAt: new Date()
      },
      {
        userId: students[2].id,
        lessonId: lessons[1].id,
        progressPercentage: 78,
        score: 82,
        isCompleted: true,
        completedAt: new Date()
      }
    ];

    for (const progress of progressData) {
      await Progress.create(progress);
    }
    console.log(`✅ Created ${progressData.length} progress records`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`👨‍🏫 Teachers: ${teachers.length}`);
    console.log(`👨‍🎓 Students: ${students.length}`);
    console.log(`📚 Lessons: ${lessons.length}`);
    console.log(`🏆 Badges: ${badges.length}`);
    console.log(`🏫 Classes: ${classes.length}`);
    console.log(`📊 Progress Records: ${progressData.length}`);

    console.log('\n🔑 Default Login Credentials:');
    console.log('Teacher: pierre@diglearners.rw / teacher123');
    console.log('Student: alice@student.rw / student123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

module.exports = { seedDatabase, sampleData };
