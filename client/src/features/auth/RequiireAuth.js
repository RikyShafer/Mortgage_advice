import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const RequiireAuth = ({allowRoles}) => {
    //allowRoles -- יכול להיות גם ל- user וגם Admin 
    console.log("allowRoles",allowRoles);
    const {roles}=useAuth()
    console.log("roles",roles);

  const userAllowed=allowRoles.includes(roles)
  if(userAllowed)
  return <Outlet/>
    return (
    userAllowed? <Outlet/>:  <Navigate to="/login" replace/>  
)
}

export default RequiireAuth