import React from 'react'
import MyComponent from '../components/MyComponent'
import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <MyComponent title="Login">
      <form onSubmit={e=>{e.preventDefault(); alert('Demo login')}}>
        <div><label>Email<input type="email" name="email" required /></label></div>
        <div><label>Password<input type="password" name="password" required /></label></div>
        <div><button type="submit">Login</button></div>
      </form>
      <p>Don’t have an account? <Link to="/register">Register</Link></p>
    </MyComponent>
  )
}
