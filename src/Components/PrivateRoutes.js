import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../Pages/Context/AuthContext'

export default function PrivateRoute({ Component }) {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()
    if (!isAuthenticated) {
      return <Navigate to='/' state={{ from: location.pathname }} replace />
    }
    return (
        <Component />
    )
}
