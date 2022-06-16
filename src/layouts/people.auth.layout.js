import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ForgotPasswordPage from '../pages/auth/forgot_password.page'
import LoginPage from '../pages/auth/login.page'
import RegisterPage from '../pages/auth/register.page'
import ResetPasswordPage from '../pages/auth/reset_password.page'

const PeopleAuthLayout = () => {
    const navigate = useNavigate();
    const { ticket } = useParams()

    const [getAuthMode, setAuthMode] = useState("login")
    const [getDecodedTicket, setDecodedTicket] = useState({})

    useEffect(() => {
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
    }, []);

    return (
        <div className='bg-pink-400'>
            <div className="relative w-full h-full py-40 min-h-screen">
                <div
                    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
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
                </div>
            </div>
        </div>
    )
}

export default PeopleAuthLayout