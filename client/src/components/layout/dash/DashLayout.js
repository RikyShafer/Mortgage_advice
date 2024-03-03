import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../footer/Footer'
import SitdeBar from '../../sitdebar/Sitdebar'
import "./dash-dashLayout.css"

const DashLayout = () => {
  return (
    <div className='container'>
      <div className='mane'>
        <SitdeBar />
      </div>
      <div className='contemt'>
        {/* <Navbar /> */}
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default DashLayout