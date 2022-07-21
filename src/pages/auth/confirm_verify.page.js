import React, { useEffect, useRef } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import useAuthModule from '../../modules/useAuth.module'
import { peopleLoginReducer } from '../../providers/people.provider'
import TabTitle from '../../utils/TabTitle.util'
import { WebsiteName } from '../../utils/WebsiteName.util'

const ConfirmVerifyPage = () => {
    TabTitle({ newTitle: WebsiteName + ' - Verifying...' })
    const navigate = useNavigate();
    const { ticket } = useParams()
    const dispatch = useDispatch()
    const _useAuthModule = useAuthModule()
    const run_uno = useRef(false)

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

                                dispatch(
                                    peopleLoginReducer(result)
                                )
                                navigate("/events")
                            }
                        } else {
                            navigate("/auth")
                        }
                    }
                }
            }
        } catch (error) {
            navigate("/auth");
        }
    }

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            initFunction()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='bg-pink-400 w-full h-full'>
        </div>
    )
}

export default ConfirmVerifyPage