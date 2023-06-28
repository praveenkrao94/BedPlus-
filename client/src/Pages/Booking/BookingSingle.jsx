import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddressLink from '../AccountPage/Place/AddressLink';
import PlaceGalery from '../AccountPage/Place/PlaceGalery';
import BookingDates from './BookingDates';

function BookingSingle() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(res => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className="my-2 block" >{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
        <h2 className='text-xl'>Your Booking Information:
        <BookingDates booking={booking} />
        </h2>
      </div>
      <PlaceGalery place={booking.place}/>
    </div>
  );
}

export default BookingSingle;
