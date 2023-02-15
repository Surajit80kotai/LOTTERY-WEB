import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"))
    return (
        <>
            {
                token || accessToken ? <Outlet /> : <Navigate to='/' />
            }
        </>
    )
}

export default PrivateRoute