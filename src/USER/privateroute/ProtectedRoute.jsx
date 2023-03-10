import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const phone_number = JSON.parse(window.localStorage.getItem("phone_number"))
    return (
        <>
            {
                phone_number ? <Outlet /> : <Navigate to='/verifyphone' />
            }
        </>
    )
}

export default ProtectedRoute