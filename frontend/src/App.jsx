// Main App Component - Role-based Architecture
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

// Context Providers
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Layout Components
import LoadingScreen from './components/layout/LoadingScreen'
import ErrorBoundary from './components/common/ErrorBoundary'

// Role-based App Components
import LearnerApp from './pages/learner/LearnerApp'
import TeacherApp from './pages/teacher/TeacherApp'
import AdminApp from './pages/admin/AdminApp'
import ParentApp from './pages/parent/ParentApp'

// Auth Components
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RoleSelector from './components/auth/RoleSelector'

// Public Components
import Home from './pages/public/Home'
import NotFound from './pages/public/NotFound'

// Services
import { authService } from './services/authService'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
          setSelectedRole(currentUser.role)
        } catch (error) {
          console.error('Auth check failed:', error)
          // If backend is not available, clear token and show public pages
          localStorage.removeItem('authToken')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('authToken')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const result = await authService.login(credentials)
      localStorage.setItem('authToken', result.token)
      setUser(result.user)
      setSelectedRole(result.user.role)
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message || 'Login failed. Please check if the backend server is running.' }
    }
  }

  const handleRegister = async (userData) => {
    try {
      const result = await authService.register(userData)
      localStorage.setItem('authToken', result.token)
      setUser(result.user)
      setSelectedRole(result.user.role)
      return { success: true }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error: error.message || 'Registration failed. Please check if the backend server is running.' }
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('authToken')
      setUser(null)
      setSelectedRole(null)
    }
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
  return (
      <ErrorBoundary error={error} onRetry={() => window.location.reload()} />
    )
  }

  // Show login/register if not authenticated
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider>
            <div className="auth-app">
        <Routes>
                <Route 
                  path="/login" 
                  element={<Login onLogin={handleLogin} />} 
                />
                <Route 
                  path="/register" 
                  element={<Register onRegister={handleRegister} />} 
                />
                <Route 
                  path="/" 
                  element={<Home />} 
                />
          <Route path="*" element={<NotFound />} />
        </Routes>
              <Toaster position="top-right" />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    )
  }

  // Show role selector if user is authenticated but no role selected
  if (user && !selectedRole) {
    return (
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider>
            <RoleSelector onRoleSelect={handleRoleSelect} />
            <Toaster position="top-right" />
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    )
  }

  // Render appropriate app based on user role
  const renderApp = () => {
    switch (selectedRole) {
      case 'learner':
        return <LearnerApp user={user} onLogout={handleLogout} />
      case 'teacher':
        return <TeacherApp user={user} onLogout={handleLogout} />
      case 'admin':
        return <AdminApp user={user} onLogout={handleLogout} />
      case 'parent':
        return <ParentApp user={user} onLogout={handleLogout} />
      default:
        return <RoleSelector onRoleSelect={handleRoleSelect} />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider value={{ user, setUser }}>
        <LanguageProvider>
          <ThemeProvider>
            <div className="main-app">
              {renderApp()}
    </div>
            <Toaster position="top-right" />
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App