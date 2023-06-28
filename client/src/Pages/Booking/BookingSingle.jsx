import React from 'react'
import { useParams } from 'react-router-dom'

function BookingSingle() {

    const {id} = useParams()
  return (
    <div>
      BookingSingle:{id} 

    </div>
  )
}

export default BookingSingle
