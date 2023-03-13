import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTimer } from '../../../customHooks/useTimer'
import { buyNowItem } from '../../../services/slice/PaymentSlice'
import { currency_symbol, generalCurrency_symbol } from '../../../util/Currency'

const BannerData = ({ item, id }) => {
    const [round, setRound] = useState(0)
    // ticket rounds calculation function
    const calculateRounds = (round) => {
        if (item?.rounds[round]._status === false) {
            setRound(round + 1)
        }
    }
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()
    const dispatch = useDispatch()
    // discount calculation
    const discountedPrice = Number((item?.rounds[round]?._price - ((item?.rounds[round]?._price * item?.rounds[round]?._dis) / 100)))
    const baseUrl = process.env.REACT_APP_NODE_HOST
    // Accesing token
    const token = JSON.parse(window.localStorage.getItem("token"))


    // buyNow function
    const buyNow = (ticket) => {
        // dispatch(emptyCart())
        const subtotal = Number(ticket?.rounds[round]?._price)
        const total = (Number(ticket?.rounds[round]?._dis) ?
            (Number(ticket?.rounds[round]?._price) - ((Number(ticket?.rounds[round]?._price) * Number(ticket?.rounds[round]?._dis)) / 100))
            : Number(ticket?.rounds[round]?._price))
        const discount = ((Number(ticket?.rounds[round]?._price) * Number(ticket?.rounds[round]?._dis)) / 100)
        const amount = { subtotal: subtotal, total: total, discount: discount }

        const newTicket = {
            product_id: ticket._id,
            unit_price: (Number(ticket?.rounds[round]?._price)).toFixed(2),
            quantity: 1,
            discount: (Number(ticket?.rounds[round]?._dis)).toFixed(2),
            total_price: (subtotal).toFixed(2),
            total_discount_price: (total).toFixed(2)
        }

        const orderData = { product_info: newTicket, amount: amount, ticket: ticket }
        dispatch(buyNowItem(orderData))
    }


    useEffect(() => {
        // console.log("render");
        startTimer(item?.rounds[round]?._time)
    })

    useEffect(() => {
        calculateRounds(round)
    }, [])

    return (
        <>
            <div className="banner_img">
                <img src={baseUrl + item?.banner_image} alt="baaner" className="img-fluid" />
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
                                    <span>{token ? currency_symbol : generalCurrency_symbol}
                                    </span>{discountedPrice ? discountedPrice : item?.rounds[round]?._price}
                                </h4>
                            </div>
                            <div className="banner_product_btn">
                                {/* Buy Now Button */}
                                {
                                    (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                        (item?.rounds[round]?._qty) > 0 ?
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

export default memo(BannerData)