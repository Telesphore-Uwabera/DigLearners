// Login Page Component
import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const Login = ({ onLogin }) => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true // Default to true for kids
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Helper functions for error handling
  const getErrorClass = (error) => {
    if (typeof error === 'string') {
      if (error.includes('email')) return 'error-email'
      if (error.includes('password')) return 'error-password'
      if (error.includes('account')) return 'error-account'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return 'error-network'
      if (error.includes('server') || error.includes('service')) return 'error-server'
      return 'error-general'
    }
    return 'error-general'
  }

  const getErrorIcon = (error) => {
    if (typeof error === 'string') {
      if (error.includes('email')) return '📧'
      if (error.includes('password')) return '🔒'
      if (error.includes('account')) return '👤'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return '🌐'
      if (error.includes('server') || error.includes('service')) return '🔧'
      return '⚠️'
    }
    return '⚠️'
  }

  const getErrorTitle = (error) => {
    if (typeof error === 'string') {
      if (error.includes('email')) return 'Email Issue'
      if (error.includes('password')) return 'Password Issue'
      if (error.includes('account')) return 'Account Issue'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return 'Connection Issue'
      if (error.includes('server') || error.includes('service')) return 'Server Issue'
      return 'Login Error'
    }
    return 'Login Error'
  }

  const getErrorSuggestion = (error) => {
    if (typeof error === 'string') {
      if (error.includes('email')) return '💡 Try checking your email address or create a new account'
      if (error.includes('password')) return '💡 Double-check your password or contact support for help'
      if (error.includes('account')) return '💡 Need help? Contact our support team'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return '💡 Check your internet connection and try again'
      if (error.includes('server') || error.includes('service')) return '💡 Our servers are temporarily busy. Please try again in a few minutes'
      return null
    }
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await onLogin(formData)
      if (!result.success) {
        setError(result.error || t('auth.loginError'))
      }
    } catch (err) {
      // Enhanced error handling for specific error types
      if (err.type) {
        setError(err.message)
      } else {
        setError(t('auth.loginError'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>DigLearners</h1>
          <p>Digital Literacy Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{t('auth.login')}</h2>
          
          {error && (
            <div className={`error-message ${getErrorClass(error)}`}>
              <div className="error-icon">
                {getErrorIcon(error)}
              </div>
              <div className="error-content">
                <div className="error-title">
                  {getErrorTitle(error)}
                </div>
                <div className="error-text">
                  {error}
                </div>
                {getErrorSuggestion(error) && (
                  <div className="error-suggestion">
                    {getErrorSuggestion(error)}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-group remember-me">
            <label className="remember-me-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="remember-me-checkbox"
              />
              <span className="checkmark"></span>
              <span className="remember-me-text">🔒 Keep me logged in (recommended for kids)</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('auth.login')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Haven't you enrolled your child yet? <a href="/enroll">Enroll your child here</a></p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .login-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #FFB3BA, #B9FBC0);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: 'Comic Sans MS', cursive, sans-serif;
          }
          
          .login-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 3rem;
            width: 100%;
            max-width: 400px;
          }
          
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .login-header h1 {
            color: #FF677D;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }
          
          .login-header p {
            color: #6b7280;
            font-size: 1.1rem;
          }
          
          .login-form h2 {
            color: #374151;
            margin-bottom: 1.5rem;
            text-align: center;
          }
          
          .form-group {
            margin-bottom: 1.5rem;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #374151;
            font-weight: 500;
          }
          
          .form-group input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.2s;
          }
          
          .form-group input:focus {
            outline: none;
            border-color: #FF677D;
          }
          
          .error-message {
            background: #fef2f2;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #fecaca;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .error-message.error-email {
            background: #fffbeb;
            border-color: #fed7aa;
            color: #ea580c;
          }

          .error-message.error-password {
            background: #fef2f2;
            border-color: #fecaca;
            color: #dc2626;
          }

          .error-message.error-account {
            background: #f0f9ff;
            border-color: #bfdbfe;
            color: #1d4ed8;
          }

          .error-message.error-network {
            background: #fef3c7;
            border-color: #fbbf24;
            color: #92400e;
          }

          .error-message.error-server {
            background: #f3e8ff;
            border-color: #c084fc;
            color: #6b21a8;
          }

          .error-icon {
            font-size: 1.5rem;
            margin-top: 0.125rem;
            flex-shrink: 0;
          }

          .error-content {
            flex: 1;
          }

          .error-title {
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .error-text {
            font-size: 0.875rem;
            line-height: 1.4;
            margin-bottom: 0.5rem;
          }

          .error-suggestion {
            font-size: 0.75rem;
            color: #6b7280;
            font-style: italic;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
          }
          
          .login-button {
            width: 100%;
            background: linear-gradient(135deg, #FF677D, #F8B400);
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 103, 125, 0.3);
          }
          
          .login-button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
          }
          
          .remember-me {
            margin-bottom: 1rem;
          }
          
          .remember-me-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.9rem;
            color: #4A5568;
          }
          
          .remember-me-checkbox {
            display: none;
          }
          
          .checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid #FF677D;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            background: white;
          }
          
          .remember-me-checkbox:checked + .checkmark {
            background: #FF677D;
            color: white;
          }
          
          .remember-me-checkbox:checked + .checkmark::after {
            content: '✓';
            font-weight: bold;
            font-size: 14px;
          }
          
          .remember-me-text {
            font-weight: 500;
          }
          
          .login-footer {
            text-align: center;
            margin-top: 1.5rem;
          }
          
          .login-footer p {
            color: #000000;
            margin: 0;
          }
          
          .login-footer a {
            color: #FF677D;
            text-decoration: none;
            font-weight: 600;
          }
          
          .login-footer a:hover {
            text-decoration: underline;
          }
        `
      }} />
    </div>
  )
}

export default Login
