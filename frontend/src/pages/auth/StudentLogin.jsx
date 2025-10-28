// Student Login Component - Question-based Authentication
import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

const StudentLogin = ({ 
  onLogin, 
  loading, 
  setLoading, 
  error, 
  setError, 
  success, 
  setSuccess 
}) => {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    grade: '',
    registrationCode: '',
    loginType: 'student'
  })

  const grades = [
    { value: 'Grade 1', label: t('grades.grade1') },
    { value: 'Grade 2', label: t('grades.grade2') },
    { value: 'Grade 3', label: t('grades.grade3') },
    { value: 'Grade 4', label: t('grades.grade4') },
    { value: 'Grade 5', label: t('grades.grade5') },
    { value: 'Grade 6', label: t('grades.grade6') }
  ]

  // Helper functions for error handling
  const getErrorClass = (error) => {
    if (typeof error === 'string') {
      if (error.includes('name')) return 'error-name'
      if (error.includes('grade')) return 'error-grade'
      if (error.includes('registration') || error.includes('code')) return 'error-code'
      if (error.includes('student') || error.includes('found')) return 'error-account'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return 'error-network'
      if (error.includes('server') || error.includes('service')) return 'error-server'
      return 'error-general'
    }
    return 'error-general'
  }

  const getErrorIcon = (error) => {
    if (typeof error === 'string') {
      if (error.includes('name')) return '👤'
      if (error.includes('grade')) return '📚'
      if (error.includes('registration') || error.includes('code')) return '🔢'
      if (error.includes('student') || error.includes('found')) return '🔍'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return '🌐'
      if (error.includes('server') || error.includes('service')) return '🔧'
      return '⚠️'
    }
    return '⚠️'
  }

  const getErrorTitle = (error) => {
    if (typeof error === 'string') {
      if (error.includes('name')) return 'Name Issue'
      if (error.includes('grade')) return 'Grade Issue'
      if (error.includes('registration') || error.includes('code')) return 'Registration Code Issue'
      if (error.includes('student') || error.includes('found')) return 'Student Not Found'
      if (error.includes('network') || error.includes('connection') || error.includes('timeout')) return 'Connection Issue'
      if (error.includes('server') || error.includes('service')) return 'Server Issue'
      return 'Login Error'
    }
    return 'Login Error'
  }

  const getErrorSuggestion = (error) => {
    if (typeof error === 'string') {
      if (error.includes('name')) return '💡 Make sure to enter your full name as registered'
      if (error.includes('grade')) return '💡 Select the grade you are currently in'
      if (error.includes('registration') || error.includes('code')) return '💡 Check your registration code carefully - it should be 6 characters'
      if (error.includes('student') || error.includes('found')) return '💡 Ask your teacher to register you first'
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
    setError('') // Clear error when user starts typing
  }

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && !formData.fullName.trim()) {
      setError(t('auth.student.nameRequired'))
      return
    }
    if (currentStep === 2 && !formData.grade) {
      setError(t('auth.student.gradeRequired'))
      return
    }
      if (currentStep === 3 && !formData.registrationCode.trim()) {
        setError(t('auth.student.codeRequired'))
        return
      }

    setError('')
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    if (!formData.fullName.trim()) {
      setError(t('auth.student.nameRequired'))
      setCurrentStep(1)
      return
    }
    if (!formData.grade) {
      setError(t('auth.student.gradeRequired'))
      setCurrentStep(2)
      return
    }
    if (!formData.registrationCode.trim()) {
      setError(t('auth.student.codeRequired'))
      setCurrentStep(3)
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await onLogin(formData)
      if (!result.success) {
        setError(result.error || t('auth.loginError'))
      } else {
        setSuccess(true)
        // Show success message briefly before redirect
        setTimeout(() => {
          // The redirect will be handled by the auth context
        }, 1500)
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="question-step">
            <div className="step-header">
              <div className="step-number">1</div>
              <h3>{t('auth.student.question1')}</h3>
              <p className="step-description">{t('auth.student.question1Desc')}</p>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('auth.student.namePlaceholder')}
                className="question-input"
                autoFocus
              />
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="question-step">
            <div className="step-header">
              <div className="step-number">2</div>
              <h3>{t('auth.student.question2')}</h3>
              <p className="step-description">{t('auth.student.question2Desc')}</p>
            </div>
            <div className="form-group">
              <div className="grade-options">
                {grades.map((grade) => (
                  <button
                    key={grade.value}
                    type="button"
                    className={`grade-option ${formData.grade === grade.value ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, grade: grade.value })}
                  >
                    <span className="grade-icon">📚</span>
                    <span className="grade-text">{grade.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="question-step">
            <div className="step-header">
              <div className="step-number">3</div>
              <h3>{t('auth.student.question3')}</h3>
              <p className="step-description">{t('auth.student.question3Desc')}</p>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="registrationCode"
                value={formData.registrationCode}
                onChange={handleChange}
                placeholder={t('auth.student.codePlaceholder')}
                className="question-input registration-code-input"
                autoFocus
                maxLength="6"
                style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'monospace' }}
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-login-form">
      <h2>{t('auth.studentLogin')}</h2>
      <p className="login-subtitle">{t('auth.studentLoginSubtitle')}</p>
      
      {/* Progress indicator */}
      <div className="progress-indicator">
        {[1, 2, 3].map((step) => (
          <div 
            key={step}
            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
          >
            {currentStep > step ? '✓' : step}
          </div>
        ))}
      </div>

      {success && (
        <div className="success-message">
          <div className="success-icon">
            🎉
          </div>
          <div className="success-content">
            <div className="success-title">
              Welcome to DigLearners!
            </div>
            <div className="success-text">
              Great job! Taking you to your learning dashboard...
            </div>
          </div>
        </div>
      )}
      
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

      {/* Current step content */}
      {renderStep()}

      {/* Summary of answers */}
      {currentStep > 1 && (
        <div className="answer-summary">
          <h4>{t('auth.student.yourAnswers')}</h4>
          {formData.fullName && (
            <div className="answer-item">
              <span className="answer-label">{t('auth.student.name')}:</span>
              <span className="answer-value">{formData.fullName}</span>
            </div>
          )}
          {formData.grade && (
            <div className="answer-item">
              <span className="answer-label">{t('auth.student.grade')}:</span>
              <span className="answer-value">{formData.grade}</span>
            </div>
          )}
          {formData.registrationCode && currentStep === 3 && (
            <div className="answer-item">
              <span className="answer-label">{t('auth.student.code')}:</span>
              <span className="answer-value">{formData.registrationCode.toUpperCase()}</span>
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="step-navigation">
        {currentStep > 1 && (
          <button 
            type="button" 
            className="nav-button back-button"
            onClick={handleBack}
            disabled={loading}
          >
            ← {t('common.back')}
          </button>
        )}
        
        {currentStep < 3 ? (
          <button 
            type="button" 
            className="nav-button next-button"
            onClick={handleNext}
            disabled={loading}
          >
            {t('common.next')} →
          </button>
        ) : (
          <button 
            type="submit" 
            className={`nav-button login-button ${success ? 'success' : ''}`}
            disabled={loading || success}
          >
            {success ? (
              <>
                <span>✅</span>
                Success!
              </>
            ) : loading ? (
              <>
                <span className="loading-spinner">⏳</span>
                {t('common.loading')}
              </>
            ) : (
              <>
                <span>🚀</span>
                {t('auth.student.startLearning')}
              </>
            )}
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .student-login-form {
            width: 100%;
          }

          .student-login-form h2 {
            color: #374151;
            margin-bottom: 0.5rem;
            text-align: center;
            font-size: 1.5rem;
          }

          .login-subtitle {
            color: #6b7280;
            text-align: center;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
          }

          .progress-indicator {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .progress-step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.9rem;
            border: 2px solid #e5e7eb;
            color: #9ca3af;
            background: white;
            transition: all 0.3s ease;
          }

          .progress-step.active {
            border-color: #FF677D;
            color: #FF677D;
            background: #fff5f5;
          }

          .progress-step.completed {
            border-color: #10b981;
            color: white;
            background: #10b981;
          }

          .question-step {
            margin-bottom: 2rem;
          }

          .step-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .step-number {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #FF677D, #F8B400);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0 auto 1rem auto;
          }

          .step-header h3 {
            color: #374151;
            margin-bottom: 0.5rem;
            font-size: 1.3rem;
          }

          .step-description {
            color: #6b7280;
            font-size: 0.9rem;
            margin: 0;
          }

          .question-input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 1.1rem;
            text-align: center;
            transition: border-color 0.2s;
            box-sizing: border-box;
          }

          .question-input:focus {
            outline: none;
            border-color: #FF677D;
            box-shadow: 0 0 0 3px rgba(255, 103, 125, 0.1);
          }

          .registration-code-input {
            text-align: center;
            font-weight: bold;
            font-size: 1.3rem !important;
          }

          .grade-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .grade-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .grade-option:hover {
            border-color: #FF677D;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 103, 125, 0.2);
          }

          .grade-option.selected {
            border-color: #FF677D;
            background: linear-gradient(135deg, #fff5f5, #fef2f2);
            transform: scale(1.05);
          }

          .grade-icon {
            font-size: 1.5rem;
          }

          .grade-text {
            font-weight: 500;
            color: #374151;
            font-size: 0.9rem;
          }

          .answer-summary {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          .answer-summary h4 {
            margin: 0 0 0.75rem 0;
            color: #374151;
            font-size: 0.9rem;
            font-weight: 600;
          }

          .answer-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .answer-item:last-child {
            margin-bottom: 0;
          }

          .answer-label {
            color: #6b7280;
            font-size: 0.8rem;
          }

          .answer-value {
            color: #374151;
            font-weight: 500;
            font-size: 0.8rem;
          }

          .step-navigation {
            display: flex;
            gap: 1rem;
            justify-content: space-between;
          }

          .nav-button {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .back-button {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
          }

          .back-button:hover:not(:disabled) {
            background: #e5e7eb;
            transform: translateY(-1px);
          }

          .next-button {
            background: linear-gradient(135deg, #FF677D, #F8B400);
            color: white;
          }

          .next-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(255, 103, 125, 0.3);
          }

          .login-button {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          }

          .nav-button:disabled {
            background: #9ca3af;
            color: #6b7280;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .nav-button.success {
            background: linear-gradient(135deg, #10b981, #059669) !important;
            transform: scale(1.02);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          }

          .loading-spinner {
            animation: spin 1s linear infinite;
            display: inline-block;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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

          .error-message.error-name {
            background: #fffbeb;
            border-color: #fed7aa;
            color: #ea580c;
          }

          .error-message.error-grade {
            background: #f0f9ff;
            border-color: #bfdbfe;
            color: #1d4ed8;
          }

          .error-message.error-code {
            background: #fffbeb;
            border-color: #fed7aa;
            color: #ea580c;
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

          @media (max-width: 480px) {
            .grade-options {
              grid-template-columns: 1fr;
            }
            
            .step-navigation {
              flex-direction: column;
            }
            
            .progress-indicator {
              gap: 0.5rem;
            }
            
            .progress-step {
              width: 35px;
              height: 35px;
              font-size: 0.8rem;
            }
          }
        `
      }} />
    </form>
  )
}

export default StudentLogin
