import React, { useEffect } from 'react'
import { useTimer } from '../customHooks/useTimer'

const Timer = ({ item }) => {
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()

    useEffect(() => {
        startTimer(item?.result_on)
        // console.log("render");
    })


    return (
        <>
            {
                (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                    <div className="">
                        <div id="coundown" className="timer_area">
                            <div className="timeItem">
                                <div id="days" className=" ">{timerDays}
                                </div>
                                <br /><span>dd</span>
                            </div>
                            <div className="timeItem">
                                <div id="hours" className=" ">{timerHours}
                                </div>
                                <br /><span>hh</span>
                            </div>
                            <div className="timeItem">
                                <div id="minutes" className=" ">{timerMinutes}
                                </div>
                                <br /><span>mm</span>
                            </div>
                            <div className="timeItem">
                                <div id="seconds" className=" ">{timerSeconds}
                                </div>
                                <br /><span>ss</span>
                            </div>
                        </div>
                    </div>
                    : <h3 className='text-danger my-5'>Ticket is unavailabe right now</h3>
            }
        </>
    )
}

export default Timer