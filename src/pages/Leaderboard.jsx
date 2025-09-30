import React from 'react'
import MyComponent from '../components/MyComponent'

export default function Leaderboard(){
  const rows = [
    {name:'Amina',points:220},
    {name:'Jean',points:190},
    {name:'Kagabo',points:170}
  ]
  return (
    <MyComponent title="Leaderboard">
      <ol>
        {rows.map(r=> <li key={r.name}>{r.name} — {r.points} pts</li>)}
      </ol>
    </MyComponent>
  )
}
