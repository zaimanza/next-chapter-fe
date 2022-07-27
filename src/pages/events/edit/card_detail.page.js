import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { peopleLogoutReducer } from '../../../providers/people.provider'
import CapitalizeString from '../../../utils/CapitalizeString.util'
import TabTitle from '../../../utils/TabTitle.util'
import { IoIosArrowBack } from "react-icons/io";

const CardDetailPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const run_uno = useRef(false)
    const { nc_wedding_id } = useParams()

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
    });

    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }

    return (
        <div className=" ">

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
                        <label href="/">
                            nextChapter
                        </label>
                    </div>
                    <div
                        className="py-5 relative text-sm">

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
            <div className="mx-[1.1rem] mb-20">
                <div className=" flex flex-row pt-[4.7rem]">
                    <div className="w-full  justify-center">
                        <div className="mx-auto text-sm font-semibold">
                            <div className="flex flex-col max-w-[60rem] mx-auto mb-6 shadow rounded-lg bg-white">
                                <div className="mb-0 p-6 pb-0">
                                    <div className="text-center flex justify-between items-center">
                                        <div className="text-xl font-bold mb-0 flex items-center justify-center">
                                            <IoIosArrowBack className='hover:cursor-pointer' onClick={() => {
                                                navigate(-1)
                                            }} />
                                            <div className="ml-2">Card detail</div>
                                        </div>
                                        <button className="bg-blue-600 inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-lightBlue-500 border-lightBlue-500 active:bg-lightBlue-600 active:border-blue-600 text-xs px-3 py-2 shadow hover:shadow-md rounded-md">Save change</button>
                                    </div>
                                </div>
                                <div className="flex-auto px-6 pb-6 pt-0">
                                    <div>
                                        <h6 className="mt-6 mb-2 font-bold">Personal details</h6>
                                        <hr className="mb-6 border-b-1 border-gray-200" />
                                        <div className="flex flex-wrap -mx-4">
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Card url</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Card url"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-6/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Partner One</label>
                                                    <div className="mb-2 pt-0">
                                                        <input
                                                            placeholder="First name"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Full name"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-6/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Partner Two</label>
                                                    <div className="mb-2 pt-0">
                                                        <input
                                                            placeholder="First name"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Full name"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Card display name</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Card display name"
                                                            type="text"
                                                            disabled="true"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-6/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Parent one</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Parent one"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-6/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Parent two</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Parent two"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Card display parent name</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Card display parent name"
                                                            type="text"
                                                            disabled="true"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="mt-6 mb-2 font-bold">Event details</h6>
                                        <hr className="mb-6 border-b-1 border-gray-200" />
                                        <div className="flex flex-wrap -mx-4">
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Event title</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Event title"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Location</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Location"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-4/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Date</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Date"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                    <div className='flex'>
                                                        <input
                                                            id="customCheckLogin"
                                                            type="checkbox"
                                                            // checked={getIsWeddingDateCheck || false}
                                                            onChange={(event) => {
                                                                // setIsWeddingDateError(false)
                                                                // setIsWeddingDateCheck(event.target.checked)
                                                            }}
                                                            className={`text-gray-700 selection:form-checkbox border-0 rounded w-[1.2rem] h-[1.2rem] ease-linear transition-all duration-150`}
                                                        />
                                                        <span className={`text-black ml-2 text-sm font-semibold`}>
                                                            Show on card
                                                        </span>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-4/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Dress code</label>
                                                    <div className="mb-3 pt-0">
                                                        <input
                                                            placeholder="Dress code"
                                                            type="text"
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Greetings message</label>
                                                    <div className="mb-3 pt-0">
                                                        <textarea
                                                            placeholder="Greetings message"
                                                            rows="4"
                                                            type="textarea"
                                                            style={{
                                                                "resize": "none",
                                                                "white-space": "pre-wrap"
                                                            }}
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        >

                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-12/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Introduction message</label>
                                                    <div className="mb-3 pt-0">
                                                        <textarea
                                                            placeholder="Introduction message"
                                                            rows="4"
                                                            type="textarea"
                                                            style={{
                                                                "resize": "none",
                                                                "white-space": "pre-wrap"
                                                            }}
                                                            className="border-gray-300 px-3 py-2 text-sm  w-full placeholder-gray-200 text-gray-700  bg-white rounded-md outline-none focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 "
                                                        >

                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-4 lg:w-6/12">
                                                <div className=" w-full mb-3">
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">Start time</label>
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
                                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2 ml-1" for="grid-password">End time</label>
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
}

export default CardDetailPage