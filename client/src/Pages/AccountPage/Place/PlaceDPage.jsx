import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BookingWidget from './BookingWidget';
import PlaceGalery from './PlaceGalery';
import AddressLink from './AddressLink';

function PlaceDPage() {

const[place,setPlace] = useState(null)
const [showAllPhotos,setShowAllPhotos]= useState(false)

    const{id} = useParams()

        useEffect(()=>{
        if(!id){
            return;
        }

        axios.get(`/places/${id}`).then(res=>{
            setPlace(res.data)
        })
},[id])

if(!place) return ;

if(showAllPhotos){
return(
    <div className ='absolute inset-0  bg-black text-white min-h-screen'>
        <div className='p-8 grid gap-4 bg-black'>
            <div>
                <h2 className='text-3xl mr-48' >Photos of {place.title}</h2>
                <button onClick={()=> setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-black text-white shadow shadow-black' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>

                    Close Photos</button>
            </div>
        {place?.photos?.length>0 && place.photos.map(photo=>(
        <div>
            <img className='w-5/6' src={'http://localhost:4000/uploads/'+photo} alt="" />
        </div>
         ))}
        </div>
 </div>
);

}

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8' >
      <h1 className='text-3xl' >{place.title}</h1>
     <AddressLink>{place.address}</AddressLink>
      <PlaceGalery place= {place}/>
     
      <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        
                <div>
                <div className='my-4'>
        <h2 className='font-semibold text-2xl mb-4'>Description</h2>
        {place.description}
      </div>
                    Check-in: {place.checkIn}:00 pm <br />
                    Check-out: {place.checkOut}:00 pm <br />
          Max Number of Guests: {place.maxGuest} people
          
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>

      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
      <div>
        <h2 className='font-semibold text-2xl mb-4' >Extra Information</h2>
      </div>
      <div className='text-sm text-gray-700 leading-5 mt-2 mb-4 ' >{place.extraInfo}</div>
      </div>
      
    </div>
  )
}

export default PlaceDPage
