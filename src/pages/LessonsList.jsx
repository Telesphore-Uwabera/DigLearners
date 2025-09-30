import React, {useEffect, useState} from 'react'
import MyComponent from '../components/MyComponent'
import { Link } from 'react-router-dom'
import { fetchLessons } from '../lib/api'

export default function LessonsList(){
  const [lessons, setLessons] = useState([])
  useEffect(()=>{ fetchLessons().then(setLessons) },[])
  return (
    <MyComponent title="Lessons" subtitle="Choose a module">
      {lessons.length===0 ? (
        <p>No lessons available yet.</p>
      ):(
        <ul>
          {lessons.map(l=> (
            <li key={l.id}><Link to={`/lessons/${l.id}`}>{l.title} — {l.moduleType}</Link></li>
          ))}
        </ul>
      )}
    </MyComponent>
  )
}
