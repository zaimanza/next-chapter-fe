import { useState, useRef } from 'react';

function useTimer() {

    const [timerCountdown, setTimerCountdown] = useState(0)
    let counter = useRef().current

    const startTimer = async (duration, miliSecInterval) => {
        counter = duration
        const interval = setInterval(() => {
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

    return { timerCountdown, startTimer }
}
export default useTimer