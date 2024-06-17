import React from 'react'
import { 
  HiMail
 } from "react-icons/hi";

 import { BiLogoFacebook , BiLogoInstagram, BiLogoWhatsapp , BiMap  } from "react-icons/bi";


import "./footer.css"
import { NavLink } from 'react-router-dom';
const Footer = () => {
  const gmailUrl = process.env.GMAILURL;
  const phoneNumber = process.env.PHONENUMBER; // Replace with your phone number
  const message = 'Hello, I would like to inquire about...'; // Replace with your message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className='footer'>
      {/* <div className='footer-logo'>Riki</div>
      <div className='footer-text'> @ All Rikights reserved.</div> */}
     
      <h1 className='footer-address'>   
      <NavLink to={"https://www.google.com/maps/place/%D7%9E%D7%A1%D7%99%D7%9C%D7%AA+%D7%99%D7%95%D7%A1%D7%A3+9,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9301613,35.0467891,17z/data=!3m1!4b1!4m6!3m5!1s0x1502d2a18aec3c71:0xcece53b5cc888d90!8m2!3d31.9301613!4d35.0442195!16s%2Fg%2F12hr4dw8h?hl=iw&entry=ttu"} target="_blank"><BiMap /> כתבתינו: מסילת יוסף 9</NavLink>
      </h1>
      <h1 className='studio'>  אפיון ועיצוב אתר | סטודיו מוריה| כל הזכויות שמורות </h1>
      <h1 className='footer-contactus'>  <BiLogoFacebook /> </h1>

      <h1 className='footer-contactus'>  <BiLogoInstagram /> </h1>
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