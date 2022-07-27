import { useState, useRef } from 'react';

function useTimer() {

    const [timerCountdown, setTimerCountdown] = useState(0)
    let counter = useRef().current
    var interval
    const startTimer = async (duration, miliSecInterval) => {
        clearInterval(interval)
        counter = duration
        setTimerCountdown(counter)
        interval = await setInterval(() => {
            if (counter > 0) {
                counter = counter - 1
                setTimerCountdown(counter)
            }
            else if (counter <= 0) {
                clearInterval(interval)
                setTimerCountdown(0)
            }
        }, miliSecInterval)
    }
    const endTimer = async () => {
        clearInterval(interval)
        setTimerCountdown(0)
        counter = 0
    }

    return { timerCountdown, startTimer, endTimer }
}
export default useTimer