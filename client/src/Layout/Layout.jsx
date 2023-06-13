import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
