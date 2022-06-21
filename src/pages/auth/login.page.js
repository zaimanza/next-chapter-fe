import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import useRegex from '../../utils/useRegex';
import { authSetEmailReducer, authSetPasswordReducer } from "../../providers/auth.provider";
import useAuthModule from "../../modules/useAuth.module";
import useTimer from "../../utils/useTimer";
import StaticToast from "../../components/toasts/StaticToast.component";
import { peopleLoginReducer } from "../../providers/people.provider";

export default function LoginPage({ setAuthMode }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { regexEmail, regexPassword } = useRegex()
    const _useAuthModule = useAuthModule()
    const { timerCountdown, startTimer } = useTimer()
    const run_uno = useRef(false)
    const authProvider = useSelector((state) => state.auth.value)

    const [getEmailValue, setEmailValue] = useState("")
    const [getPasswordValue, setPasswordValue] = useState("")

    const [getEmailError, setEmailError] = useState()
    const [getPasswordError, setPasswordError] = useState()
    const [getToastConfig, setToastConfig] = useState()
    const email_ref = useRef()
    const password_ref = useRef()

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            console.log("pel")
            setEmailValue(authProvider.email)
            setPasswordValue(authProvider.password)
            window.addEventListener('keydown', e => { })
            window.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    console.log('You pressed Enter')
                    console.log(email_ref.current)
                    handleSubmit()
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        email_ref.current = getEmailValue
        password_ref.current = getPasswordValue
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getEmailValue, getPasswordValue])

    const handleSubmit = async () => {
        //regex email
        const emailRes = regexEmail(email_ref.current)
        if (emailRes) setEmailError(emailRes)
        //regex password
        const passwordRes = regexPassword(password_ref.current)
        if (passwordRes?.message) setPasswordError(passwordRes.message)

        if (!emailRes && !passwordRes?.message) {
            const result = await _useAuthModule.peopleLogin({
                email: email_ref.current,
                password: password_ref.current
            })

            if (result?.error || !result) {

                startTimer(10, 1000)
                if (result?.error?.error) {

                    setToastConfig({
                        message: "Website is unavailable. Please try again later.",
                        mode: "error"
                    })
                } else if (result?.error) {
                    if (result?.error?.isemailverify === false) {
                        dispatch(
                            await authSetEmailReducer({
                                email: result?.error?.email,
                            })
                        );
                        setAuthMode("send-verify-email")
                    } else {
                        setToastConfig({
                            message: result?.error ?? "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
                    }
                }
            } else {
                console.log(result)
                dispatch(
                    peopleLoginReducer(result)
                )
                navigate("/events")
            }
        }
    }

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 bg-white">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center">
                                <div className="text-center mb-3 font-bold ">
                                    Log into your <label className="text-xl">nextChapter</label>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-center mb-3 font-normal">
                                    <small>Continue your journey.</small>
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
                                        )
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
                                {getPasswordError ? (<p className="text-sm text-red-400 mt-1">{getPasswordError}</p>) : null}
                            </div>

                            <div className="mb-11">
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                            <div onClick={() => {
                                setAuthMode("forgot-password")
                            }} className="mr-auto w-fit hover:underline hover:text-blue-600">
                                <small>Forgot password?</small>
                            </div>
                        </div>
                        <div className="w-1/2 text-right">
                            <div onClick={() => {
                                setAuthMode("register")
                            }} className="ml-auto w-fit hover:underline hover:text-blue-600">
                                <small>Create new account</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
