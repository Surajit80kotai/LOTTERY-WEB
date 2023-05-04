import React, { useEffect } from 'react'
import { useTimer } from '../customHooks/useTimer'
import { useTranslation } from 'react-i18next'

const Timer = ({ item }) => {
    const { t } = useTranslation()
    const [timerDays, timerHours, timerMinutes, timerSeconds, startTimer] = useTimer()

    useEffect(() => {
        startTimer(item?.result_on)
        // console.log("render");
    }, [startTimer, item?.result_on])


    return (
        <>
            {
                (timerDays && timerHours && timerMinutes && timerSeconds) >= 0 ?
                    <div className="">
                        <div id="coundown" className="timer_area">
                            <div className="timeItem">
                                <div id="days" className=" ">{timerDays}
                                </div>
                                <br /><span>{t("dd")}</span>
                            </div>
                            <div className="timeItem">
                                <div id="hours" className=" ">{timerHours}
                                </div>
                                <br /><span>{t("hh")}</span>
                            </div>
                            <div className="timeItem">
                                <div id="minutes" className=" ">{timerMinutes}
                                </div>
                                <br /><span>{t("mm")}</span>
                            </div>
                            <div className="timeItem">
                                <div id="seconds" className=" ">{timerSeconds}
                                </div>
                                <br /><span>{t("ss")}</span>
                            </div>
                        </div>
                    </div>
                    : <h3 className='text-danger my-5'>{t("Ticket is unavailabe right now")}</h3>
            }
        </>
    )
}

export default Timer