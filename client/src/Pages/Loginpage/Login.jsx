import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-16' >
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto' >
        <input type="email" placeholder='Your@rmail.com'/>
        <input type="password" placeholder='password' />
        <button className='primary' >Login</button>
        <div className='text-center py-2 text-gray-500' >Don't Have an Account Yet? <Link className='underline text-black' to={'/register'}>Regsiter now</Link> 
          </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage
