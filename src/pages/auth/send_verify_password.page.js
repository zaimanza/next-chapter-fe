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
        <div className="container mx-auto px-[1.7vh] h-full">
            <form onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full max-w-[35rem] px-[1.7vh]">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-[2.5vh] py-[2.5vh]">
                                <div className="text-center mb-[1.5vh] font-bold ">
                                    Reset your password
                                </div>
                                {showToastTimer?.timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="text-center mb-[1.5vh] font-normal">
                                    <small>We&apos;ve sent a password verification link to <p className="font-bold text-black mt-[0.5vh]">{authProvider.email}</p></small>
                                </div>

                                <div className="mb-[4.5vh]">
                                </div>

                                <button
                                    className={`${clickPasswordTimer?.timerCountdown === 0 ? "active:bg-gray-600 bg-gray-800 hover:shadow-lg" : "bg-gray-400"} text-white text-[1.5vh] font-bold uppercase px-[1.7vh] py-[1.2vh] rounded shadow outline-none focus:outline-none w-full ease-linear transition-all duration-150`}
                                    type="button"
                                    disabled={clickPasswordTimer?.timerCountdown === 0 ? false : true}
                                    onClick={handleSubmit}
                                >
                                    {clickPasswordTimer?.timerCountdown === 0 ? "Send Reset Link" : `Resend link in (${clickPasswordTimer?.timerCountdown}sec)`}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-[2vh] relative">
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