import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { peopleLogoutReducer } from '../../providers/people.provider';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)

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

    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }

    return (
        <div className=" text-[1.7vh]">

            {/* app_bar */}
            <div
                className="fixed  bg-white w-full mx-auto ">
                <div className="relative flex items-center px-[1.7vh]">
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
            <div className="mx-[1.8vh] mb-20">
                <div className="sm:hidden flex flex-row py-[2.2vh] pt-[8vh]">
                    <div className="w-full  justify-center">
                        <div className="mx-auto w-fit text-[1.5vh] font-semibold">
                            Wedding Events
                        </div>

                    </div>
                </div>

                <div className="hidden sm:flex justify-between py-[2.2vh] pt-[8vh]">
                    <div className="">
                        <div className="mx-auto w-fit text-[1.5vh] font-semibold">
                            Wedding Events
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProfilePage