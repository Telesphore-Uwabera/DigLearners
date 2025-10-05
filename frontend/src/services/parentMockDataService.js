// Parent Dashboard Mock Data Service
// Comprehensive mock data for all parent dashboard pages

export const getParentDashboardData = () => {
  return {
    parent: {
      id: 'parent_001',
      name: 'Marie Uwimana',
      email: 'marie.uwimana@example.com',
      phone: '+250 788 123 456',
      joinDate: '2024-01-15',
      totalChildren: 2,
      totalLessonsCompleted: 24,
      totalBadges: 12,
      totalLearningTime: '15h 30m'
    },
    children: [
      {
        id: 'child_001',
        name: 'Alice Uwimana',
        age: 9,
        grade: 'Primary 4A',
        avatar: '👧',
        joinDate: '2024-01-20',
        totalLessons: 15,
        completedLessons: 12,
        badges: 7,
        points: 450,
        progress: 85,
        currentStreak: 5,
        lastActive: '2024-12-20',
        favoriteSubject: 'Digital Literacy',
        learningStyle: 'Visual',
        achievements: [
          {
            id: 'ach_001',
            title: 'First Steps',
            description: 'Completed first lesson',
            date: '2024-01-22',
            badge: '🥇'
          },
          {
            id: 'ach_002',
            title: 'Week Warrior',
            description: 'Completed 5 lessons in a week',
            date: '2024-02-15',
            badge: '⚡'
          }
        ],
        recentActivity: [
          {
            id: 'act_001',
            type: 'lesson_completed',
            title: 'Safe Browsing Basics',
            timestamp: '2024-12-20T14:30:00Z',
            points: 25
          },
          {
            id: 'act_002',
            type: 'badge_earned',
            title: 'Safety First Badge',
            timestamp: '2024-12-19T16:45:00Z',
            points: 50
          }
        ]
      },
      {
        id: 'child_002',
        name: 'John Mukasa',
        age: 10,
        grade: 'Primary 5B',
        avatar: '👦',
        joinDate: '2024-02-10',
        totalLessons: 12,
        completedLessons: 9,
        badges: 5,
        points: 380,
        progress: 78,
        currentStreak: 3,
        lastActive: '2024-12-19',
        favoriteSubject: 'Block Coding',
        learningStyle: 'Kinesthetic',
        achievements: [
          {
            id: 'ach_003',
            title: 'Code Explorer',
            description: 'Completed first coding lesson',
            date: '2024-02-12',
            badge: '💻'
          },
          {
            id: 'ach_004',
            title: 'Persistence Pro',
            description: 'Completed 3 lessons in a row',
            date: '2024-03-01',
            badge: '🔥'
          }
        ],
        recentActivity: [
          {
            id: 'act_003',
            type: 'lesson_completed',
            title: 'Introduction to Block Coding',
            timestamp: '2024-12-19T10:15:00Z',
            points: 30
          },
          {
            id: 'act_004',
            type: 'lesson_started',
            title: 'Advanced Block Coding',
            timestamp: '2024-12-18T15:20:00Z',
            points: 0
          }
        ]
      }
    ],
    overview: {
      totalChildren: 2,
      totalLessonsCompleted: 24,
      totalBadges: 12,
      totalLearningTime: '15h 30m',
      averageProgress: 82,
      activeChildren: 2,
      thisWeekActivity: 8,
      thisMonthActivity: 24
    }
  };
};

export const getChildrenOverviewData = () => {
  const dashboardData = getParentDashboardData();
  return {
    children: dashboardData.children,
    overview: dashboardData.overview,
    recentActivity: [
      {
        id: 'ra_001',
        childName: 'Alice Uwimana',
        activity: 'Completed Safe Browsing Basics',
        timestamp: '2024-12-20T14:30:00Z',
        type: 'lesson_completed',
        points: 25
      },
      {
        id: 'ra_002',
        childName: 'John Mukasa',
        activity: 'Earned Code Explorer badge',
        timestamp: '2024-12-19T16:45:00Z',
        type: 'badge_earned',
        points: 50
      },
      {
        id: 'ra_003',
        childName: 'Alice Uwimana',
        activity: 'Started Digital Citizenship',
        timestamp: '2024-12-19T09:15:00Z',
        type: 'lesson_started',
        points: 0
      }
    ]
  };
};

