import React from 'react'
import MyComponent from '../components/MyComponent'

export default function NotFound(){
  return (
    <MyComponent title="Not found">
      <p>Page does not exist. <a href="/">Go home</a></p>
    </MyComponent>
  )
}
