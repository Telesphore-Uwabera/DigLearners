import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import LessonsList from './pages/LessonsList'
import LessonPlayer from './pages/LessonPlayer'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import ParentDashboard from './pages/ParentDashboard'
import AdminConsole from './pages/AdminConsole'
import Login from './pages/Login'
import Register from './pages/Register'
import Leaderboard from './pages/Leaderboard'
import Badges from './pages/Badges'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div>
      <nav className="top-nav">
        <div className="nav-inner">
          <Link to="/" className="brand">DigLearners</Link>
          <div className="nav-links">
            <Link to="/lessons">Lessons</Link>
            <Link to="/student">Student</Link>
            <Link to="/teacher">Teacher</Link>
            <Link to="/parent">Parent</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      <main className="app-root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<LessonsList />} />
          <Route path="/lessons/:id" element={<LessonPlayer />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  )
}
