import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PreLoader from '../components/core/preloader/PreLoader'

const OrderSuccess = () => {
    const [timer, setTimer] = useState(5)
    const { loading } = useSelector((state) => state.userslice)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/profile')
        }, 5000)
        setInterval(() => {
            setTimer(timer - 1)
        }, 1000)
    })

    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <main>
                <div className="contact_wrapper">
                    <div className="container ">
                        <h2 className="text-center contact_title">Thank you !! Your order has been placed successfully !!</h2>
                        <h3 className="text-center">&larr; Redirecting to your profile in({timer}S)</h3>
                    </div>

                </div>

            </main>
        </>
    )
}

export default OrderSuccess