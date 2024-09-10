import React, { useEffect, useState } from 'react'
import {
  HiMail
} from "react-icons/hi";

import {  BiLogoWhatsapp, BiMap } from "react-icons/bi";


import "./footer.css"
import { NavLink } from 'react-router-dom';
const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=7673297@gmail.com&su=Contact%20Us&body=Hello,%20I%20would%20like%20to%20inquire%20about...`
  const phoneNumber = '0522279392';
  const phoneNumber1 = '0505905078';

  const message = 'Hello, I would like to inquire about...'; // Replace with your message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const whatsappUrl1 = `https://wa.me/${phoneNumber1}?text=${encodeURIComponent(message)}`;

  return (
    <div className='footer'>
      {/* <div className='footer-logo'>Riki</div>
      <div className='footer-text'> @ All Rikights reserved.</div> */}

      <h1 className='footer-address'>
      <BiMap />  {isMobile ? '' :'כתבתינו:'} 
        <NavLink to={"https://www.google.com/maps/place/%D7%9E%D7%A1%D7%99%D7%9C%D7%AA+%D7%99%D7%95%D7%A1%D7%A3+9,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9301613,35.0467891,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d2a18aec3c71:0xcece53b5cc888d90!8m2!3d31.9301613!4d35.0442195!16s%2Fg%2F12hr4dw8h?hl=iw&entry=ttu"} target="_blank">  {isMobile ? 'כתובת בעסק' : 'מסילת יוסף 9'}</NavLink>
      </h1>
      <h1 className='studio'>
        אפיון ועיצוב אתר |
        <a href={whatsappUrl1} target="_blank" rel="noopener noreferrer">
          סטודיו מוריה
        </a>
        | כל הזכויות שמורות
      </h1>

      <h1 className='footer-contactus'>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <BiLogoWhatsapp />
        </a>
      </h1>
      <h1 className='footer-contactus'>
        <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
          <HiMail />
        </a>
      </h1>    </div>
  )
}

export default Footer