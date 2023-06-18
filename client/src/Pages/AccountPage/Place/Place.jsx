import React, { useState } from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'
import Perks from './Perks'
import axios from 'axios'
import Uploader from './Uploader'

function Place() {
    const{action} = useParams()
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [addedPhotos,setAddedPhotos] = useState([])
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([])
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const[maxGuest,setMaxGuest] = useState(1)
    const[redirect,setRedirect] = useState('')


    /// to reduce the h1 and p tags -----------------------------------------/

    function inputHeader(text){
      return (
          <>
          <h2 className='text-xl mt-4'>{text}</h2>
          </>
      );
    }
    function inputDesc(text){
      return (
          <>
          <p className='text-gray-500 text-sm' >{text}</p>
          </>
      );
    }

    function preInp(header,desc){
      return(
          <>
          {inputHeader(header)}
          {inputDesc(desc)}
          </>
      );
    }
    // ----------------------------------------------------------------------------------------------------

      //add new place function

   async function addnewPlace(e){
        e.preventDefault()
        
   await axios.post('/places', {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuest
        });
        setRedirect('/account/places')
      }
 
      if(redirect){
        return <Navigate to={redirect} />        // this is to naviagte to the path 
      }





  //  -----------------------------------------------------------------------------------------------------------





  return (
    <div>
        {action !== 'new'&& (
     <div className='text-center'>
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full text-center' to={'/account/places/new'}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
       </svg>
      Add New Place
      </Link>
     </div>
        )}
        {action === 'new' &&(
            <div>
                <form onSubmit={addnewPlace}>
                  {preInp('Title' ,'Title for Your place should be short and catchy as in add' )}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title: For Example:- My Lovely Apartment ' />

                   
                  {preInp('Address' ,'Address to your place' )}
                    <input type="text" placeholder='Address'  value={address} onChange={ev => setAddress(ev.target.value)} />

                    
                  {preInp('Photos' ,'more = better' )}
                 
                  <Uploader  addedPhotos={ addedPhotos} onChange={setAddedPhotos}/>
                
                {preInp('Description' ,'Description of the Place' )}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                
                {preInp('Perks' ,'Select all the perks of your place' )}
                <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <Perks selected={perks} onChange={setPerks}/>
                </div>

                
                
                {preInp('Extra info' ,'House Rules' )}
                <textarea value={extraInfo}  onChange={ev => setExtraInfo(ev.target.value)}/>
           
                {preInp('Check in&out Time, Max Guest' ,'Add check in adn out Times , remember to have some time windows for cleaning the room between the guest' )}
                  <div className='grid gap-2 sm:grid-cols-3'>

                    <div>
                      <h3 className='mt-2 -mb-1'>Check in time</h3>
                    <input type="text" placeholder='14:00' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                      <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input type="text" placeholder='14:00' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                      <h3 className='mt-2 -mb-1'>Max no of Guests</h3>
                    <input type="number" value={maxGuest} onChange={ev=> setMaxGuest(ev.target.value)} />
                    </div> 
                  </div>
                  <div>
                    <button className='primary my-4'>Save</button>
                  </div>
                </form>
            </div>
        )}
        
    </div>
  )
}

export default Place