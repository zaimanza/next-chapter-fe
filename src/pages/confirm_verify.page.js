import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthModule from '../modules/useAuth.module'

const ConfirmVerifyPage = () => {
    const navigate = useNavigate();
    const { ticket } = useParams()
    const _useAuthModule = useAuthModule()

    useEffect(() => {
        const initFunction = async () => {
            try {
                if (ticket) {
                    const decodedTicket = JSON.parse(atob(ticket))

                    if (decodedTicket) {
                        if (decodedTicket?.mode === "confirm-verify-email") {
                            const result = await _useAuthModule.peopleVerifyEmail({
                                node_ticket: decodedTicket?.node_ticket,
                            })

                            if (!result?.error) {
                                if (result?.error?.error) { navigate("/auth"); } else {
                                    navigate("/events")
                                }

                            } else {
                                navigate("/auth");
                            }
                        }
                    }
                }
            } catch (error) {
                navigate("/auth");
            }
        }
        initFunction()

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