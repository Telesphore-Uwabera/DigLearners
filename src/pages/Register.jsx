import React from 'react'
import MyComponent from '../components/MyComponent'

export default function Register(){
  return (
    <MyComponent title="Register">
      <form onSubmit={e=>{e.preventDefault(); alert('Demo register')}}>
        <div><label>Full name<input name="name" required/></label></div>
        <div><label>Email<input type="email" name="email" required/></label></div>
        <div><label>Password<input type="password" name="password" required/></label></div>
        <div><button type="submit">Create account</button></div>
      </form>
    </MyComponent>
  )
}