export const getProgressReportsData = () => {
  return {
    children: [
      {
        id: 'child_001',
        name: 'Alice Uwimana',
        grade: 'Primary 4A',
        avatar: '👧',
        overallProgress: 85,
        subjects: [
          {
            name: 'Digital Literacy',
            progress: 90,
            lessonsCompleted: 9,
            totalLessons: 10,
            lastActivity: '2024-12-20'
          },
          {
            name: 'Safe Browsing',
            progress: 80,
            lessonsCompleted: 4,
            totalLessons: 5,
            lastActivity: '2024-12-19'
          },
          {
            name: 'Typing Skills',
            progress: 75,
            lessonsCompleted: 3,
            totalLessons: 4,
            lastActivity: '2024-12-18'
          }
        ],
        weeklyProgress: [
          { week: 'Week 1', lessons: 2, time: '1h 30m' },
          { week: 'Week 2', lessons: 3, time: '2h 15m' },
          { week: 'Week 3', lessons: 4, time: '3h 00m' },
          { week: 'Week 4', lessons: 3, time: '2h 45m' }
        ],
        strengths: ['Quick learner', 'Good at problem solving', 'Enjoys visual learning'],
        areasForImprovement: ['Needs more practice with typing', 'Could focus more on advanced topics']
      },
      {
        id: 'child_002',
        name: 'John Mukasa',
        grade: 'Primary 5B',
        avatar: '👦',
        overallProgress: 78,
        subjects: [
          {
            name: 'Block Coding',
            progress: 85,
            lessonsCompleted: 6,
            totalLessons: 7,
            lastActivity: '2024-12-19'
          },
          {
            name: 'Digital Citizenship',
            progress: 70,
            lessonsCompleted: 3,
            totalLessons: 4,
            lastActivity: '2024-12-17'
          },
          {
            name: 'Online Safety',
            progress: 75,
            lessonsCompleted: 3,
            totalLessons: 4,
            lastActivity: '2024-12-16'
          }
        ],
        weeklyProgress: [
          { week: 'Week 1', lessons: 1, time: '45m' },
          { week: 'Week 2', lessons: 2, time: '1h 30m' },
          { week: 'Week 3', lessons: 3, time: '2h 15m' },
          { week: 'Week 4', lessons: 3, time: '2h 30m' }
        ],
        strengths: ['Creative thinking', 'Good at coding', 'Persistent'],
        areasForImprovement: ['Could improve reading comprehension', 'Needs more focus on safety topics']
      }
    ],
    summary: {
      totalChildren: 2,
      averageProgress: 82,
      totalLessonsCompleted: 24,
      totalLearningTime: '15h 30m',
      mostActiveChild: 'Alice Uwimana',
      topSubject: 'Digital Literacy'
    }
  };
};

