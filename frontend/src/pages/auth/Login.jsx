// Login Page Component
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import TeacherLogin from './TeacherLogin'
import StudentLogin from './StudentLogin'

const Login = ({ onLogin }) => {
  const { t } = useLanguage()
  const location = useLocation()
  const [loginType, setLoginType] = useState(null) // 'teacher' or 'student'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Check URL parameters to auto-select login type
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const typeParam = urlParams.get('type')
    if (typeParam === 'student' || typeParam === 'teacher') {
      setLoginType(typeParam)
    }
  }, [location.search])

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

  const handleLoginTypeSelect = (type) => {
    setLoginType(type)
    setError('')
    setSuccess(false)
  }

  const handleBackToSelection = () => {
    setLoginType(null)
    setError('')
    setSuccess(false)
  }

  // Show login type selection if no type is selected
  if (!loginType) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1>DigLearners</h1>
            <p>Digital Literacy Platform</p>
          </div>
          
          <div className="login-type-selection">
            <h2>{t('auth.selectLoginType')}</h2>
            <p className="selection-subtitle">{t('auth.selectLoginSubtitle')}</p>
            
            <div className="login-type-buttons">
              <button 
                className="login-type-button teacher-button"
                onClick={() => handleLoginTypeSelect('teacher')}
              >
                <div className="button-icon">👨‍🏫</div>
                <div className="button-content">
                  <h3>{t('auth.teacherLogin')}</h3>
                  <p>{t('auth.teacherLoginDesc')}</p>
                </div>
              </button>
              
              <button 
                className="login-type-button student-button"
                onClick={() => handleLoginTypeSelect('student')}
              >
                <div className="button-icon">👨‍🎓</div>
                <div className="button-content">
                  <h3>{t('auth.studentLogin')}</h3>
                  <p>{t('auth.studentLoginDesc')}</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="login-footer">
            <p>Student not registered yet? <a href="/enroll">Register the student here</a></p>
          </div>
        </div>
      </div>
    )
  }

  // Show the appropriate login form based on selected type
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>DigLearners</h1>
          <p>Digital Literacy Platform</p>
        </div>
        
        <div className="back-button-container">
          <button 
            className="back-button"
            onClick={handleBackToSelection}
          >
            ← {t('common.back')}
          </button>
        </div>

        {loginType === 'teacher' ? (
          <TeacherLogin 
            onLogin={onLogin}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
          />
        ) : (
          <StudentLogin 
            onLogin={onLogin}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            success={success}
            setSuccess={setSuccess}
          />
        )}
        
        <div className="login-footer">
          <p>Student not registered yet? <a href="/enroll">Register the student here</a></p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Kid-Friendly Color Palette - Consistent with website */
          :root {
            --primary-color: #FF677D;      /* Vibrant Pink */
            --secondary-color: #F8B400;    /* Golden Yellow */
            --third-color: #B9FBC0;        /* Soft Mint Green */
            --accent-pink: #FFB3BA;        /* Light Pink */
            --accent-mauve: #D4A5A5;       /* Muted Rose */
            --text-dark: #2D3748;
            --text-light: #4A5568;
          }

          .login-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #FFB3BA, #B9FBC0);
            background-attachment: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            position: relative;
            overflow: hidden;
          }

          .login-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="10" r="1.2" fill="rgba(255,255,255,0.08)"/><circle cx="10" cy="60" r="0.8" fill="rgba(255,255,255,0.06)"/></svg>');
            animation: float 8s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            50% { 
              transform: translateY(-20px) rotate(5deg); 
            }
          }
          
          .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            position: relative;
            z-index: 2;
            animation: slideIn 0.6s ease-out;
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
          }
          
          .login-header h1 {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 3rem;
            margin-bottom: 0.5rem;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            animation: glow 2s ease-in-out infinite alternate;
          }

          @keyframes glow {
            from {
              filter: drop-shadow(0 0 5px rgba(255, 103, 125, 0.3));
            }
            to {
              filter: drop-shadow(0 0 15px rgba(255, 103, 125, 0.6));
            }
          }
          
          .login-header p {
            color: var(--text-light);
            font-size: 1.2rem;
            font-weight: 500;
          }
          
          .login-form h2 {
            color: var(--text-dark);
            margin-bottom: 1.5rem;
            text-align: center;
          }
          
          .form-group {
            margin-bottom: 1.5rem;
          }
          
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-dark);
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
            border-color: var(--primary-color);
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

          .success-message {
            background: linear-gradient(135deg, #d1fae5, #ecfdf5);
            color: #065f46;
            border: 2px solid #10b981;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
            animation: successSlide 0.5s ease-out;
          }

          @keyframes successSlide {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .success-icon {
            font-size: 1.5rem;
            margin-top: 0.125rem;
            flex-shrink: 0;
          }

          .success-content {
            flex: 1;
          }

          .success-title {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #065f46;
          }

          .success-text {
            font-size: 0.95rem;
            line-height: 1.4;
            color: #047857;
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

          .login-button.success {
            background: linear-gradient(135deg, #10b981, #059669) !important;
            transform: scale(1.02);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          }

          .loading-spinner {
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 0.5rem;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(107, 114, 128, 0.2);
          }
          
          .login-footer p {
            color: #6b7280;
            margin: 0;
            font-size: 0.95rem;
          }
          
          .login-footer a {
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
          }
          
          .login-footer a:hover {
            background: rgba(255, 103, 125, 0.1);
            transform: translateY(-1px);
          }

          /* Login Type Selection Styles */
          .login-type-selection {
            text-align: center;
            margin-bottom: 2rem;
          }

          .login-type-selection h2 {
            color: var(--text-dark);
            margin-bottom: 1rem;
            font-size: 2rem;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .selection-subtitle {
            color: var(--text-light);
            margin-bottom: 2.5rem;
            font-size: 1.1rem;
            line-height: 1.5;
          }

          .login-type-buttons {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .login-type-button {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 2rem;
            border: 3px solid #e5e7eb;
            border-radius: 20px;
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: left;
            position: relative;
            overflow: hidden;
          }

          .login-type-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
          }

          .login-type-button:hover::before {
            left: 100%;
          }

          .login-type-button:hover {
            border-color: var(--primary-color);
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 8px 30px rgba(255, 103, 125, 0.3);
          }

          .teacher-button {
            border-left: 6px solid var(--third-color);
          }

          .teacher-button:hover {
            background: linear-gradient(135deg, #f0fdf4, var(--third-color));
            border-color: var(--third-color);
            box-shadow: 0 8px 30px rgba(185, 251, 192, 0.4);
          }

          .student-button {
            border-left: 6px solid var(--secondary-color);
          }

          .student-button:hover {
            background: linear-gradient(135deg, #fffbeb, #fef3c7);
            border-color: var(--secondary-color);
            box-shadow: 0 8px 30px rgba(248, 180, 0, 0.4);
          }

          .button-icon {
            font-size: 3rem;
            flex-shrink: 0;
            animation: bounce 2s ease-in-out infinite;
          }

          .teacher-button .button-icon {
            animation-delay: 0s;
          }

          .student-button .button-icon {
            animation-delay: 0.5s;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { 
              transform: translateY(0); 
            }
            40% { 
              transform: translateY(-8px); 
            }
            60% { 
              transform: translateY(-4px); 
            }
          }

          .button-content h3 {
            margin: 0 0 0.75rem 0;
            color: var(--text-dark);
            font-size: 1.4rem;
            font-weight: bold;
            transition: color 0.3s ease;
          }

          .teacher-button:hover .button-content h3 {
            color: #047857;
          }

          .student-button:hover .button-content h3 {
            color: #d97706;
          }

          .button-content p {
            margin: 0;
            color: var(--text-light);
            font-size: 1rem;
            line-height: 1.4;
            transition: color 0.3s ease;
          }

          .teacher-button:hover .button-content p {
            color: #065f46;
          }

          .student-button:hover .button-content p {
            color: #92400e;
          }

          .back-button-container {
            margin-bottom: 1.5rem;
          }

          .back-button {
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            border: 2px solid #e5e7eb;
            color: #6b7280;
            cursor: pointer;
            font-size: 0.95rem;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .back-button:hover {
            color: var(--primary-color);
            border-color: var(--primary-color);
            background: linear-gradient(135deg, #fff5f5, #fef2f2);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 103, 125, 0.2);
          }

          @media (max-width: 768px) {
            .login-page {
              padding: 1rem;
            }

            .login-container {
              padding: 2rem;
              max-width: 100%;
              margin: 0 1rem;
            }

            .login-header h1 {
              font-size: 2.5rem;
            }

            .login-type-selection h2 {
              font-size: 1.6rem;
            }
            
            .login-type-button {
              padding: 1.5rem;
              gap: 1rem;
            }
            
            .button-icon {
              font-size: 2.5rem;
            }

            .button-content h3 {
              font-size: 1.2rem;
            }

            .button-content p {
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 1.5rem;
            }

            .login-header h1 {
              font-size: 2rem;
            }

            .login-type-selection h2 {
              font-size: 1.4rem;
            }
            
            .login-type-button {
              padding: 1.25rem;
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }
            
            .button-icon {
              font-size: 2.5rem;
            }

            .button-content h3 {
              font-size: 1.1rem;
            }

            .button-content p {
              font-size: 0.85rem;
            }

            .back-button {
              width: 100%;
              justify-content: center;
            }
          }
        `
      }} />
    </div>
  )
}

export default Login
