import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { useState } from 'react';
import { peopleLogoutReducer } from '../../../providers/people.provider';
import useEventModule from '../../../modules/useEvent.module';
import CircularLoadingPage from '../../error/circular_loading.page';

const EditDashboardPage = () => {
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const run_uno = useRef(false)
    const dispatch = useDispatch()
    const { nc_wedding_id } = useParams()

    const peopleProvider = useSelector((state) => state.people.value)

    const [getScreenSize, setScreenSize] = useState(0)
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [getIsLoadingPageOpen, setIsLoadingPageOpen] = useState(true)
    const [getBufferLoad, setBufferLoad] = useState(false)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/${nc_wedding_id}`)
            }

            const initFunctionCall = async () => {

                // findallByOwnerId
                const result = await _useEventModule.isWeddingCardExists({
                    nc_wedding_id: nc_wedding_id
                })
                if (result?.error || !result) {
                    if (result?.error?.error) {

                        navigate("/500")
                    } else if (result?.error) {

                        navigate("/wedding_card_not_found")
                    } else {

                        navigate("/500")
                    }
                } else {
                    if (result.length !== 0) {


                    } else {
                        navigate("/wedding_card_not_found")
                    }
                }

                const timeout = setTimeout(() => {
                    setIsLoadingPageOpen(false)
                    clearTimeout(timeout)
                }, 2000)

            }
            initFunctionCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === "logout_button") {
                handleLogoutButton()
            }
            else if (event.target.id === "events_button") {
                navigate("/events");
            }
            else if (event.target.id === "profile_button") { }
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

    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }

    const config_edit_menu = [
        {
            "category_name": "Card Settings",
            "category_items": [
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
            ]
        },
        {
            "category_name": "Card Settings",
            "category_items": [
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
            ]
        },
        {
            "category_name": "Card Settings",
            "category_items": [
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
            ]
        },
        {
            "category_name": "Card Settings",
            "category_items": [
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
                {
                    "url": "card_detail",
                    "name": "Card Detail",
                    "icon": <AiFillEdit className="mx-auto w-[3.5vh] h-[3.5vh]" />
                },
            ]
        },
    ]

    if (!getIsLoadingPageOpen) {
        return (
            <div className='h-full text-[1.7vh] bg-pink-400 overflow-hidden'>
                <div className='bottom-0 right-0 fixed mr-[1.7vh] mb-[1.7vh]'>
                    <button
                        className="bg-gray-900 text-center text-white active:bg-gray-600 text-[1.5vh] font-bold uppercase px-[2.5vh] py-[1.2vh] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    // onClick={handleSubmit}
                    >
                        Launch Event
                    </button>
                </div>
                <div className="flex h-[100vh]">
                    <div className="bg-white shadow-sm max-w-[700px] w-full sm:min-w-[500px] h-[100vh] overflow-auto">
                        {/* app_bar */}
                        <div
                            className="  fixed sm:sticky top-0 bg-white w-full mx-auto">
                            <div className="shadow flex items-center px-[1.7vh]">
                                <div
                                    onClick={() => {
                                        navigate("/events");
                                    }}
                                    className="mr-auto flex-none text-slate-900 font-semibold"
                                >
                                    <label href="/">
                                        nextChapter
                                    </label>
                                </div>
                                <div
                                    className="py-[2vh] relative text-[1.5vh] ">

                                    <button
                                        className="flex">
                                        <svg id="hamburget_icon" viewBox="0 0 24 24" className="h-[2.6vh] w-[2.6vh] stroke-slate-900">
                                            <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                                        </svg>
                                    </button>
                                    {getIsHamburgerOpen &&
                                        <div className="hidden sm:block w-[17vh] bg-white rounded shadow-md  absolute mt-[4vh] top-0 right-0 min-w-full overflow-auto z-30 ">

                                            <div id="events_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                                            <div id="profile_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>

                                            <hr className="border-t mx-[1.7vh] border-gray-400" />


                                            <div id="logout_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">
                                                Logout
                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* body */}
                        {getIsHamburgerOpen &&
                            <div className="bg-white w-full sm:hidden fixed h-full mt-[6vh]">
                                <div id="events_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                                <div id="profile_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>
                                <hr className="border-t mx-[1.7vh] border-gray-400" />
                                <div id="logout_button" className="px-[1.7vh] py-[1.7vh] block  hover:bg-gray-100 no-underline hover:no-underline">
                                    Logout
                                </div>
                            </div>
                        }

                        {
                            config_edit_menu.map((one_config, index) =>
                                <div
                                    key={index}
                                    className="mx-[0.8vh] mb-[2vh] sm:pt-0">
                                    <div className='m-[1vh] font-semibold'>
                                        {one_config?.category_name}
                                    </div>
                                    <div className="m-[1vh] grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-4">
                                        {
                                            one_config?.category_items?.map((category_item, index) =>
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(`/${nc_wedding_id}/${category_item?.url}`)
                                                    }} className="group group-hover:shadow-sm rounded-lg">
                                                    <div className="text-center">
                                                        <button
                                                            className="overflow-hidden cursor-default h-[15vh] w-[15vh] group-hover:border text-gray-900 text-[1.5vh] uppercase rounded-lg outline-none ease-linear transition-all duration-150"
                                                        // onClick={handleSubmit}
                                                        >
                                                            {category_item?.icon}
                                                            <label className='capitalize'>{category_item?.name}</label>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="duration-300 w-full hidden sm:block flex-grow overflow-hidden text-white ">
                        <div className="flex w-full justify-center">
                            <div onClick={() => {
                                setScreenSize(0)

                                setBufferLoad(true)
                                const timeout = setTimeout(() => {
                                    setBufferLoad(false)
                                    clearTimeout(timeout)
                                }, 500)
                            }} className=''><FiMonitor className={`${getScreenSize === 0 ? "text-gray-900" : ""} m-[1.7vh] w-[3vh] h-[3vh]`} /></div>
                            <div className='w-2 h-2'></div>
                            <div onClick={() => {
                                setScreenSize(1)

                                setBufferLoad(true)
                                const timeout = setTimeout(() => {
                                    setBufferLoad(false)
                                    clearTimeout(timeout)
                                }, 500)
                            }} className=''><BsPhone className={`${getScreenSize === 1 ? "text-gray-900" : ""} m-[1.7vh] w-[3vh] h-[3vh]`} /></div>
                        </div>
                        <div className={`${getScreenSize === 0 ? "ease-in-out w-full m-auto" :
                            ""} ${getScreenSize === 1 ? "ease-in-out max-w-[30rem] m-auto" :
                                ""} overflow-hidden h-[93%] flex items-center justify-center`}>
                            <div className='mx-[3vh] w-full'>
                                {getBufferLoad === false && (<>
                                    <iframe
                                        title="wedding card"
                                        className={`overflow-hidden rounded w-full ${getScreenSize === 0 ? " aspect-[16/9]" : ""} ${getScreenSize === 1 ? " aspect-[9/16]" : ""}`}
                                        src={`/${nc_wedding_id}?template=true${getScreenSize === 0 ? "&display=desktop" : ""}${getScreenSize === 1 ? "&display=mobile" : ""}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    >   </iframe>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return CircularLoadingPage()
    }
}

export default EditDashboardPage