import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

function BookingWidget({place}) {
    const[checkIn,setCheckIn] = useState('')
    const[checkOut,setCheckOut] = useState('')
    const[numbeOfGuests,setNumberOfGuests] = useState(1)
    const[name,setName]= useState('')
    const[mobile,setMobile]= useState('')
    const [redirect,setRedirect]= useState('')


    const {user} = useContext(UserContext)

    useEffect(()=>{
      if(user){
        setName(user.name)
      }
    },[user])



    //  date
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays( new Date (checkOut),new Date(checkIn))
    }

  async  function bookThisPlace(){
       
 const res = await axios.post('/bookings',
     {
        checkIn,checkOut,numbeOfGuests,name,mobile ,place:place._id,price:numberOfNights * place.price
    })

    const bookingId = res.data._id
    setRedirect(`/account/bookings/${bookingId}`)
    }


    if(redirect){
        return <Navigate  to={redirect}/>
    }



  return (
    <div className='bg-white shadow p-4 rounded-2xl' >
                        <div className='text-xl text-center' >
                        Price: {place.price} Rs / per night
                        <div className="border  rounded-2xl mt-4">
                            <div className="flex">
                            <div className=' py-2 px-4'>
                          <label>Check in: </label>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                        </div>
                        <div className=' py-2 px-4 border-l'>
                          <label>Check Out: </label>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                        </div>
                            </div>

                            <div>
                            <div className=' py-2 px-4 border-t'>
                          <label>Number of Guests: </label>
                            <input type="number" value={numbeOfGuests}  onChange={ev => setNumberOfGuests(ev.target.value)} />
                        </div>
                        {numberOfNights > 0 && (
                            <div className=' py-2 px-4 border-t'>
                            <label>Your Full Name: </label>
                              <input type="text" value={name}  onChange={ev => setName(ev.target.value)} />
                            <label>Your Contact Number: </label>
                              <input type="tel" value={mobile}  onChange={ev => setMobile(ev.target.value)} />
                          </div>
                        )}
                            </div>
                       
                        </div>
                        
                        </div>
                        <button onClick={bookThisPlace} className='primary mt-4'>Book this Place 
                         {numberOfNights > 0 && (
                            <span>for INR {numberOfNights * place.price} Rs for {numberOfNights} Nights</span>
                        )}


                        </button>
                    </div>
  )
}

export default BookingWidget
