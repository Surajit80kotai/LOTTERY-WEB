import { useState } from 'react'

export const useTimer = () => {
    const [timerDays, setTimerDays] = useState()
    const [timerHours, setTimerHours] = useState()
    const [timerMinutes, setTimerMinutes] = useState()
    const [timerSeconds, setTimerSeconds] = useState()

    const startTimer = (time_left) => {
        const countDownDate = new Date(time_left + 86400000).getTime()
        var interval = setTimeout(() => {
            const now = new Date().getTime()
            const distance = countDownDate - now
            const days = Math.floor(distance / (24 * 60 * 60 * 1000))
            const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
            const seconds = Math.floor((distance % (60 * 1000)) / 1000)

            if (distance < 0) {
                // stop timer
                clearTimeout(interval)
            } else {
                // update timer
                setTimerDays(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        }, 1000)
    }

    return [
        timerDays,
        timerHours,
        timerMinutes,
        timerSeconds,
        startTimer
    ]
}