// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Footer from '../../footer/Footer'
// import SitdeBar from '../../sitdebar/Sitdebar'
// import "./dash-dashLayout.css"

// const DashLayout = () => {
//   return (
//     <div className='container'>
//       <div className='mane'>
//         <SitdeBar />
//       </div>
//       <div className='contemt'>
//         {/* <Navbar /> */}
//         <Outlet />
//         <Footer />
//       </div>
//     </div>
//   )
// }

// export default DashLayout

import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../../footer/Footer'
import SitdeBar from '../../sitdebar/Sitdebar'
import "./dash-dashLayout.css"

const DashLayout = () => {
  const location = useLocation();

  // Check if the current route is the final page
  const isFinalPage = location.pathname === '/';

  return (
    <div className='container'>
      <div className={`mane ${isFinalPage ? 'final-page' : ''}`}>
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
