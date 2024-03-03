import React from 'react'
import {NavLink} from "react-router-dom"
const NenuLink = ({itme}) => {
  return (
  <NavLink  to={itme.path} className={"side-bar-menu-link"}>
    {itme.icon}
    {  itme.title}
     </NavLink>
  )
}

export default NenuLink