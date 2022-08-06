import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import StaticToast from "../../components/toasts/StaticToast.component"
import useAuthModule from "../../modules/useAuth.module"
import GetIntegerRandom from "../../utils/GetIntegerRandom"
import useTimer from '../../utils/useTimer'

export default function SendVerifyEmailPage({ setAuthMode }) {

    const navigate = useNavigate()
    const clickEmailTimer = useTimer()
    const showToastTimer = useTimer()
    const _useAuthModule = useAuthModule()

    const [getToastConfig, setToastConfig] = useState()

    const authProvider = useSelector((state) => state.auth.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await _useAuthModule.peopleSendVerifyEmail({
            email: authProvider?.email,
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
            clickEmailTimer?.startTimer(GetIntegerRandom({ min: 40, max: 60 }), 1000)

        }
    }

    return (
        <div className="container mx-auto h-full">
            <form onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full max-w-[35rem] px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-[1.5rem] py-[1.5rem]">
                                <div className="text-center mb-[1rem] font-bold ">
                                    Verify your email
                                </div>
                                {showToastTimer?.timerCountdown === 0 ? null :
                                    <StaticToast
                                        config={getToastConfig ?? {
                                            message: "Website is unavailable. Please try again later.",
                                            mode: "error"
                                        }}
                                    />
                                }
                                <div className="text-center mb-[1rem] font-normal text-sm">
                                    We&apos;ve sent an email verification link to <p className="font-bold text-black mt-2">{authProvider.email}</p>
                                </div>

                                <div className="mb-[2rem]">
                                </div>

                                <button
                                    className={`${clickEmailTimer?.timerCountdown === 0 ? "active:bg-gray-600 bg-gray-800 hover:shadow-lg" : "bg-gray-400"} text-white text-sm font-bold uppercase px-[0.7rem] py-[0.7rem] rounded shadow outline-none focus:outline-none w-full ease-linear transition-all duration-150`}
                                    type="submit"
                                    disabled={clickEmailTimer?.timerCountdown === 0 ? false : true}
                                    onClick={handleSubmit}
                                >
                                    {clickEmailTimer?.timerCountdown === 0 ? "Send Reset Link" : `Resend link in (${clickEmailTimer?.timerCountdown}sec)`}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-[1.2rem] relative">
                            <div className="w-full  justify-center">
                                <div onClick={() => {
                                    setAuthMode("login")
                                    navigate("/auth")
                                }} className="mx-auto w-fit hover:underline text-sm hover:text-blue-600">
                                    Back to login
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}