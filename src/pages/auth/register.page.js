import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import useRegex from '../../utils/useRegex';
import { authSetEmailReducer, authSetPasswordReducer } from "../../providers/auth.provider";

export default function RegisterPage({ setAuthMode }) {
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { regexEmail, regexPassword } = useRegex()
    const authProvider = useSelector((state) => state.auth.value)

    const [getEmailValue, setEmailValue] = useState("")
    const [getPasswordValue, setPasswordValue] = useState("")

    const [getEmailError, setEmailError] = useState()
    const [getPasswordError, setPasswordError] = useState()

    useEffect(() => {
        setEmailValue(authProvider.email)
        setPasswordValue(authProvider.password)
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
                                    Begin your  <label className="text-xl">nextChapter</label>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-center mb-3 font-normal">
                                    <small>Create your account</small>
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
                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                    value={getPasswordValue}
                                    onChange={(event) => {
                                        setPasswordError("")
                                        const onChangeValue = event.target.value
                                        setPasswordValue(onChangeValue)
                                        dispatch(
                                            authSetPasswordReducer({
                                                password: onChangeValue,
                                            })
                                        );
                                    }}
                                />
                                {getPasswordError ? (<p className="text-sm text-red-400 mt-1">{getPasswordError}</p>) : null}
                            </div>

                            <div className="mb-11">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin"
                                        type="checkbox"
                                        className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                    />
                                    <span className="ml-2 text-sm font-semibold text-gray-600">
                                        I agree with the{" "}
                                        <a
                                            href="#pablo"
                                            className="text-lightBlue-500"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            privacy policy
                                        </a>
                                        {" "} and {" "}
                                        <a
                                            href="#pablo"
                                            className="text-lightBlue-500"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            terms of service.
                                        </a>
                                    </span>
                                </label>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        //regex email
                                        const emailRes = regexEmail(getEmailValue)
                                        if (emailRes) setEmailError(emailRes)
                                        //regex password
                                        const passwordRes = regexPassword(getPasswordValue)
                                        if (passwordRes?.message) setPasswordError(passwordRes.message)
                                        // navigate("/events")
                                    }}
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </div>




                    <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">

                        </div>
                        <div className="w-1/2 text-right">
                            <div onClick={() => {
                                setAuthMode("login")
                            }} className="">
                                <small>Already have an account</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
