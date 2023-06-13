import React from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'

import LoginPage from './Pages/Loginpage/Login'
import Layout from './Layout/Layout'
import Register from './Pages/RegisterPage/Register'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route  path='/login' element={<LoginPage/>} />
        <Route  path='/register' element={<Register/>} />
      </Route>
    </Routes>
  
  )
}

export default App
