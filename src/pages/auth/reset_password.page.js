import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import useRegex from '../../utils/useRegex';

export default function ResetPasswordPage({ setAuthMode, getDecodedTicket }) {
    const navigate = useNavigate()
    const { regexPassword } = useRegex()

    const [getNewPasswordValue, setNewPasswordValue] = useState("")
    const [getConfirmNewPasswordValue, setConfirmNewPasswordValue] = useState("")

    const [getNewPasswordError, setNewPasswordError] = useState()
    const [getConfirmNewPasswordError, setConfirmNewPasswordError] = useState()

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center">
                                <div className="text-center mb-3 font-bold">
                                    Reset password
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-center mb-3 font-normal">
                                    <small>Enter a new password for {getDecodedTicket.email}.</small>
                                </div>
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className={`${getNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                    placeholder="Your new password"
                                    value={getNewPasswordValue}
                                    onChange={(event) => {
                                        setNewPasswordError("")
                                        const onChangeValue = event.target.value
                                        setNewPasswordValue(onChangeValue)
                                    }}
                                />
                                {getNewPasswordError ? (<p className="text-sm text-red-400 mt-1">{getNewPasswordError}</p>) : null}
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className={`${getConfirmNewPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                    placeholder="Confirm your new password"
                                    value={getConfirmNewPasswordValue}
                                    onChange={(event) => {
                                        setConfirmNewPasswordError("")
                                        const onChangeValue = event.target.value
                                        setConfirmNewPasswordValue(onChangeValue)
                                    }}
                                />
                                {getConfirmNewPasswordError ? (<p className="text-sm text-red-400 mt-1">{getConfirmNewPasswordError}</p>) : null}
                            </div>
                            <div className="mb-11">

                            </div>

                            <div className="text-center mt-6">
                                <button
                                    className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {

                                        //regex new password
                                        const newPasswordRes = regexPassword(getNewPasswordValue)
                                        if (newPasswordRes?.message) setNewPasswordError(newPasswordRes.message)
                                        //regex confirm new password
                                        const confirmPasswordRes = regexPassword(getConfirmNewPasswordValue)
                                        if (confirmPasswordRes?.message) setConfirmNewPasswordError(confirmPasswordRes.message)

                                        if (!newPasswordRes?.message && !confirmPasswordRes?.message) {
                                            if (getNewPasswordValue === getConfirmNewPasswordValue) {
                                                setAuthMode("login")
                                                navigate("/auth")
                                            } else {
                                                setConfirmNewPasswordError("Password does not match.")
                                            }
                                        }
                                    }}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
