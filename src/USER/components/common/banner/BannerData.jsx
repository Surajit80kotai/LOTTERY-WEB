import React from 'react'
import { useEffect } from 'react'
import { useTimer } from '../../../customHooks/useTimer'

const BannerData = ({ item }) => {

    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()

    // currency variables
    const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
    const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL

    const baseUrl = process.env.REACT_APP_NODE_HOST

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
                                <h1 className="banner_title">{item?.ticket_name}</h1>
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
                                <h4>Ticket Price<span><h3 className="currencysymbol">{userCurrency_symbol ? userCurrency_symbol : generalCurrency_symbol}</h3></span>{item?.ticket_price}</h4>
                            </div>
                        </div>
                        : <h1 className='text-white'>Ticket is unavailabe right now</h1>
                }
            </div>
        </>
    )
}

export default BannerData