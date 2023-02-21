import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PreLoader from '../components/core/preloader/PreLoader'
import { getCart } from '../services/slice/CartSlice'

const OrderSuccess = () => {
    const { cart_data, loading } = useSelector((state) => state.cartslice)
    const dispatch = useDispatch()
    const cartLength = cart_data?.length


    // update
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getCart())
    }, [dispatch, cartLength])


    return (
        <>
            {/* PreLoader */}
            {loading && <PreLoader />}

            <div className="vh-100 d-flex justify-content-center align-items-center contact_wrapper">
                <div className="col-md-8">
                    <div className="border order_success_border"></div>
                    <div className="card  bg-white shadow p-5">
                        <div className="mb-4 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-success bi bi-check-circle" width="150" height="150"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h1 style={{ "fontSize": "3.5rem" }}>Thank You !</h1>
                            <p className='fs-3'>Your order has been placed successfully</p>
                            <br />
                            <Link to="/" className="orderplace text-white">&larr; Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccess