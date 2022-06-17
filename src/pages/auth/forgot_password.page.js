import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useRegex from '../../utils/useRegex';
import { authSetEmailReducer } from "../../providers/auth.provider"

export default function ForgotPasswordPage({ setAuthMode }) {
    const dispatch = useDispatch()
    const { regexEmail } = useRegex()
    const authProvider = useSelector((state) => state.auth.value)

    const [getEmailValue, setEmailValue] = useState("")

    const [getEmailError, setEmailError] = useState()

    useEffect(() => {
        setEmailValue(authProvider.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center">
                                <div className="text-center mb-3 font-bold">
                                    Forgot your password?
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-center mb-3 font-normal">
                                    <small>Enter the email address associated with your account, and we'll email you a link to reset your password.</small>
                                </div>
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`${getEmailError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                    placeholder="Email"
                                    value={getEmailValue}
                                    onChange={(event) => {
                                        setEmailError("")
                                        const onChangeValue = event.target.value
                                        setEmailValue(onChangeValue)
                                        dispatch(
                                            authSetEmailReducer({
                                                email: onChangeValue,
                                            })
                                        );
                                    }}
                                />
                                {getEmailError ? (<p className="text-sm text-red-400 mt-1">{getEmailError}</p>) : null}
                            </div>

                            <div className="mb-11">

                            </div>

                            <div className="text-center mt-6">
                                <button
                                    className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        //regex email
                                        const emailRes = regexEmail(getEmailValue)
                                        if (emailRes) setEmailError(emailRes)

                                        if (!emailRes) {
                                            setAuthMode("login")
                                        }
                                    }}
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                            <div onClick={() => {
                                setAuthMode("login")
                            }} className="">
                                <small>Already have an account</small>
                            </div>
                        </div>
                        <div className="w-1/2 text-right">
                            <div onClick={() => {
                                setAuthMode("register")
                            }} className="">
                                <small>Create new account</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
