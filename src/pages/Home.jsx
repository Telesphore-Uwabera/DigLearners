import React from 'react'
import MyComponent from '../components/MyComponent'

export default function Home() {
  return (
    <MyComponent title="DigLearners" subtitle="Offline-first PWA prototype">
      <p>Welcome to DigLearners. Choose a lesson or open your dashboard to begin.</p>
      <ul>
        <li><a href="/lessons">Lessons</a></li>
        <li><a href="/leaderboard">Leaderboard</a></li>
        <li><a href="/badges">Badges</a></li>
      </ul>
    </MyComponent>
  )
}
