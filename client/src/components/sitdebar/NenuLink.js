import React from 'react'
import {NavLink} from "react-router-dom"
const NenuLink = ({itme, menuItems}) => {
  if(menuItems)
  return(
<div className="nav">
  <NavLink  to={itme.path} className={"side-bar-menu-link"}>
    {itme.icon}
    {  itme.title}
     </NavLink>
      </div>
)
  return (
<div className="nav">
  <NavLink  to={itme.path} className={"side-bar-menu-link"}>
    {itme.icon}
    {  itme.title}
     </NavLink>
      </div>
  )
}

export default NenuLink