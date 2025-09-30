import React from 'react'
import MyComponent from '../components/MyComponent'

export default function StudentDashboard(){
  return (
    <MyComponent title="Student Dashboard" subtitle="Your progress and rewards">
      <p>Progress summary (demo):</p>
      <ul>
        <li>Lessons completed: 2</li>
        <li>Badges earned: 1</li>
        <li>Points: 120</li>
      </ul>
    </MyComponent>
  )
}
