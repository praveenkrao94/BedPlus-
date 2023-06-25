import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import Uploader from './Uploader'
import Perks from './Perks'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

function PlacesformPage() {
  const {id} = useParams()
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [addedPhotos,setAddedPhotos] = useState([])
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([])
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const[maxGuest,setMaxGuest] = useState(1)
    const [price ,setPrice] = useState(100)
    const [redirect ,setRedirect] = useState(false)



    
    

useEffect(()=>{

  if(!id){
    return;
  }
  axios.get('/places/'+ id)
.then(res => {
  const{data} = res
  setTitle(data.title)
  setAddress(data.address)
  setAddedPhotos(data.photos)
  setDescription(data.description)
  setPerks(data.perks)
  setExtraInfo(data.extraInfo)
  setCheckIn(data.checkIn)
  setCheckOut(data.checkOut)
  setMaxGuest(data.maxGuest)
  setPrice(data.price)
})


},[id])


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
  
     async function savePlace(e){
          e.preventDefault();
          const placeDate = {
            title,
              address,
              addedPhotos,
              description,
              perks,
              extraInfo,
              checkIn,
              checkOut,
              maxGuest,
              price
          }
          if(id){
            await axios.put('/places', {
              id,
              ...placeDate
          });
          setRedirect(true)
          }else{
            await axios.post('/places', placeDate);
          setRedirect(true)
          }

          
  
         
        }
   

        if(redirect){
            return <Navigate to={'/account/places'} />
        }
       
  
  
  
    //  -----------------------------------------------------------------------------------------------------------

  return (
    <div>
        <AccountNav/>
    <form onSubmit={savePlace}>
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
      <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>

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
        <div>
          <h3 className='mt-2 -mb-1'>Price Per night</h3>
        <input type="number" value={price} onChange={ev=> setPrice(ev.target.value)} />
        </div> 
      </div>
      <div>
        <button className='primary my-4'>Save</button>
      </div>
    </form>
</div>
  )
}

export default PlacesformPage
