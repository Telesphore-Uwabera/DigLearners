// Teacher Login Page - Standalone page for teacher login
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import TeacherLogin from './TeacherLogin'

const TeacherLoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (credentials) => {
    try {
      setLoading(true)
      setError('')
      await login(credentials)
      setSuccess(true)
      
      // Redirect after successful login
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
      
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
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
        
        <div className="back-button-container">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>

        <TeacherLogin 
          onLogin={handleLogin}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          success={success}
          setSuccess={setSuccess}
        />
        
        <div className="login-footer">
          <p>Are you a student? <a href="/student-login">Login as student here</a></p>
          <p>Student not registered yet? <a href="/enroll">Register the student here</a></p>
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
            max-width: 500px;
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

          .back-button-container {
            margin-bottom: 1rem;
          }

          .back-button {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            font-size: 0.9rem;
            padding: 0.5rem 0;
            transition: color 0.2s;
          }

          .back-button:hover {
            color: #FF677D;
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

          @media (max-width: 480px) {
            .login-container {
              padding: 2rem;
            }
          }
        `
      }} />
    </div>
  )
}

export default TeacherLoginPage
