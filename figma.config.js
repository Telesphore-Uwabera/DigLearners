module.exports = {
  // Figma Design System Configuration
  designSystem: {
    name: 'DigLearners',
    version: '1.0.0',
    colors: {
      primary: '#FF677D',
      secondary: '#F8B400',
      background: '#FFB3BA',
      backgroundSecondary: '#B9FBC0',
      text: '#2D3748',
      textSecondary: '#4A5568'
    },
    typography: {
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      sizes: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px'
      }
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px'
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '25px',
      full: '50%'
    }
  },
  
  // Component Mapping
  components: {
    'Home': 'src/pages/public/Home.jsx',
    'Login': 'src/pages/auth/Login.jsx',
    'Enroll': 'src/pages/auth/Register.jsx',
    'LearnerDashboard': 'src/pages/learner/LearnerDashboard.jsx',
    'ParentDashboard': 'src/pages/parent/ParentDashboard.jsx',
    'TeacherDashboard': 'src/pages/teacher/TeacherDashboard.jsx',
    'AdminDashboard': 'src/pages/admin/AdminDashboard.jsx',
    'Sidebar': 'src/components/layout/Sidebar.jsx',
    'AppLayout': 'src/components/layout/AppLayout.jsx'
  },
  
  // Responsive Breakpoints
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1440
  },
  
  // Export Settings
  export: {
    format: 'react',
    language: 'javascript',
    styling: 'css',
    bundler: 'vite'
  }
};
