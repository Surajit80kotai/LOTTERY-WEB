import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTimer } from '../../../customHooks/useTimer'

const StudyTravel = ({ item, index }) => {
    const navigate = useNavigate()
    const { time_left, ticket_name, ticket_price, ticket_quantity, discount_percentage, main_image, is_image, _id } = item
    const discountedPrice = Number((ticket_price - ((ticket_price * discount_percentage) / 100)))
    // defining states timer
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()

    // currency variables
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL

    const baseUrl = process.env.REACT_APP_NODE_HOST

    useEffect(() => {
        // console.log("render");
        startTimer(Number(time_left))
    })

    return (
        <>
            {
                !index || index < 7 ?
                    <div className="col-md-3 product_item">
                        <Link to={`/info/${_id}`}>
                            <div className="product_item_one">
                                <div className="product_img">
                                    <div className="pro_img">
                                        {/* Image Condition */}
                                        {
                                            (is_image?.length) ? <img src={baseUrl + main_image} alt="" className="img-fluid " />
                                                : <img src="/assets/img/imageunavailable.jpeg" alt="" className="img-fluid " />
                                        }
                                    </div>

                                </div>
                                <div className="product_content">
                                    <div className="product_price">
                                        {
                                            discount_percentage ?
                                                <h3>
                                                    <span className="discountprice">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{discountedPrice}</span>&nbsp;&nbsp;<span>{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}</span>
                                                    <span className="text-decoration-line-through">&nbsp;{ticket_price}</span>&nbsp;&nbsp;
                                                    <span className="discount_percent">{discount_percentage}% off</span>
                                                </h3>
                                                :
                                                <h3>
                                                    <span className="discountprice">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}&nbsp;{ticket_price}</span>
                                                </h3>
                                        }

                                    </div>
                                    <div className="product_title">
                                        <h2 className="card_title">{ticket_name}</h2>
                                    </div>
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            ticket_quantity > 0 ?
                                                <h3 className="total_ticket">Ticket Quantity : {ticket_quantity}</h3>
                                                : <h3 className="total_ticket">All tickets sold</h3>
                                            : null
                                    }

                                    {/* Condition for timer run-out */}
                                    {
                                        (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                                            <div className="time_left">
                                                <div id="coundown" className="countdown text-center">
                                                    <div className="timeleftarea">
                                                        <div id="days" className=" days">{timerDays}
                                                        </div>
                                                        <br /><span>Days</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="hours" className=" hours">{timerHours}
                                                        </div>
                                                        <br /><span>Hours</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="minutes" className=" minutes">{timerMinutes}
                                                        </div>
                                                        <br /><span>Mins</span>
                                                    </div>
                                                    <div className="timeleftarea">
                                                        <div id="seconds" className=" seconds">{timerSeconds}
                                                        </div>
                                                        <br /><span>Sec</span>
                                                    </div>
                                                </div>
                                            </div>
                                            : <h3 className='text-danger mt-3'>Ticket is unavailabe right now</h3>
                                    }

                                </div>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="col-md-3 product_item">
                        <div className="product_item_one">
                            <div className="view_all_bg">
                                <img src="/assets/img/viewmorecard.png" alt="" className="img-fluid" />
                                <div className="viewall_btn">
                                    <h6>Looking More? Click Here</h6>
                                    <button className="btn2 mt-2" onClick={() => navigate('/viewallstud_trv')}>View All</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default StudyTravel