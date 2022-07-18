import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import StaticToast from "../../components/toasts/StaticToast.component";
import useAuthModule from "../../modules/useAuth.module";
import useRegex from '../../utils/useRegex';
import useTimer from "../../utils/useTimer";

export default function ResetPasswordPage({ setAuthMode, getDecodedTicket }) {
    const navigate = useNavigate()
    const { regexPassword } = useRegex()
    const { timerCountdown, startTimer } = useTimer()
    const _useAuthModule = useAuthModule()
    const [getNewPasswordValue, setNewPasswordValue] = useState("")
    const [getConfirmNewPasswordValue, setConfirmNewPasswordValue] = useState("")

    const [getNewPasswordError, setNewPasswordError] = useState()
    const [getConfirmNewPasswordError, setConfirmNewPasswordError] = useState()
    const [getToastConfig, setToastConfig] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //regex new password
        const newPasswordRes = regexPassword(getNewPasswordValue)
        if (newPasswordRes?.message) setNewPasswordError(newPasswordRes.message)
        //regex confirm new password
        const confirmPasswordRes = regexPassword(getConfirmNewPasswordValue)
        if (confirmPasswordRes?.message) setConfirmNewPasswordError(confirmPasswordRes.message)

        if (!newPasswordRes?.message && !confirmPasswordRes?.message) {
            if (getNewPasswordValue === getConfirmNewPasswordValue) {
                const result = await _useAuthModule.peopleResetPassword({
                    password: getNewPasswordValue,
                    node_ticket: getDecodedTicket?.node_ticket,
                })

                if (result?.error || !result) {
                    startTimer(10, 1000)
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
                } else {
                    setAuthMode("login")
                    navigate("/auth")
                }
            } else {
                setConfirmNewPasswordError("Password does not match.")
            }
        }
    }

    return (
        <div className="container mx-auto px-[1.7vh] h-full">
            <form onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full max-w-[35rem] px-[1.7vh]">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-[2.5vh] py-[2.5vh]">
                                <div className="text-center mb-[1.5vh] font-bold">
                                    Reset password
                                </div>
                                <div className="text-center mb-[1.5vh] font-normal">
                                    <small>Enter a new password</small>
                                </div>
                                {timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="relative w-full mb-[1.5vh]">
                                    <label
                                        className="block uppercase text-[1.5vh] font-bold mb-[1vh]"
                                        htmlFor="grid-password"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        maxLength="100"
                                        className={`${getNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[1.3vh] py-[1.3vh] bg-white rounded text-[1.5vh] shadow w-full ease-linear transition-all duration-150`}
                                        placeholder="Your new password"
                                        value={getNewPasswordValue}
                                        onChange={(event) => {
                                            setNewPasswordError("")
                                            const onChangeValue = event.target.value
                                            setNewPasswordValue(onChangeValue)
                                        }}
                                    />
                                    {getNewPasswordError && (<p className="text-[1.5vh] text-red-400 mt-[0.3vh]">{getNewPasswordError}</p>)}
                                </div>

                                <div className="relative w-full mb-[1.5vh]">
                                    <label
                                        className="block uppercase text-[1.5vh] font-bold mb-[1vh]"
                                        htmlFor="grid-password"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        maxLength="100"
                                        className={`${getConfirmNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[1.3vh] py-[1.3vh] bg-white rounded text-[1.5vh] shadow w-full ease-linear transition-all duration-150`}
                                        placeholder="Confirm your new password"
                                        value={getConfirmNewPasswordValue}
                                        onChange={(event) => {
                                            setConfirmNewPasswordError("")
                                            const onChangeValue = event.target.value
                                            setConfirmNewPasswordValue(onChangeValue)
                                        }}
                                    />
                                    {getConfirmNewPasswordError && (<p className="text-[1.5vh] text-red-400 mt-[0.3vh]">{getConfirmNewPasswordError}</p>)}
                                </div>

                                <div className="mb-[4.5vh]">
                                </div>

                                <button
                                    className="bg-gray-800 text-center text-white active:bg-gray-600 text-[1.5vh] font-bold uppercase px-[1.7vh] py-[1.2vh] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Reset Password
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
