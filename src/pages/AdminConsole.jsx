import React from 'react'
import MyComponent from '../components/MyComponent'

export default function AdminConsole(){
  return (
    <MyComponent title="Admin Console" subtitle="Manage content and users">
      <p>Admin features (demo):</p>
      <ul>
        <li>Manage lessons</li>
        <li>Manage users</li>
        <li>System settings</li>
      </ul>
    </MyComponent>
  )
}
