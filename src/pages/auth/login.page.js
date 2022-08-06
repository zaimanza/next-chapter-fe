import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
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

        if (!emailRes && !passwordRes?.message) {
            const result = await _useAuthModule.peopleLogin({
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

                dispatch(
                    peopleLoginReducer(result)
                )
                navigate("/events")
            }
        }
    }

    return (
        <div className="container mx-auto h-full">
            <form className="h-full" onSubmit={handleSubmit}>
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full max-w-[35rem] px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-white">
                            <div className="rounded-t mb-0 px-[1.5rem] py-[1.5rem]">
                                <div className="text-center mb-[1rem] font-bold ">
                                    Log into your <label className="text-xl text-[#DE206A]">nextChapter</label>
                                </div>
                                <div className="text-center mb-[1rem] font-normal">
                                    <small>Continue your journey.</small>
                                </div>
                                {timerCountdown === 0 ? null : <StaticToast
                                    config={getToastConfig ?? {
                                        message: "Website is unavailable. Please try again later.",
                                        mode: "error"
                                    }}
                                />}
                                <div className="relative w-full mb-[1rem]">
                                    <label
                                        className="block uppercase text-[1rem] font-bold mb-[0.5rem]"
                                        htmlFor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        maxLength="100"
                                        className={`${getEmailError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[0.8rem] py-[0.8rem] bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
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
                                    {getEmailError && (<p className="text-sm text-red-400 mt-[0.2rem]">{getEmailError}</p>)}
                                </div>

                                <div className="relative w-full mb-[1rem]">
                                    <label
                                        className="block uppercase text-sm font-bold mb-[0.6rem]"
                                        htmlFor="grid-password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        maxLength="100"
                                        className={`${getPasswordError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-[0.8rem] py-[0.8rem] bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
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
                                    {getPasswordError && (<p className="text-sm text-red-400 mt-[0.2rem]">{getPasswordError}</p>)}
                                </div>

                                <div className="mb-[2rem]">
                                </div>

                                <button
                                    className="bg-gray-800 text-center text-white active:bg-gray-600 text-sm font-bold uppercase px-[0.7rem] py-[0.7rem] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-[1.2rem] relative">
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
            </form>
        </div>
    );
}
