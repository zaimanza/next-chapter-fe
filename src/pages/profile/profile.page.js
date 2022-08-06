import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { peopleLoginReducer, peopleLogoutReducer } from '../../providers/people.provider';
import { MdOutlineDone, MdClose } from "react-icons/md";
import { useRef } from 'react';
import useRegex from '../../utils/useRegex';
import useAuthModule from '../../modules/useAuth.module';
import GetIntegerRandom from '../../utils/GetIntegerRandom';
import useTimer from '../../utils/useTimer';
import CircularLoadingPage from '../error/circular_loading.page';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const [getIsLoadingPageOpen, setIsLoadingPageOpen] = useState(true)
    const _useAuthModule = useAuthModule()
    const clickEmailTimer = useTimer()
    const { regexEmail } = useRegex()
    const navigate = useNavigate()
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [getEmail, setEmail] = useState("")
    const [getIsAcceptEmailChange, setIsAcceptEmailChange] = useState(false)
    const emailOriginalRef = useRef("")
    const [getEmailError, setEmailError] = useState("")
    const run_uno = useRef(false)
    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/auth`)
            } else {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === "logout_button") {
                handleLogoutButton()
            }
            else if (event.target.id === "events_button") {
                navigate("/events")
            }
            else if (event.target.id === "hamburget_icon") {
                setIsHamburgerOpen(!getIsHamburgerOpen)
            }
            else {
                setIsHamburgerOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    useEffect(() => {
        const initFunction = async () => {
            var email_val = ""
            const result = await _useAuthModule.peopleGetEmailAccess()
            if (result?.isemailverify === false) {
                setIsAcceptEmailChange(true)
            }
            if (result?.error || !result) {
                if (result?.error) {
                    setEmailError(result?.error)
                }
            } else {
                email_val = result?.email
            }
            // eslint-disable-next-line no-unused-vars
            const temp_arr = [
                setEmail(email_val),
                emailOriginalRef.current = email_val
            ]
            setIsLoadingPageOpen(false)
        }
        initFunction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }

    if (!getIsLoadingPageOpen) {
        return (
            <div className="bg-white sm:bg-[#F1F2F3] min-h-screen">

                {/* app_bar */}
                <div
                    className="fixed  bg-white w-full mx-auto ">
                    <div className="relative flex items-center px-4">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5">
                        </div>
                        <div
                            onClick={() => {
                                navigate("/events");
                            }}
                            className="mr-auto flex-none text-slate-900 font-semibold"
                        >
                            <label href="/" className="text-[#DE206A]">
                                nextChapter
                            </label>
                        </div>
                        <div
                            className="py-5 relative text-sm ">

                            <button
                                className="flex">
                                <svg id="hamburget_icon" viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                                    <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                                </svg>
                            </button>
                            {getIsHamburgerOpen &&
                                <div className="hidden sm:block w-[10rem] bg-white rounded shadow-md  absolute mt-[2.5rem] top-0 right-0 min-w-full overflow-auto z-30 ">
                                    <div id="events_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                                    <div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>
                                    <hr className="border-t mx-4 border-gray-400" />
                                    <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                                        Logout
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* body */}
                {getIsHamburgerOpen &&
                    <div className="bg-white w-full sm:hidden fixed h-full mt-[3.6rem]">
                        <div id="events_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                        <div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>
                        <hr className="border-t mx-4 border-gray-400" />
                        <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                            Logout
                        </div>
                    </div>
                }
                <div className="sm:mx-[1.1rem] sm:pb-20 pt-[4rem] sm:pt-[4.7rem] ">
                    <div className=" flex flex-row ">
                        <div className="w-full  justify-center">
                            <div className="mx-auto text-sm font-semibold">
                                <div className="flex flex-col max-w-[60rem] mx-auto sm:shadow sm:rounded-lg bg-white ">
                                    <div className="mb-0 p-6 pb-0">
                                        <div className="text-center flex justify-between items-center">
                                            <div className="text-xl font-bold mb-0">Profile</div>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-6 pb-6 pt-0">
                                        <div>
                                            <div className="mt-6 mb-2 font-bold"></div>
                                            <hr className="mb-6 border-b-1 border-gray-200" />
                                            <div className="flex flex-wrap -mx-4">
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" htmlFor="grid-password">Email</label>
                                                        <div className=" pt-0 flex ">
                                                            <input
                                                                placeholder="Email"
                                                                type="text"
                                                                disabled={clickEmailTimer?.timerCountdown === 0 ? false : true}
                                                                onChange={(event) => {
                                                                    setEmailError("")
                                                                    const onChangeValue = event.target.value
                                                                    setIsAcceptEmailChange(false)
                                                                    setEmail(onChangeValue)
                                                                }}
                                                                value={getEmail ?? ""}
                                                                className={`${clickEmailTimer?.timerCountdown === 0 ? `text-gray-700` : `text-gray-400`} h-[2.4rem] border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 `}
                                                            />
                                                            {
                                                                emailOriginalRef.current !== getEmail && <>
                                                                    <div
                                                                        className="cursor-pointer h-[2.4rem] m-auto bg-red-600 w-fit inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 ml-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 active:border-blue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md"
                                                                        onClick={() => {
                                                                            setEmail(emailOriginalRef.current)
                                                                        }}
                                                                    >
                                                                        <MdClose className=" h-[1.2rem] w-[1.2rem]" />
                                                                    </div>
                                                                    <div
                                                                        className="cursor-pointer h-[2.4rem] m-auto bg-blue-600 w-fit inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 ml-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 active:border-blue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md"
                                                                        onClick={async () => {
                                                                            //regex email
                                                                            const emailRes = regexEmail(getEmail)
                                                                            if (emailRes) setEmailError(emailRes)
                                                                            if (!emailRes) {
                                                                                const result = await _useAuthModule.peopleChangeEmail({
                                                                                    email: getEmail
                                                                                })
                                                                                if (result?.error || !result) {
                                                                                    if (result?.error) {
                                                                                        setEmailError(result?.error)
                                                                                    }
                                                                                } else {
                                                                                    setEmail(getEmail)
                                                                                    emailOriginalRef.current = getEmail
                                                                                    if (result) {
                                                                                        dispatch(
                                                                                            peopleLoginReducer(result)
                                                                                        )
                                                                                    }
                                                                                    // clickEmailTimer?.endTimer()
                                                                                    await clickEmailTimer?.startTimer(await GetIntegerRandom({ min: 40, max: 60 }), 1000)
                                                                                    setIsAcceptEmailChange(true)
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <MdOutlineDone className=" h-[1.2rem] w-[1.2rem]" />
                                                                    </div>
                                                                </>
                                                            }
                                                            {
                                                                getIsAcceptEmailChange && <>
                                                                    {clickEmailTimer?.timerCountdown === 0 ? <div
                                                                        className="cursor-pointer h-[2.4rem] m-auto bg-orange-600 w-fit inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out border border-solid font-bold last:mr-0 ml-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 active:border-blue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md"
                                                                        onClick={async () => {
                                                                            //regex email
                                                                            const emailRes = regexEmail(getEmail)
                                                                            if (emailRes) setEmailError(emailRes)

                                                                            if (!emailRes) {
                                                                                const result = await _useAuthModule.peopleSendVerifyChangeEmail()
                                                                                if (result?.error || !result) {
                                                                                    if (result?.error) {
                                                                                        setEmailError(result?.error)
                                                                                    }
                                                                                    clickEmailTimer?.startTimer(GetIntegerRandom({ min: 40, max: 60 }), 1000)
                                                                                } else {
                                                                                    setEmail(getEmail)
                                                                                    emailOriginalRef.current = getEmail
                                                                                    if (result) {
                                                                                        dispatch(
                                                                                            peopleLoginReducer(result)
                                                                                        )
                                                                                    }
                                                                                    setIsAcceptEmailChange(true)
                                                                                    clickEmailTimer?.startTimer(GetIntegerRandom({ min: 40, max: 60 }), 1000)
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        Verify
                                                                    </div> : <div
                                                                        className="flex items-center justify-center h-[2.4rem] m-auto bg-gray-400 w-full max-w-[8rem] outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out border border-solid font-bold last:mr-0 ml-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md"

                                                                    >
                                                                        {`Resend (${clickEmailTimer?.timerCountdown}sec)`}
                                                                    </div>
                                                                    }
                                                                </>
                                                            }
                                                        </div>
                                                        {getEmailError && (<p className="text-sm text-red-400">{getEmailError}</p>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return CircularLoadingPage()
    }
}

export default ProfilePage