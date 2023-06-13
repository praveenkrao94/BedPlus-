import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-16' >
      <h1 className='text-4xl text-center mb-4'>Register</h1>
      <form className='max-w-md mx-auto' >
        <input type="text" placeholder='john joe' 

            value={name} 
            onChange={ev => setName(ev.target.value)}/>

        <input type="email" placeholder='Your@rmail.com'

         value={email} 
         onChange={ev => setName(ev.target.value)}/>

        <input type="password" placeholder='password'

        value={password} 
        onChange={ev => setName(ev.target.value)} />
        <button className='primary' >Login</button>
        
        <div className='text-center py-2 text-gray-500' >Already a Member? then <Link className='underline text-black' to={'/login'}>Login</Link> 
          </div>
      </form>
      </div>
    </div>
  )
}

export default Register
