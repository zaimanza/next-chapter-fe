import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { peopleLogoutReducer } from '../../../providers/people.provider'
import CapitalizeString from '../../../utils/CapitalizeString.util'
import TabTitle from '../../../utils/TabTitle.util'
import { IoIosArrowBack } from "react-icons/io";
import useEventModule from '../../../modules/useEvent.module'
import CircularLoadingPage from '../../error/circular_loading.page'
import GetDateYMD from '../../../utils/GetDateY-M-D.util'

const CardDetailPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [getOriginalData, setOriginalData] = useState({})
    const [getChangeData, setChangeData] = useState({})
    const run_uno = useRef(false)
    const { nc_wedding_id } = useParams()
    const _useEventModule = useEventModule()

    const [getIsLoadingPageOpen, setIsLoadingPageOpen] = useState(true)
    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        var splited_id = nc_wedding_id.split("_26")
        var title_name = splited_id[0]
        const with_space = title_name.replaceAll('_', ' ');
        const replace_and = with_space.replaceAll('and', '&');
        TabTitle({ newTitle: CapitalizeString(replace_and) + ' - Card Details' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/${nc_wedding_id}`)
            } else {

                const initFunction = async () => {
                    const result = await _useEventModule.GETEventCardDetail({ nc_wedding_id })

                    console.log(result)
                    if (result && !result.error) {
                        setOriginalData({
                            ...result,
                            nc_wedding_id
                        })
                        setChangeData({
                            ...result,
                            nc_wedding_id
                        })
                        setIsLoadingPageOpen(false)
                    } else {
                        setIsLoadingPageOpen(false)
                        navigate(`/500`)

                    }
                }
                initFunction()
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
            else if (event.target.id === "profile_button") {
                navigate("/profile")
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }

    const SetAlterChangeId = async ({ partner_one, partner_two }) => {
        const tempOriWeddingId = nc_wedding_id?.split("_")
        var end_id = ""
        if (tempOriWeddingId[tempOriWeddingId?.length - 1]) {
            end_id = tempOriWeddingId[tempOriWeddingId?.length - 1]
        }
        if (partner_one || partner_one === "") {
            setChangeData({
                ...getChangeData,
                your_first_name: partner_one,
                nc_wedding_id: partner_one + "_and_" + getChangeData?.your_partner_first_name + (end_id ? `_${end_id}` : ``),
            })
        }

        if (partner_two || partner_two === "") {
            setChangeData({
                ...getChangeData,
                your_partner_first_name: partner_two,
                nc_wedding_id: getChangeData?.your_first_name + "_and_" + partner_two + (end_id ? `_${end_id}` : ``),
            })

        }
    }

    if (!getIsLoadingPageOpen) {
        return (
            <div className=" bg-white sm:bg-[#F1F2F3] min-h-screen">

                {/* app_bar */}
                <div
                    className="fixed  bg-white w-full mx-auto ">
                    <div className="relative flex items-center px-4 h-[3rem]">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5">
                        </div>
                        <div
                            onClick={() => {
                                navigate("/events");
                            }}
                            className="mr-auto flex-none text-slate-900 font-semibold"
                        >
                            <label href="/" className='text-[#DE206A]'>
                                nextChapter
                            </label>
                        </div>
                        <div
                            className="py-auto relative text-sm">

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
                    <div className="bg-white w-full sm:hidden fixed h-full mt-[2.9rem]">
                        <div id="events_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                        <div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>
                        <hr className="border-t mx-4 border-gray-400" />
                        <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                            Logout
                        </div>
                    </div>
                }
                <div className="sm:mx-[1rem] sm:pb-20 pt-[3rem] sm:pt-[4rem]">
                    <div className=" flex flex-row ">
                        <div className="w-full  justify-center">
                            <div className="mx-auto text-sm">
                                <div className="flex flex-col max-w-[60rem] mx-auto sm:shadow sm:rounded-lg bg-white">
                                    <div className="mb-0 p-[1rem] pb-0">
                                        <div className="text-center flex justify-between items-center">
                                            <div className="text-xl font-bold mb-0 flex items-center justify-center">
                                                <IoIosArrowBack className='hover:cursor-pointer ' onClick={() => {
                                                    navigate(-1)
                                                }} />
                                                <div className="ml-2">Card detail</div>
                                            </div>
                                            <button className="bg-[#DE206A] inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 active:border-blue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md">Save change</button>
                                        </div>
                                    </div>
                                    <div className="flex-auto px-6 pb-6 pt-0">
                                        <div>
                                            <h6 className="mt-6 mb-2 text-base font-semibold">Personal details</h6>
                                            <hr className="mb-6 border-b-1 border-gray-200" />
                                            <div className="flex flex-wrap -mx-4">
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Card url</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Card url"
                                                                type="text"
                                                                value={getChangeData?.nc_wedding_id ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        nc_wedding_id: onChangeValue,
                                                                    })

                                                                }}
                                                                disabled={true}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-400 bg-gray-100/50  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Partner One</label>
                                                        <div className="mb-2 pt-0">
                                                            <input
                                                                placeholder="First name"
                                                                type="text"
                                                                value={getChangeData?.your_first_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    SetAlterChangeId({
                                                                        partner_one: onChangeValue
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Full name"
                                                                type="text"
                                                                value={getChangeData?.your_full_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        your_full_name: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Partner Two</label>
                                                        <div className="mb-2 pt-0">
                                                            <input
                                                                placeholder="First name"
                                                                type="text"
                                                                value={getChangeData?.your_partner_first_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    SetAlterChangeId({
                                                                        partner_two: onChangeValue
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Full name"
                                                                type="text"
                                                                value={getChangeData?.your_partner_full_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        your_partner_full_name: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Card display name</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Card display name"
                                                                type="text"
                                                                value={getChangeData?.your_first_name + ((getChangeData?.your_first_name !== "" && getChangeData?.your_partner_first_name !== "") ? " & " : "") + getChangeData?.your_partner_first_name}
                                                                disabled={true}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-400 bg-gray-100/50  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Parent one</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Parent one"
                                                                type="text"
                                                                value={getChangeData?.father_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        father_name: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Parent two</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Parent two"
                                                                type="text"
                                                                value={getChangeData?.mother_name ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        mother_name: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Card display parent name</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Card display parent name"
                                                                type="text"
                                                                value={getChangeData?.father_name + ((getChangeData?.father_name !== "" && getChangeData?.mother_name !== "") ? " & " : "") + getChangeData?.mother_name}
                                                                disabled={true}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-400 bg-gray-100/50 bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="mt-6 mb-2 text-base font-semibold">Event details</h6>
                                            <hr className="mb-6 border-b-1 border-gray-200" />
                                            <div className="flex flex-wrap -mx-4">
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Event title</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Event title"
                                                                type="text"
                                                                value={getChangeData?.wedding_title ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        wedding_title: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Location</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Location"
                                                                type="text"
                                                                value={getChangeData?.wedding_location ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        wedding_location: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-4/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Date</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                // disabled={getIsWeddingDateCheck ? true : false}
                                                                type="date"
                                                                maxLength="100"
                                                                min={new Date().toISOString().split('T')[0]}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                                placeholder="Date"
                                                                value={getChangeData?.wedding_date ? GetDateYMD({ date: getChangeData?.wedding_date }) : ""}
                                                                onChange={async (event) => {
                                                                    const onChangeValue = await event.target.value

                                                                    var wedding_date = (new Date(onChangeValue)).toISOString();

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        wedding_date: wedding_date,
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='flex'>
                                                            <input
                                                                id="customCheckLogin"
                                                                type="checkbox"
                                                                checked={getChangeData?.show_on_card || false}
                                                                onChange={async (event) => {
                                                                    const onChangeValue = await event.target.checked

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        show_on_card: onChangeValue,
                                                                    })
                                                                }}
                                                                className={`text-gray-700 selection:form-checkbox border-0 rounded w-[1.2rem] h-[1.2rem] ease-linear transition-all duration-150`}
                                                            />
                                                            <span className={`text-black ml-2 text-sm`}>
                                                                Show on card
                                                            </span>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-4/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Dress code</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Dress code"
                                                                type="text"
                                                                value={getChangeData?.dress_code ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        dress_code: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Greetings message</label>
                                                        <div className="mb-3 pt-0">
                                                            <textarea
                                                                placeholder="Greetings message"
                                                                rows="4"
                                                                type="textarea"
                                                                style={{
                                                                    "resize": "none",
                                                                    "whiteSpace": "pre-wrap"
                                                                }}
                                                                value={getChangeData?.wedding_welcome_greetings ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        wedding_welcome_greetings: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            >

                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-12/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Introduction message</label>
                                                        <div className="mb-3 pt-0">
                                                            <textarea
                                                                placeholder="Introduction message"
                                                                rows="4"
                                                                type="textarea"
                                                                style={{
                                                                    "resize": "none",
                                                                    "whiteSpace": "pre-wrap"
                                                                }}
                                                                value={getChangeData?.introduction_message ?? ""}
                                                                onChange={(event) => {
                                                                    const onChangeValue = event.target.value

                                                                    setChangeData({
                                                                        ...getChangeData,
                                                                        introduction_message: onChangeValue,
                                                                    })

                                                                }}
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            >

                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">Start time</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="Start time"
                                                                type="text"
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 lg:w-6/12">
                                                    <div className=" w-full mb-3">
                                                        <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1" htmlFor="grid-password">End time</label>
                                                        <div className="mb-3 pt-0">
                                                            <input
                                                                placeholder="End time"
                                                                type="text"
                                                                className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                            />
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
            </div>
        );
    } else {
        return CircularLoadingPage()
    }
}

export default CardDetailPage