export const getAchievementsData = () => {
  return {
    children: [
      {
        id: 'child_001',
        name: 'Alice Uwimana',
        avatar: '👧',
        totalBadges: 7,
        recentBadges: [
          {
            id: 'badge_001',
            title: 'Safety First',
            description: 'Completed all safety lessons',
            icon: '🛡️',
            date: '2024-12-20',
            category: 'Safety'
          },
          {
            id: 'badge_002',
            title: 'Digital Explorer',
            description: 'Explored 5 different digital topics',
            icon: '🔍',
            date: '2024-12-18',
            category: 'Exploration'
          }
        ],
        allBadges: [
          {
            id: 'badge_001',
            title: 'Safety First',
            description: 'Completed all safety lessons',
            icon: '🛡️',
            date: '2024-12-20',
            category: 'Safety',
            earned: true
          },
          {
            id: 'badge_002',
            title: 'Digital Explorer',
            description: 'Explored 5 different digital topics',
            icon: '🔍',
            date: '2024-12-18',
            category: 'Exploration',
            earned: true
          },
          {
            id: 'badge_003',
            title: 'Week Warrior',
            description: 'Completed 5 lessons in a week',
            icon: '⚡',
            date: '2024-12-15',
            category: 'Consistency',
            earned: true
          },
          {
            id: 'badge_004',
            title: 'First Steps',
            description: 'Completed first lesson',
            icon: '🥇',
            date: '2024-12-10',
            category: 'Milestone',
            earned: true
          },
          {
            id: 'badge_005',
            title: 'Typing Master',
            description: 'Achieved 30 WPM typing speed',
            icon: '⌨️',
            date: '2024-12-08',
            category: 'Skill',
            earned: true
          },
          {
            id: 'badge_006',
            title: 'Code Beginner',
            description: 'Completed first coding lesson',
            icon: '💻',
            date: '2024-12-05',
            category: 'Coding',
            earned: true
          },
          {
            id: 'badge_007',
            title: 'Digital Citizen',
            description: 'Learned about digital citizenship',
            icon: '🌐',
            date: '2024-12-01',
            category: 'Citizenship',
            earned: true
          }
        ]
      },
      {
        id: 'child_002',
        name: 'John Mukasa',
        avatar: '👦',
        totalBadges: 5,
        recentBadges: [
          {
            id: 'badge_008',
            title: 'Code Explorer',
            description: 'Completed first coding lesson',
            icon: '💻',
            date: '2024-12-19',
            category: 'Coding'
          },
          {
            id: 'badge_009',
            title: 'Persistence Pro',
            description: 'Completed 3 lessons in a row',
            icon: '🔥',
            date: '2024-12-17',
            category: 'Consistency'
          }
        ],
        allBadges: [
          {
            id: 'badge_008',
            title: 'Code Explorer',
            description: 'Completed first coding lesson',
            icon: '💻',
            date: '2024-12-19',
            category: 'Coding',
            earned: true
          },
          {
            id: 'badge_009',
            title: 'Persistence Pro',
            description: 'Completed 3 lessons in a row',
            icon: '🔥',
            date: '2024-12-17',
            category: 'Consistency',
            earned: true
          },
          {
            id: 'badge_010',
            title: 'Digital Learner',
            description: 'Completed 10 lessons',
            icon: '📚',
            date: '2024-12-14',
            category: 'Learning',
            earned: true
          },
          {
            id: 'badge_011',
            title: 'Safety Aware',
            description: 'Completed safety basics',
            icon: '🛡️',
            date: '2024-12-12',
            category: 'Safety',
            earned: true
          },
          {
            id: 'badge_012',
            title: 'First Steps',
            description: 'Completed first lesson',
            icon: '🥇',
            date: '2024-12-08',
            category: 'Milestone',
            earned: true
          }
        ]
      }
    ],
    summary: {
      totalBadges: 12,
      recentBadges: 4,
      topCategory: 'Safety',
      mostActiveChild: 'Alice Uwimana'
    }
  };
};

export const getScheduleData = () => {
  return {
    children: [
      {
        id: 'child_001',
        name: 'Alice Uwimana',
        avatar: '👧',
        schedule: [
          {
            id: 'sched_001',
            title: 'Digital Literacy - Lesson 3',
            subject: 'Digital Literacy',
            date: '2024-12-21',
            time: '10:00 AM',
            duration: '30 minutes',
            status: 'scheduled',
            type: 'lesson'
          },
          {
            id: 'sched_002',
            title: 'Typing Practice',
            subject: 'Typing Skills',
            date: '2024-12-22',
            time: '2:00 PM',
            duration: '20 minutes',
            status: 'scheduled',
            type: 'practice'
          },
          {
            id: 'sched_003',
            title: 'Safe Browsing - Lesson 2',
            subject: 'Safe Browsing',
            date: '2024-12-23',
            time: '11:00 AM',
            duration: '25 minutes',
            status: 'scheduled',
            type: 'lesson'
          }
        ]
      },
      {
        id: 'child_002',
        name: 'John Mukasa',
        avatar: '👦',
        schedule: [
          {
            id: 'sched_004',
            title: 'Block Coding - Advanced',
            subject: 'Block Coding',
            date: '2024-12-21',
            time: '3:00 PM',
            duration: '45 minutes',
            status: 'scheduled',
            type: 'lesson'
          },
          {
            id: 'sched_005',
            title: 'Digital Citizenship Review',
            subject: 'Digital Citizenship',
            date: '2024-12-22',
            time: '4:00 PM',
            duration: '30 minutes',
            status: 'scheduled',
            type: 'review'
          }
        ]
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        childName: 'Alice Uwimana',
        title: 'Digital Literacy - Lesson 3',
        date: '2024-12-21',
        time: '10:00 AM',
        type: 'lesson'
      },
      {
        id: 'upcoming_002',
        childName: 'John Mukasa',
        title: 'Block Coding - Advanced',
        date: '2024-12-21',
        time: '3:00 PM',
        type: 'lesson'
      }
    ],
    summary: {
      totalScheduled: 5,
      thisWeek: 3,
      nextWeek: 2,
      mostActiveDay: 'Friday'
    }
  };
};

