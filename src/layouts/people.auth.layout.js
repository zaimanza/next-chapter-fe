import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import ForgotPasswordPage from '../pages/auth/forgot_password.page'
import LoginPage from '../pages/auth/login.page'
import RegisterPage from '../pages/auth/register.page'
import ResetPasswordPage from '../pages/auth/reset_password.page'
import SendVerifyEmailPage from '../pages/auth/send_verify_email.page'
import SendVerifyPasswordPage from '../pages/auth/send_verify_password.page'
import { useRef } from 'react'
import TabTitle from '../utils/TabTitle.util'
import { WebsiteName } from '../utils/WebsiteName.util'

const PeopleAuthLayout = () => {
    const navigate = useNavigate()
    const { ticket } = useParams()

    const [getAuthMode, setAuthMode] = useState("login")
    const [getDecodedTicket, setDecodedTicket] = useState({})
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token !== "") {
                navigate("/events");
            }

            if (ticket) {
                const decodedTicket = JSON.parse(atob(ticket))

                if (Object.keys(decodedTicket).length !== 0) {
                    setAuthMode(decodedTicket?.mode)
                    setDecodedTicket(decodedTicket)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        switch (getAuthMode) {
            case "register":
                TabTitle({ newTitle: WebsiteName + ' - Register Account' })
                break;
            case "forgot-password":
                TabTitle({ newTitle: WebsiteName + ' - Forgot Password' })
                break;
            case "reset-password":
                TabTitle({ newTitle: WebsiteName + ' - Reset Password' })
                break;
            case "send-verify-email":
                TabTitle({ newTitle: WebsiteName + ' - Verify Email' })
                break;
            case "send-verify-password":
                TabTitle({ newTitle: WebsiteName + ' - Verify Password' })
                break;
            case "login":
                TabTitle({ newTitle: WebsiteName + ' - Login' })
                break;
            default:
                TabTitle({ newTitle: 'nextChapter' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAuthMode])

    return (
        <div className='bg-[#DE206A] w-[100%] min-h-[100vh] flex items-center justify-center'>
            {(getAuthMode === "login") && <LoginPage setAuthMode={setAuthMode} />}
            {(getAuthMode === "register") && <RegisterPage setAuthMode={setAuthMode} />}
            {(getAuthMode === "forgot-password") && <ForgotPasswordPage setAuthMode={setAuthMode} />}
            {(getAuthMode === "reset-password") && <ResetPasswordPage
                setAuthMode={setAuthMode}
                getDecodedTicket={getDecodedTicket}
            />}
            {(getAuthMode === "send-verify-email") && <SendVerifyEmailPage
                setAuthMode={setAuthMode}
            />}
            {(getAuthMode === "send-verify-password") && <SendVerifyPasswordPage
                setAuthMode={setAuthMode}
                getDecodedTicket={getDecodedTicket}
            />}
        </div>
    )
}

export default PeopleAuthLayout