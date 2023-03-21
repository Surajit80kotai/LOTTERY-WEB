import React, { useEffect } from 'react'
import { useTimer } from '../customHooks/useTimer';

const LotteryInfoTimer = ({ ticketInfo, round }) => {
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()

    //timestamp
    const dateStr = ticketInfo[0]?.rounds[round]?._time
    const dateObj = new Date(dateStr);
    const timestamp = dateObj.getTime();

    useEffect(() => {
        startTimer(Number(timestamp))
        // console.log("render");
    })

    return (
        <>
            {
                (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                    <div className="product_time">
                        <div id="coundown" className="countdown product_timeleftwrap">
                            <div className="product_timeleft">
                                <div id="days" className="time_left_style days">{timerDays}
                                </div>
                                <br /><span>Days</span>
                            </div>
                            <div className="product_timeleft">
                                <div id="hours" className="time_left_style hours">{timerHours}
                                </div>
                                <br /><span>Hours</span>
                            </div>
                            <div className="product_timeleft">
                                <div id="minutes" className="time_left_style minutes">{timerMinutes}
                                </div>
                                <br /><span>Mins</span>
                            </div>
                            <div className="product_timeleft">
                                <div id="seconds" className="time_left_style seconds">{timerSeconds}
                                </div>
                                <br /><span>Sec</span>
                            </div>
                        </div>
                    </div>
                    : <h3 className='text-danger my-5'>Ticket is Unavailabe Right Now</h3>
            }
        </>
    )
}

export default LotteryInfoTimer