export const getCommunicationData = () => {
  return {
    messages: [
      {
        id: 'msg_001',
        from: 'Teacher Sarah',
        subject: 'Alice\'s Progress Update',
        content: 'Alice is doing excellent work in Digital Literacy. She has completed 90% of her lessons and shows great understanding of the concepts.',
        date: '2024-12-20',
        time: '2:30 PM',
        read: false,
        priority: 'normal'
      },
      {
        id: 'msg_002',
        from: 'System',
        subject: 'John earned a new badge!',
        content: 'Congratulations! John has earned the "Code Explorer" badge for completing his first coding lesson.',
        date: '2024-12-19',
        time: '4:45 PM',
        read: true,
        priority: 'low'
      },
      {
        id: 'msg_003',
        from: 'Teacher David',
        subject: 'Weekly Progress Report',
        content: 'Both children are making great progress. Alice is ahead in Digital Literacy while John excels in Block Coding. Keep encouraging their learning!',
        date: '2024-12-18',
        time: '3:15 PM',
        read: true,
        priority: 'normal'
      }
    ],
    announcements: [
      {
        id: 'ann_001',
        title: 'New Digital Citizenship Module Available',
        content: 'We\'ve added a new module on Digital Citizenship. This will help children understand their rights and responsibilities online.',
        date: '2024-12-20',
        type: 'update'
      },
      {
        id: 'ann_002',
        title: 'Holiday Learning Challenge',
        content: 'Join our holiday learning challenge! Complete 5 lessons between Dec 20-31 to earn a special holiday badge.',
        date: '2024-12-19',
        type: 'challenge'
      }
    ],
    summary: {
      unreadMessages: 1,
      totalMessages: 3,
      recentAnnouncements: 2
    }
  };
};

export const getReportsData = () => {
  return {
    children: [
      {
        id: 'child_001',
        name: 'Alice Uwimana',
        avatar: '👧',
        reports: [
          {
            id: 'report_001',
            title: 'Monthly Progress Report',
            period: 'November 2024',
            overallGrade: 'A',
            subjects: [
              { name: 'Digital Literacy', grade: 'A+', progress: 90 },
              { name: 'Safe Browsing', grade: 'A', progress: 80 },
              { name: 'Typing Skills', grade: 'B+', progress: 75 }
            ],
            strengths: ['Quick learner', 'Good problem solving', 'Enjoys visual learning'],
            recommendations: ['Continue current pace', 'Try advanced typing exercises'],
            date: '2024-12-01'
          },
          {
            id: 'report_002',
            title: 'Weekly Activity Report',
            period: 'Week of Dec 16-20',
            lessonsCompleted: 3,
            timeSpent: '2h 15m',
            badgesEarned: 1,
            date: '2024-12-20'
          }
        ]
      },
      {
        id: 'child_002',
        name: 'John Mukasa',
        avatar: '👦',
        reports: [
          {
            id: 'report_003',
            title: 'Monthly Progress Report',
            period: 'November 2024',
            overallGrade: 'B+',
            subjects: [
              { name: 'Block Coding', grade: 'A', progress: 85 },
              { name: 'Digital Citizenship', grade: 'B', progress: 70 },
              { name: 'Online Safety', grade: 'B+', progress: 75 }
            ],
            strengths: ['Creative thinking', 'Good at coding', 'Persistent'],
            recommendations: ['Focus on reading comprehension', 'Practice safety topics more'],
            date: '2024-12-01'
          },
          {
            id: 'report_004',
            title: 'Weekly Activity Report',
            period: 'Week of Dec 16-20',
            lessonsCompleted: 2,
            timeSpent: '1h 45m',
            badgesEarned: 1,
            date: '2024-12-20'
          }
        ]
      }
    ],
    summary: {
      totalReports: 4,
      recentReports: 2,
      averageGrade: 'A-',
      mostImproved: 'Alice Uwimana'
    }
  };
};
