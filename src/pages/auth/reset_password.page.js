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
        <div className="container mx-auto h-full">
            <form onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full max-w-[35rem] px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-[1.5rem] py-[1.5rem]">
                                <div className="text-center mb-[1rem] font-bold text-lg">
                                    Reset password
                                </div>
                                <div className="text-center mb-[1rem] font-normal text-sm">
                                    Enter a new password
                                </div>
                                {timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="relative w-full mb-[1rem]">
                                    <label
                                        className="block text-sm font-medium mb-[0.6rem]"
                                        htmlFor="grid-password"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        maxLength="100"
                                        className={`${getNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[0.8rem] py-[0.8rem] bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                        placeholder="Your new password"
                                        value={getNewPasswordValue}
                                        onChange={(event) => {
                                            setNewPasswordError("")
                                            const onChangeValue = event.target.value
                                            setNewPasswordValue(onChangeValue)
                                        }}
                                    />
                                    {getNewPasswordError && (<p className="text-sm text-red-400 mt-[0.2rem]">{getNewPasswordError}</p>)}
                                </div>

                                <div className="relative w-full mb-[1rem]">
                                    <label
                                        className="block text-sm font-medium mb-[0.6rem]"
                                        htmlFor="grid-password"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        maxLength="100"
                                        className={`${getConfirmNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[0.8rem] py-[0.8rem] bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                        placeholder="Confirm your new password"
                                        value={getConfirmNewPasswordValue}
                                        onChange={(event) => {
                                            setConfirmNewPasswordError("")
                                            const onChangeValue = event.target.value
                                            setConfirmNewPasswordValue(onChangeValue)
                                        }}
                                    />
                                    {getConfirmNewPasswordError && (<p className="text-sm text-red-400 mt-[0.2rem]">{getConfirmNewPasswordError}</p>)}
                                </div>

                                <div className="mb-[2rem]">
                                </div>

                                <button
                                    className="bg-gray-800 text-center text-white active:bg-gray-600 text-sm font-bold uppercase px-[0.7rem] py-[0.7rem] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Reset Password
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
