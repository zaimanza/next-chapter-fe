import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { useState } from 'react';
import { peopleLogoutReducer } from '../../../providers/people.provider';

const EditDashboardPage = () => {
    const navigate = useNavigate()
    const run_uno = useRef(false)
    const dispatch = useDispatch()
    const { nc_wedding_id } = useParams()

    const peopleProvider = useSelector((state) => state.people.value)

    const [getScreenSize, setScreenSize] = useState(0)
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/${nc_wedding_id}`)
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
                    "icon": <AiFillEdit className="mx-auto w-8 h-8" />
                },
            ]
        }
    ]

    return (
        <div className='h-full bg-pink-400 shadow-sm overflow-hidden'>
            <div className='bottom-0 right-0 fixed mr-4 mb-4'>
                <div className="text-center mt-6">
                    <button
                        className="bg-gray-900 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                    // onClick={handleSubmit}
                    >
                        Launch Event
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="bg-white shadow-sm max-w-[700px] w-full sm:min-w-[500px] h-screen overflow-hidden">
                    {/* app_bar */}
                    <div
                        className="fixed sm:static bg-white w-full mx-auto max-w-container px-4 sm:px-6 lg:px-8">
                        <div className="relative flex items-center">
                            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5">
                            </div>
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
                                className="py-[2.125rem] relative text-sm ">

                                <button
                                    className="flex focus:outline-none">
                                    <svg id="hamburget_icon" viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                                        <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                                    </svg>
                                </button>
                                {getIsHamburgerOpen ?
                                    <div className="hidden sm:flex bg-white rounded shadow-md  absolute mt-16 top-0 right-0 min-w-full overflow-auto z-30 ">
                                        <ul className="w-[10rem]">
                                            <li><div id="events_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Events</div></li>
                                            <li><div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div></li>
                                            <li>
                                                <hr className="border-t mx-4 border-gray-400" />
                                            </li>
                                            <li>
                                                <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                                                    Logout
                                                </div>
                                            </li>
                                        </ul>
                                    </div> : null}
                            </div>
                        </div>
                    </div>

                    {/* body */}
                    {getIsHamburgerOpen ?
                        <div className="bg-white w-full sm:hidden mb-20 fixed h-full mt-20">
                            <div id="events_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Events</div>
                            <div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">Profile</div>
                            <hr className="border-t mx-4 border-gray-400" />
                            <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                                Logout
                            </div>
                        </div> : null}
                    {
                        config_edit_menu.map((one_config, index) =>
                            <div
                                key={index}
                                className="mb-20 sm:pt-0 pt-24">
                                <div className='m-4 text-xl'>
                                    {one_config?.category_name}
                                </div>
                                <div className="m-4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-4">
                                    {
                                        one_config?.category_items?.map((category_item, index) =>
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    navigate(`/${nc_wedding_id}/${category_item?.url}`)
                                                }} className="group group-hover:shadow-sm rounded-lg">
                                                <div className="text-center">
                                                    <button
                                                        className="overflow-hidden cursor-default h-48 group-hover:border text-gray-900  text-sm font-medium uppercase px-3 py-3 rounded-lg outline-none w-full ease-linear transition-all duration-150"
                                                        type="submit"
                                                    // onClick={handleSubmit}
                                                    >
                                                        {category_item?.icon}
                                                        {/* ease-in-out duration-150 hidden group-hover:block  */}
                                                        <label className='capitalize'>{category_item?.name}</label>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        )}
                </div>
                <div className=" duration-300 w-full hidden sm:block flex-grow overflow-hidden text-white ">
                    <div className="py-2 flex w-full justify-center">
                        <div onClick={() => {
                            setScreenSize(0)
                        }} className=''><FiMonitor className={`${getScreenSize === 0 ? "text-gray-900" : ""} m-2 w-8 h-8`} /></div>
                        <div className='w-2 h-2'></div>
                        <div onClick={() => {
                            setScreenSize(1)
                        }} className=''><BsPhone className={`${getScreenSize === 1 ? "text-gray-900" : ""} m-2 w-8 h-8`} /></div>
                    </div>
                    <div className={`${getScreenSize === 0 ? "ease-in-out w-full m-auto" :
                        ""} ${getScreenSize === 1 ? "ease-in-out max-w-[30rem] m-auto" :
                            ""} overflow-y-auto h-[93%] flex items-center justify-center`}>
                        <div className='mx-10 w-full'>
                            <iframe
                                title="wedding card"
                                className={`rounded w-full shadow-lg bg-white ${getScreenSize === 0 ? " aspect-[16/9]" : ""} ${getScreenSize === 1 ? " aspect-[9/16]" : ""}`}
                                src={`/${nc_wedding_id}?template=true${getScreenSize === 0 ? "&display=desktop" : ""}${getScreenSize === 1 ? "&display=mobile" : ""}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            >   </iframe>
                            <div className="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDashboardPage