# DigLearners Platform

A comprehensive digital literacy platform designed specifically for Rwandan primary schools, implementing offline-first architecture with gamification and multilingual support.

## 🎯 Project Overview

DigLearners is a web-based platform that enhances foundational digital literacy in Rwandan primary schools through:

- **Offline-First Architecture**: Works seamlessly in low-bandwidth and rural areas
- **Gamification System**: Points, badges, levels, and leaderboards to motivate learning
- **Multilingual Support**: English and Kinyarwanda language options
- **Role-Based Access**: Separate interfaces for Learners, Teachers, Parents, and Administrators
- **Child-Friendly Design**: Large touch targets, high contrast, and accessibility features
- **Research Analytics**: Comprehensive data collection for educational research

## Architecture

The platform follows a three-tier architecture as defined in the UML diagrams:

### Backend (Node.js + Express + SQLite)
```
backend/
├── api/                 # API routes
│   ├── auth.js         # Authentication endpoints
│   ├── content.js      # Content management
│   └── learning.js     # Learning activities
├── models/             # Database models (ERD implementation)
│   ├── User.js         # User model
│   ├── LearningClass.js # Class model
│   ├── Lesson.js       # Lesson model
│   ├── Progress.js     # Progress tracking
│   ├── Badge.js        # Gamification badges
│   └── UserBadge.js    # User-badge relationships
├── middleware/          # Authentication & authorization
├── services/           # Business logic
└── utils/             # Utility functions
```

### Frontend (React + PWA)
```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── common/     # Shared components
│   │   ├── forms/      # Form components
│   │   └── layout/     # Layout components
│   ├── pages/          # Role-based pages
│   │   ├── admin/      # Admin interface
│   │   ├── teacher/    # Teacher interface
│   │   ├── learner/    # Student interface
│   │   └── parent/     # Parent interface
│   ├── contexts/       # React contexts
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   └── utils/          # Utility functions
```

## Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/diglearners/diglearners-platform.git
   cd diglearners-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

This will start:
- Backend API server on http://localhost:3001
- Frontend development server on http://localhost:3000

### Default Login Credentials

The system comes with pre-configured test accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | `admin@diglearners.rw` | `admin123` | Full platform access, user management, content creation |
| **Teacher** | `teacher@diglearners.rw` | `teacher123` | Class management, student oversight, lesson assignment |

**Note**: These are default credentials for development/testing. In production, these should be changed or removed.

### Production Build

```bash
npm run build
npm start
```

## Database Schema

The platform implements the Entity-Relationship Diagram (ERD) with the following entities:

### Core Entities
- **User**: Users with roles (Admin, Teacher, Learner, Parent)
- **LearningClass**: Classes managed by teachers
- **Lesson**: Educational content modules
- **Progress**: User progress tracking
- **Badge**: Gamification achievements
- **UserBadge**: User-badge relationships

### Relationships
- User ↔ LearningClass (Teacher-Class)
- User ↔ Progress (User-Progress)
- Lesson ↔ Progress (Lesson-Progress)
- User ↔ Badge (Many-to-Many via UserBadge)
- LearningClass ↔ Lesson (Many-to-Many via ClassLesson)

## Gamification System

### Levels
1. **Explorer** (0-99 points)
2. **Adventurer** (100-299 points)
3. **Pathfinder** (300-599 points)
4. **Innovator** (600-999 points)
5. **Mastermind** (1000-1499 points)
6. **Digital Guru** (1500+ points)

### Badge Categories
- **Achievement**: Lesson completion badges
- **Milestone**: Progress milestone badges
- **Special**: Unique accomplishment badges
- **Weekly**: Weekly activity badges
- **Monthly**: Monthly achievement badges

### Points System
- Lesson completion: 10-50 points
- Perfect scores: +25 bonus points
- Daily streaks: +5 points per day
- Badge earning: 10-100 points per badge

## Multilingual Support

### Supported Languages
- **English** (en): Primary language
- **Kinyarwanda** (rw): Local language support

### Translation Coverage
- Navigation and UI elements
- Lesson content and instructions
- Error messages and notifications
- Accessibility features
- Research dashboard

## Role-Based Access Control

### Learner Interface
- Access to lessons and learning activities
- Progress tracking and gamification
- Badge collection and achievements
- Offline learning capabilities

### Teacher Interface
- Class management and student oversight
- Lesson assignment and progress monitoring
- Analytics and reporting tools
- Content creation (Admin level)

### Parent Interface
- Child progress monitoring
- Achievement tracking
- Time spent analytics
- Weekly/monthly reports

### Admin Interface
- User management
- Content management
- Platform analytics
- System configuration
- Research data export

## PWA Features

### Offline-First Architecture
- Service Worker for caching
- IndexedDB for local storage
- Background sync for data synchronization
- Offline lesson access
- Progress tracking offline

### Mobile Optimization
- Responsive design for all devices
- Touch-friendly interface
- Large buttons and text
- High contrast mode
- Accessibility features

## 🔬 Research Analytics

### Data Collection
- User engagement metrics
- Learning progress tracking
- Accessibility feature usage
- Language preference patterns
- Offline/online usage patterns

### Export Capabilities
- JSON data export
- CSV report generation
- Real-time analytics dashboard
- Research-specific metrics

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm test            # Run tests
npm run lint        # Lint code
```

### Frontend Development
```bash
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm test           # Run tests
npm run lint       # Lint code
```

### Database Management
```bash
cd backend
npm run seed       # Seed initial data
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Content Management
- `GET /api/content/lessons` - Get all lessons
- `GET /api/content/lessons/:id` - Get lesson by ID
- `POST /api/content/lessons` - Create lesson (Admin)
- `PUT /api/content/lessons/:id` - Update lesson (Admin)

### Learning Activities
- `GET /api/learning/lessons` - Get available lessons
- `POST /api/learning/lessons/:id/progress` - Record progress
- `GET /api/learning/progress` - Get user progress
- `GET /api/learning/badges` - Get user badges

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Docker Deployment
```bash
npm run docker:build
npm run docker:up
```

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy backend to your server
3. Deploy frontend to your web server
4. Configure environment variables
5. Set up database

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Support

For support and questions:
- Email: support@diglearners.rw
- GitHub Issues: [Create an issue](https://github.com/diglearners/diglearners-platform/issues)

## 🙏 Acknowledgments

- Rwandan Ministry of Education
- Primary school teachers and students
- Digital literacy research community
- Open source contributors

---

**DigLearners Platform** - Empowering digital literacy in Rwandan primary schools through innovative technology and research-driven design.