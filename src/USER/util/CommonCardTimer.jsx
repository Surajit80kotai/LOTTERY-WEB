import React, { useEffect } from 'react'
import { useTimer } from '../customHooks/useTimer'

const CommonCardTimer = ({ item, round }) => {
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()
    const { rounds } = item

    //timestamp
    const dateStr = rounds[round]?._time;
    const dateObj = new Date(dateStr);
    const timestamp = dateObj.getTime();

    useEffect(() => {
        startTimer(Number(timestamp))
    })

    return (
        <>
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
                    :
                    <div className="time_left">
                        <div id="coundown" className="countdown text-center">
                            <div className="timeleftarea">
                                <div id="hours" className=" hours"></div>
                                <br />
                                <span className='text-danger fs-5'>Ticket is unavailabe right now</span>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default CommonCardTimer