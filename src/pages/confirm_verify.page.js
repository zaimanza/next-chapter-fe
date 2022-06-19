import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ConfirmVerifyPage = () => {
    const { ticket } = useParams()

    useEffect(() => {
        if (ticket) {

            const decodedTicket = JSON.parse(atob(ticket))

            console.log(decodedTicket)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='bg-pink-400'>
            <div className="relative w-full h-full py-40 min-h-screen">

            </div>
        </div>
    )
}

export default ConfirmVerifyPage