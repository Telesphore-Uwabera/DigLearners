import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import MyComponent from '../components/MyComponent'
import { fetchLessonById, saveProgress } from '../lib/api'

export default function LessonPlayer(){
  const {id} = useParams()
  const [lesson, setLesson] = useState(null)
  useEffect(()=>{ fetchLessonById(id).then(setLesson) },[id])

  if(!lesson) return <MyComponent title="Lesson">Loading…</MyComponent>

  function complete(){
    saveProgress({lessonId: lesson.id, score: Math.round(Math.random()*100)})
    alert('Progress saved (demo)')
  }

  return (
    <MyComponent title={lesson.title} subtitle={lesson.moduleType}>
      <div dangerouslySetInnerHTML={{__html: lesson.content}} />
      <div style={{marginTop:12}}>
        <button onClick={complete}>Mark complete</button>
      </div>
    </MyComponent>
  )
}
