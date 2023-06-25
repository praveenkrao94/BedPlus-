import React, { useEffect } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'

import LoginPage from './Pages/Loginpage/Login'
import Layout from './Layout/Layout'
import Register from './Pages/RegisterPage/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

import Place from './Pages/AccountPage/Place/Place'
import ProfilePage from './Pages/AccountPage/Account'
import PlacesformPage from './Pages/AccountPage/Place/PlacesformPage'

axios.defaults.baseURL ='http://localhost:4000'
axios.defaults.withCredentials =true 

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route  path='/login' element={<LoginPage/>} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/account' element={<ProfilePage/>} />
        <Route  path='/account/places' element={<Place/>} />
        <Route  path='/account/places/new' element={<PlacesformPage/>} />
        <Route  path='/account/places/:id' element={<PlacesformPage/>} />
       

      </Route>
    </Routes>
    </UserContextProvider>
  
  )
}

export default App
