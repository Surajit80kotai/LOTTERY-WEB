import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTimer } from '../../../customHooks/useTimer'
import { buyNowItem } from '../../../services/slice/PaymentSlice'

const BannerData = ({ item, id }) => {
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()
    const dispatch = useDispatch()
    // currency variables
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL
    // discount calculation
    const discountedPrice = Number((item?.ticket_price - ((item?.ticket_price * item?.discount_percentage) / 100)))
    const baseUrl = process.env.REACT_APP_NODE_HOST
    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))


    // buyNow function
    const buyNow = (ticket) => {
        // dispatch(emptyCart())
        const subtotal = Number(ticket?.ticket_price)
        const total = (ticket?.discount_percentage ?
            (ticket?.ticket_price - ((ticket?.ticket_price * ticket?.discount_percentage) / 100))
            : ticket?.ticket_price)
        const discount = ((ticket?.ticket_price * ticket?.discount_percentage) / 100)
        const amount = { subtotal: subtotal, total: total, discount: discount }

        const newTicket = {
            product_id: ticket._id,
            unit_price: (ticket.ticket_price).toFixed(2),
            quantity: 1,
            discount: (ticket.discount_percentage).toFixed(2),
            total_price: (subtotal).toFixed(2),
            total_discount_price: (total).toFixed(2)
        }

        const orderData = { product_info: newTicket, amount: amount, ticket: ticket }
        dispatch(buyNowItem(orderData))
    }


    useEffect(() => {
        // console.log("render");
        startTimer(Number(item?.time_left))
    })

    return (
        <>
            <div className="banner_img">
                <img src={baseUrl + item?.main_image} alt="baaner" className="img-fluid" />
            </div>
            <div className="banner_content">

                {
                    (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                        <div>
                            <div className="time_counter">
                                <Link to={`/info/${id}`}>
                                    <h1 className="banner_title">{item?.ticket_name}</h1>
                                </Link>
                                <h3>Timeleft</h3>
                                <div id="coundown" className="countdown">
                                    <div className="one_time">
                                        <div id="days" className="time days">
                                            {timerDays}
                                        </div>
                                        <br /><span>Days</span>
                                    </div>
                                    <div className="one_time">
                                        <div id="hours" className="time hours">
                                            {timerHours}
                                        </div>
                                        <br /><span>Hours</span>
                                    </div>
                                    <div className="one_time">
                                        <div id="minutes" className="time minutes">
                                            {timerMinutes}
                                        </div>
                                        <br /><span>Mins</span>
                                    </div>
                                    <div className="one_time">
                                        <div id="seconds" className="time seconds">
                                            {timerSeconds}
                                        </div>
                                        <br /><span>Sec</span>
                                    </div>
                                </div>

                            </div>
                            <div className="ticket_price">
                                <h4>Ticket Price
                                    <span>{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}
                                    </span>{discountedPrice ? discountedPrice : item?.ticket_price}
                                </h4>
                            </div>
                            <div className="banner_product_btn">
                                {/* Buy Now Button */}
                                {
                                    (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                        (item?.ticket_quantity) > 0 ?
                                            token ?
                                                <Link to="/placeorder" onClick={() => buyNow(item)} className="btn2">Buy Ticket</Link>
                                                : <Link to="/login" className="btn2">Buy Ticket</Link>
                                            : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>
                                        : <button to="#!" className="btn2_disabled" disabled>Buy Ticket</button>

                                }
                            </div>
                        </div>
                        :
                        <div className="time_left">
                            <div id="coundown" className="countdown text-center">
                                <div className="timeleftarea">
                                    <div id="hours" className=" hours"></div>
                                    <br />
                                    <span className='text-white fs-1 fw-normal'>Ticket is unavailabe right now</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default BannerData