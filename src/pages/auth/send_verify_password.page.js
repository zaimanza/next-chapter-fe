import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import StaticToast from "../../components/toasts/StaticToast.component"
import useAuthModule from "../../modules/useAuth.module"
import GetIntegerRandom from "../../utils/GetIntegerRandom"
import useTimer from '../../utils/useTimer'

export default function SendVerifyPasswordPage({ setAuthMode, getDecodedTicket }) {

    const navigate = useNavigate()
    const clickPasswordTimer = useTimer()
    const showToastTimer = useTimer()
    const _useAuthModule = useAuthModule()

    const [getToastConfig, setToastConfig] = useState()

    const authProvider = useSelector((state) => state.auth.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await _useAuthModule.peopleForgotPassword({
            email: authProvider.email,
        })
        if (result?.error || !result) {
            if (result?.error?.error) {
                setToastConfig({
                    message: "Website is unavailable. Please try again later.",
                    mode: "error"
                })
            } else if (result?.error) {
                setToastConfig({
                    message: result?.error ?? "Website is unavailable. Please try again later.",
                    mode: "error"
                })
            }
            showToastTimer?.startTimer(10, 1000)
        } else {
            clickPasswordTimer?.startTimer(GetIntegerRandom({ min: 40, max: 60 }), 1000)

        }
    }

    return (
        <div className="container mx-auto px-4 h-full">
            <form onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center">
                                    <div className="text-center mb-3 font-bold">
                                        Reset your password
                                    </div>
                                </div>
                                {showToastTimer?.timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="text-center">
                                    <div className="text-center mb-3 font-normal">
                                        <small>We&apos;ve sent a password verification link to <p className="font-bold text-black mt-2">{authProvider.email}</p></small>
                                    </div>
                                </div>
                                <div className="relative w-full mb-3">
                                </div>

                                <div className="mb-11">

                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        className={`${clickPasswordTimer?.timerCountdown === 0 ? "active:bg-gray-600 bg-gray-800 hover:shadow-lg" : "bg-gray-400"} text-white text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
                                        type="submit"
                                        disabled={clickPasswordTimer?.timerCountdown === 0 ? false : true}
                                        onClick={handleSubmit}
                                    >
                                        {clickPasswordTimer?.timerCountdown === 0 ? "Send Reset Link" : `Resend link in (${clickPasswordTimer?.timerCountdown}sec)`}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-full  justify-center">
                                <div onClick={() => {
                                    setAuthMode("login")
                                    navigate("/auth")
                                }} className="mx-auto w-fit hover:underline hover:text-blue-600">
                                    <small>Back to login</small>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}