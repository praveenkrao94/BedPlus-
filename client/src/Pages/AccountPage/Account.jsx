import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import {Navigate, redirect, useParams} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

function Account() {
   const{user ,setUser, ready} = useContext(UserContext)
   const[redirectHome , setRedirectHome] = useState(null)
   let{subpage} = useParams() 
   if(subpage === undefined){
    subpage = 'profile'
   }


   if(!ready){
    return 'Loading ...'
   }


   if(ready && !user){
    return <Navigate to={'/login'}/>
   }
    
/// to set classs
   function linkclasses(type = null){
    let classes=  'py-2 px-6'
    if(type === subpage){
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
   }


   // call api for logout ////

   async function logout(){
   await axios.post('/logout');
   setUser(null)
   setRedirectHome('/')
   }

   if(redirectHome)
   return <Navigate to={redirectHome} />   /// simple way to redirect to index page
   
  return (
    <div>
      <nav  className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <NavLink className={linkclasses('profile')} to={'/account'}>My Profile</NavLink>
        <NavLink className={linkclasses('bookings')} to={'/account/bookings'}>My Bookings</NavLink>
        <NavLink className={linkclasses('places')} to={'/account/places'}>My Accommodations</NavLink>
      </nav>
      {subpage ==='profile' && (
        <div className="text-center max-w-lg mx-auto">
          Loggged in as {user.name} ({user.email})
          <button  onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
    </div>
  )
}

export default Account


