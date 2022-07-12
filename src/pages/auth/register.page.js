import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useRegex from '../../utils/useRegex';
import { authSetEmailReducer, authSetPasswordReducer } from "../../providers/auth.provider";
import useAuthModule from "../../modules/useAuth.module";
import StaticToast from "../../components/toasts/StaticToast.component";
import useTimer from "../../utils/useTimer";

export default function RegisterPage({ setAuthMode }) {
    const dispatch = useDispatch()
    const run_uno = useRef(false)
    const { regexEmail, regexPassword } = useRegex()
    const _useAuthModule = useAuthModule()
    const { timerCountdown, startTimer } = useTimer()
    const authProvider = useSelector((state) => state.auth.value)

    const [getEmailValue, setEmailValue] = useState("")
    const [getPasswordValue, setPasswordValue] = useState("")
    const [getTermsPolicyCheck, setTermsPolicyCheck] = useState(false)

    const [getEmailError, setEmailError] = useState()
    const [getPasswordError, setPasswordError] = useState()
    const [getTermsPolicyError, setTermsPolicyError] = useState()
    const [getToastConfig, setToastConfig] = useState()

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            setEmailValue(authProvider.email)
            setPasswordValue(authProvider.password)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //regex email
        const emailRes = regexEmail(getEmailValue)
        if (emailRes) setEmailError(emailRes)
        //regex password
        const passwordRes = regexPassword(getPasswordValue)
        if (passwordRes?.message) setPasswordError(passwordRes.message)

        if (!getTermsPolicyCheck) setTermsPolicyError(true)
        if (!emailRes && !passwordRes?.message && getTermsPolicyCheck) {
            const result = await _useAuthModule.peopleRegister({
                email: getEmailValue,
                password: getPasswordValue
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
                dispatch(
                    await authSetEmailReducer({
                        email: result?.email,
                    })
                )
                setAuthMode("send-verify-email")
            }
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
                                        Begin your  <label className="text-xl">nextChapter</label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-center mb-3 font-normal">
                                        <small>Create your account</small>
                                    </div>
                                </div>
                                {timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        maxLength="100"
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
                                    {getEmailError && (<p className="text-sm text-red-400 mt-1">{getEmailError}</p>)}
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
                                        maxLength="100"
                                        className={`${getPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
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
                                    {getPasswordError && (<p className="text-sm text-red-400 mt-1">{getPasswordError}</p>)}
                                </div>

                                <div className="mb-11">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            checked={getTermsPolicyCheck || false}
                                            onChange={(event) => {
                                                setTermsPolicyError(false)
                                                setTermsPolicyCheck(event.target.checked)
                                            }}
                                            className={`${getTermsPolicyError ? "text-red-600 " : "text-gray-700"} selection:form-checkbox border-0 rounded ml-1 w-5 h-5 ease-linear transition-all duration-150`}
                                        />
                                        <span className={`${getTermsPolicyError ? "text-red-600" : "text-gray-600"} ml-2 text-sm font-semibold`}>
                                            I agree with the{" "}
                                            <a
                                                href="https://www.google.com/"
                                                className="underline text-blue-600"
                                            // onClick={(e) => e.preventDefault()}
                                            >
                                                privacy policy
                                            </a>
                                            {" "} and {" "}
                                            <a
                                                href="https://www.google.com/"
                                                className="underline text-blue-600"
                                            // onClick={(e) => e.preventDefault()}
                                            >
                                                terms of service.
                                            </a>
                                        </span>
                                    </label>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>




                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">

                            </div>
                            <div className="w-full">
                                <div onClick={() => {
                                    setAuthMode("login")
                                }} className="mx-auto w-fit hover:underline hover:text-blue-600">
                                    <small>Already have an account</small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}
