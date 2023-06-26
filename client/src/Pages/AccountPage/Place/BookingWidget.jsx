import React from 'react'

function BookingWidget({place}) {
  return (
    <div className='bg-white shadow p-4 rounded-2xl' >
                        <div className='text-xl text-center' >
                        Price: {place.price} Rs / per night
                        <div className="border  rounded-2xl mt-4">
                            <div className="flex">
                            <div className=' py-2 px-4'>
                          <label>Check in: </label>
                            <input type="date" />
                        </div>
                        <div className=' py-2 px-4 border-l'>
                          <label>Check Out: </label>
                            <input type="date" />
                        </div>
                            </div>

                            <div>
                            <div className=' py-2 px-4 border-t'>
                          <label>Number of Guests: </label>
                            <input type="number" value={1} />
                        </div>
                            </div>
                       
                        </div>
                        
                        </div>
                        <button className='primary mt-4'>Book this Place</button>
                    </div>
  )
}

export default BookingWidget
