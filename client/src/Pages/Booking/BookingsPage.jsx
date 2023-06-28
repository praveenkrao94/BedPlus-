import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountPage/AccountNav'
import PlaceImg from '../AccountPage/Place/PlaceImg'
import axios from 'axios'
import { differenceInBusinessDays, format } from 'date-fns'
import { Link } from 'react-router-dom'
import BookingDates from './BookingDates'


function BookingsPage() {
  const [bookings,setBookings] =  useState([])
  useEffect(()=>{
    axios.get('/bookings').then(res => setBookings(res.data)

    )
  },[])

  bookings
  return (
    
    <div>
      <AccountNav/>
      <div>
    {bookings?.length > 0 && bookings.map(booking=>(
      <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-2' >
        <div className='w-48'>
         
          <PlaceImg place={booking?.place} />
        </div>
        <div className='py-3'>
          <h2 className='text-xl'>{booking.place.title}</h2>
       <BookingDates booking= {booking}/>
        </div>
       
      </Link>
    )) }
      </div>
    </div>
  )
}

export default BookingsPage
