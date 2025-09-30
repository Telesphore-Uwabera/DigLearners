import React from 'react'
import MyComponent from '../components/MyComponent'

export default function TeacherDashboard(){
  return (
    <MyComponent title="Teacher Dashboard" subtitle="Class insights">
      <p>Teacher tools (demo):</p>
      <ul>
        <li>View class progress</li>
        <li>Assign lessons</li>
        <li>Export reports</li>
      </ul>
    </MyComponent>
  )
}
