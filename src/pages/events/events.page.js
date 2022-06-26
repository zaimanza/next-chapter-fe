

import { useEffect, useRef, useState } from 'react';
import { HiDownload } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import useEventModule from '../../modules/useEvent.module';
import { peopleLogoutReducer } from '../../providers/people.provider';

const EventsPage = () => {
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const dispatch = useDispatch()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token !== "") {

                const initFunctionCall = async () => {

                    // findallByOwnerId
                    const result = await _useEventModule.findAllGeneralByOwnerId({
                        owner_uid: peopleProvider?.uid
                    })

                    if (result?.error || !result) {
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
                        if (result.length !== 0) {
                            // if exist view
                        } else {
                            // else go to create_event
                            navigate("/create_event")
                        }
                    }

                    // if error view problem with system
                }
                initFunctionCall()
            } else {
                navigate("/auth");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(event.target)
            if (event.target.id === "logout_button") {
                handleLogoutButton()
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
    return (
        <div className="">
            <div
                className=" mx-auto max-w-container px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5">
                    </div>
                    <label className="mr-auto flex-none text-slate-900" href="/">
                        nextChapter
                    </label>
                    <div
                        className="py-[2.125rem] relative text-sm ">

                        <button
                            onClick={() => {


                            }}
                            className="flex focus:outline-none">
                            <svg id="hamburget_icon" viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                                <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                        {getIsHamburgerOpen ?
                            <div className="bg-white rounded shadow-md  absolute mt-16 top-0 right-0 min-w-full overflow-auto z-30 ">
                                <ul className="w-[10rem]">
                                    <li><div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">My profile</div></li>
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
            {/* 
            <div className=' mx-auto max-w-container px-4 sm:px-6 lg:px-8'>
                <div className="relative flex items-center py-[2.125rem]">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5">
                    </div>
                    <label className="mr-auto flex-none text-slate-900" href="/">
                        nextChapter
                    </label>
                    <button type="button" className="-my-1 ml-6 -mr-1 flex h-8 w-8 items-center justify-center">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-900">
                            <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
            </div> */}

            <div className="mx-6 mb-20">
                <div className="flex flex-row relative py-5">
                    <div className="w-full  justify-center">
                        <div onClick={() => {
                            // setAuthMode("login")
                            navigate("/auth")
                        }} className="mx-auto w-fit text-3xl">
                            Wedding Events
                        </div>

                    </div>
                </div>
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    <div className="shadow-lg rounded-lg">
                        <div>
                            <img
                                alt=""
                                src="https://wegotthiscovered.com/wp-content/uploads/2022/05/image1-65-1200x900.jpg"
                                className="object-cover h-48 w-full rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div className="p-5">
                            <h3>Mens T-Shirt</h3>
                            <div className="flex flex-row my-3">
                                <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
                            </div>
                            <div className="flex flex-row my-3">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg rounded-lg">
                        <div>
                            <img
                                alt=""
                                src="https://cdn.vox-cdn.com/thumbor/PFtQ82KNz7yHiIEAB6T-01AqO74=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9490727/thor_ragnarok_thor.jpg"
                                className="object-cover h-48 w-full rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div className="p-5">
                            <h3>Mens T-Shirt</h3>
                            <div className="flex flex-row my-3">
                                <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
                            </div>
                            <div className="flex flex-row my-3">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg rounded-lg">
                        <div >
                            <img
                                alt=""
                                src="https://www.denofgeek.com/wp-content/uploads/2019/03/thor_the_dark_world-main.jpg?fit=1200%2C675"
                                className="object-cover h-48 w-full rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div className="p-5">
                            <h3>Mens T-Shirt</h3>
                            <div className="flex flex-row my-3">
                                <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
                            </div>
                            <div className="flex flex-row my-3">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg rounded-lg">
                        <div>
                            <img
                                alt=""
                                src="https://mytvonline.io/wp-content/uploads/2022/05/thor-recap-feature.jpg"
                                className="object-cover h-48 w-full rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div className="p-5">
                            <h3>Mens T-Shirt</h3>
                            <div className="flex flex-row my-3">
                                <div className="bg-black rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-blue-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-white rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-red-800 rounded-full h-5 w-5 shadow-md mr-2"></div>
                                <div className="bg-green-700 rounded-full h-5 w-5 shadow-md mr-2"></div>
                            </div>
                            <div className="flex flex-row my-3">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EventsPage;
