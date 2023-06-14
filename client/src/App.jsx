import React, { useEffect } from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'

import LoginPage from './Pages/Loginpage/Login'
import Layout from './Layout/Layout'
import Register from './Pages/RegisterPage/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './Pages/AccountPage/Account'

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
        <Route  path='/account' element={<Account/>} />

      </Route>
    </Routes>
    </UserContextProvider>
  
  )
}

export default App
