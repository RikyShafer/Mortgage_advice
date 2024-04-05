import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({ allowRoles }) => {
  const { roles } = useAuth()
  const userAllowed = roles && (roles.includes("USER") || roles.includes("ADMIN"))
  
  return userAllowed ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth
