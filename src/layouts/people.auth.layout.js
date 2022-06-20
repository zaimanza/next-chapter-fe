import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import ForgotPasswordPage from '../pages/auth/forgot_password.page'
import LoginPage from '../pages/auth/login.page'
import RegisterPage from '../pages/auth/register.page'
import ResetPasswordPage from '../pages/auth/reset_password.page'
import SendVerifyEmailPage from '../pages/auth/send_verify_email.page'
import SendVerifyPasswordPage from '../pages/auth/send_verify_password.page'

const PeopleAuthLayout = () => {
    const navigate = useNavigate()
    const { ticket } = useParams()

    const [getAuthMode, setAuthMode] = useState("login")
    const [getDecodedTicket, setDecodedTicket] = useState({})

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {

        if (peopleProvider.access_token !== "") {
            navigate("/events");
        } else {
            navigate("/auth");
        }

        if (ticket) {

            // eyJtb2RlIjoicmVzZXQtcGFzc3dvcmQiLCJlbWFpbCI6InphaW1hbjY3MEBnbWFpbC5jb20ifQ==
            // const ecodedTicket = {
            //     mode: "reset-password",
            //     email: "zaiman670@gmail.com"
            // }
            // var encodedStringBtoA = btoa(JSON.stringify(ecodedTicket))
            // console.log(encodedStringBtoA)

            const decodedTicket = JSON.parse(atob(ticket))

            if (Object.keys(decodedTicket).length !== 0) {
                setAuthMode(decodedTicket?.mode)
                setDecodedTicket(decodedTicket)
            } else {
                navigate("/auth");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='bg-pink-400'>
            <div className="w-full h-full py-40 min-h-screen">
                <div
                    className="my-auto top-0 w-full h-full bg-no-repeat bg-full"
                // style={{
                //     backgroundImage:
                //         "url(" + require("assets/img/register_bg_2.png").default + ")",
                // }}
                >
                    {(getAuthMode === "login") ? <LoginPage setAuthMode={setAuthMode} /> : null}
                    {(getAuthMode === "register") ? <RegisterPage setAuthMode={setAuthMode} /> : null}
                    {(getAuthMode === "forgot-password") ? <ForgotPasswordPage setAuthMode={setAuthMode} /> : null}
                    {(getAuthMode === "reset-password") ? <ResetPasswordPage
                        setAuthMode={setAuthMode}
                        getDecodedTicket={getDecodedTicket}
                    /> : null}
                    {(getAuthMode === "send-verify-email") ? <SendVerifyEmailPage
                        setAuthMode={setAuthMode}
                    /> : null}
                    {(getAuthMode === "send-verify-password") ? <SendVerifyPasswordPage
                        setAuthMode={setAuthMode}
                        getDecodedTicket={getDecodedTicket}
                    /> : null}
                </div>
            </div>
        </div>
    )
}

export default PeopleAuthLayout