import React from 'react'
import MyComponent from './components/MyComponent'

export default function App() {
  return (
    <main className="app-root">
      <MyComponent title="DigLearners" subtitle="Offline-first PWA prototype">
        <p>Welcome to the DigLearners demo. Use this area to build lessons and test offline sync.</p>
      </MyComponent>
    </main>
  )
}
