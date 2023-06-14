import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import { UserContext } from '../../UserContext';


function LoginPage() {
  const[email , setEmail] = useState('')
  const[password,setPassword] = useState('')
  const [redirect,setRedirect] = useState(false)

  const{setUser}= useContext(UserContext)

  async function HandleLoginSubmit(e){
    e.preventDefault();
    try{
    const res =  await axios.post('/login' ,{
        email,
        password
      })
      setUser(res.data)
      console.log(res.data)
      alert("login Successfull")
      setRedirect(true)
    }
    catch(err){
      alert("Login Failed ")
    }
  }

if(redirect){
  return <Navigate to={'/'}/>
}
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-16' >
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      <form className='max-w-md mx-auto' onSubmit={HandleLoginSubmit} >
        <input type="email" placeholder='Your@rmail.com' value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e=> setPassword(e.target.value)}/>
        <button className='primary' >Login</button>
        <div className='text-center py-2 text-gray-500' >Don't Have an Account Yet? <Link className='underline text-black' to={'/register'}>Regsiter now</Link> 
          </div>
      </form>
      </div>
    </div>
  )
}

export default LoginPage
