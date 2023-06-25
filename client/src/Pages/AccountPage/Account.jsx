import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import {Navigate, redirect, useParams} from 'react-router-dom'

import axios from 'axios'
import Place from './Place/Place'
import AccountNav from './AccountNav'

function ProfilePage() {
  
   const{user ,setUser, ready} = useContext(UserContext)
   const[redirectHome , setRedirectHome] = useState(null)

   let{subpage} = useParams() 

   if(subpage === undefined){
    subpage = 'profile'
   }


    // call api for logout ////

    async function logout(){
      await axios.post('/logout');
      setRedirectHome('/')
      setUser(null)
      }
   
   if(!ready){
    return 'Loading ...'
   }


   if(ready && !user && !redirectHome){   //this checks tats even after ready if user and redirect is false then naviagte
    return <Navigate to={'/login'}/>
   }
    
/// to set classs
  


  
   if(redirectHome)
   return <Navigate to={redirectHome} />   /// simple way to redirect to index page
   
  return (
    <div>
      <AccountNav/>
      {subpage ==='profile' && (
        <div className="text-center max-w-lg mx-auto">
          Loggged in as {user.name} ({user.email})
          <button  onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}

      {subpage === 'places' && (
        <Place/>
      )}
    </div>
  )
}

export default ProfilePage


