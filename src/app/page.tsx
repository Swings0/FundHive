import React from 'react'
import Login from './components/Login'
import Otp from './components/Otp'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Sec1 from './components/HomeSections/Sec1'
import Sec2 from './components/HomeSections/Sec2'
import Sec3 from './components/HomeSections/Sec3'
import Sec4 from './components/HomeSections/Sec4'
import Footer from './components/Footer'

const page = () => {
  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
    <Navbar/>
    <Sec1/>
    <Sec2/>
    <Sec3/>
    <Sec4/>
    <Footer/>
    </div>
  )
}

export default page
