import React from 'react'
import MyComponent from '../components/MyComponent'

export default function Badges(){
  const badges = [
    {id:1,name:'First Steps',desc:'Complete first lesson'},
    {id:2,name:'Explorer',desc:'Open 5 lessons'}
  ]
  return (
    <MyComponent title="Badges">
      <div style={{display:'flex',gap:12}}>
        {badges.map(b=> (
          <div key={b.id} className="badge-card">
            <strong>{b.name}</strong>
            <div>{b.desc}</div>
          </div>
        ))}
      </div>
    </MyComponent>
  )
}
