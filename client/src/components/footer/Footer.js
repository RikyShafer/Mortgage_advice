import React from 'react'
import { 
  HiMail
 } from "react-icons/hi";

 import { BiLogoFacebook , BiLogoInstagram, BiLogoWhatsapp , BiMap  } from "react-icons/bi";


import "./footer.css"
const Footer = () => {
  return (
    <div className='footer'>
      {/* <div className='footer-logo'>Riki</div>
      <div className='footer-text'> @ All Rikights reserved.</div> */}
     
      <h1 className='footer-address'>  <BiMap /> כתבתינו: מסילת יוסף 9  </h1>
      <h1 className='studio'>  אפיון ועיצוב אתר | סטודיו מוריה| כל הזכויות שמורות </h1>
      <h1 className='footer-contactus'>  <BiLogoFacebook /> </h1>
      <h1 className='footer-contactus'>  <BiLogoInstagram /> </h1>
      <h1 className='footer-contactus'>  <BiLogoWhatsapp /> </h1>
      <h1 className='footer-contactus'>  <HiMail /> </h1>
      </div>
  )
}

export default Footer