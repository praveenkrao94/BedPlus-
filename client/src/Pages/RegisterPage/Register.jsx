import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Register() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

 async function resgsiterUser(e){
    e.preventDefault()
    try{
      await axios.post('/register',{
         name,
         email,
         password
       });
       alert('Registration successfull . Now You can Login')
    }
    catch (err) {
      alert('Registration Failed. Please Try Again Later')
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-16' >
      <h1 className='text-4xl text-center mb-4'>Register</h1>
      <form className='max-w-md mx-auto' onSubmit={resgsiterUser} >
        <input type="text" placeholder='john joe' 

            value={name} 
            onChange={ev => setName(ev.target.value)}/>

        <input type="email" placeholder='Your@rmail.com'

         value={email} 
         onChange={ev => setEmail(ev.target.value)}/>

        <input type="password" placeholder='password'

        value={password} 
        onChange={ev => setPassword(ev.target.value)} />
        <button className='primary' >Regsiter</button>

        <div className='text-center py-2 text-gray-500' >Already a Member? then <Link className='underline text-black' to={'/login'}>Login</Link> 
          </div>
      </form>
      </div>
    </div>
  )
}

export default Register
