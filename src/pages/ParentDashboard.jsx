import React from 'react'
import MyComponent from '../components/MyComponent'

export default function ParentDashboard(){
  return (
    <MyComponent title="Parent Dashboard" subtitle="Track your child's learning">
      <p>Parent view (demo):</p>
      <ul>
        <li>Recent activity</li>
        <li>Weekly summary</li>
        <li>Messages from teacher</li>
      </ul>
    </MyComponent>
  )
}
