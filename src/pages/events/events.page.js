

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { IoAdd } from "react-icons/io5";
import useEventModule from '../../modules/useEvent.module';
import { peopleLogoutReducer } from '../../providers/people.provider';
import StaticToast from '../../components/toasts/StaticToast.component';
import CircularLoadingPage from '../error/circular_loading.page';
import { WebsiteName } from '../../utils/WebsiteName.util';
import TabTitle from '../../utils/TabTitle.util';

const EventsPage = () => {
    TabTitle({ newTitle: WebsiteName + ' - Events' })
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const dispatch = useDispatch()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()
    const [getCardList, setCardList] = useState([])
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)

    const [getIsLoadingPageOpen, setIsLoadingPageOpen] = useState(true)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token !== "") {

                const initFunctionCall = async () => {

                    // findallByOwnerId
                    const result = await _useEventModule.findAllGeneralByOwner()

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
                            if (result?.error === "Account does not exists.") {
                                dispatch(
                                    peopleLogoutReducer()
                                )
                                navigate("/auth");
                            }
                        } else {
                            setToastConfig({
                                message: "There's no event available.",
                                mode: "warning"
                            })
                        }
                        setIsLoadingPageOpen(false)
                    } else {
                        if (result.length !== 0) {
                            // if exist view
                            setCardList(result)
                        } else {
                            // else go to create_event
                            navigate("/create_event")
                        }
                        setIsLoadingPageOpen(false)
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
            if (event.target.id === "logout_button") {
                handleLogoutButton()
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

    const handleCreateEvent = async () => {

        navigate("/create_event");
    }
    const [getNoImage, setNoImage] = useState([])
    if (!getIsLoadingPageOpen) {
        return (
            <div className=" text-[1.7vh]">
                {/* floating_action_button */}
                <div className='sm:hidden bottom-0 right-0 fixed mr-[1.7vh] mb-[1.7vh]'>
                    <div className="text-center">
                        <button
                            className="bg-[#DE206A] text-white active:bg-gray-600 text-[1.5vh] font-bold uppercase px-[1.2vh] py-[1.2vh] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"

                            onClick={handleCreateEvent}
                        >
                            <IoAdd className='m-auto h-[2vh] w-[2vh]' />
                        </button>
                    </div>
                </div>
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
                            <label href="/" className='text-[#DE206A]'>
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
                        <div onClick={handleCreateEvent} className="my-auto flex flex-row text-[1.5vh] hover:text-[#DE206A]">
                            Create

                            <IoAdd className='ml-[1vh] m-auto h-[2vh] w-[2vh]' />
                        </div>
                    </div>
                    {getToastConfig && getCardList.length === 0 &&
                        <StaticToast
                            config={getToastConfig ?? {
                                message: "Website is unavailable. Please try again later.",
                                mode: "error"
                            }}
                        />
                    }
                    {getCardList.length !== 0 &&
                        <div className=" grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {getCardList.map((oneEvent, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            navigate(`/${oneEvent?.nc_wedding_id}/edit`)
                                        }} className="shadow-lg rounded-lg h-min cursor-pointer">
                                        <div>
                                            {oneEvent?.cover_img && getNoImage[index] === undefined ? <img
                                                alt={oneEvent?.your_first_name + " & " + oneEvent?.your_partner_first_name}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null
                                                    var temp_getNoImage = getNoImage
                                                    temp_getNoImage[index] = true
                                                    setNoImage(temp_getNoImage)
                                                }}
                                                src={oneEvent?.cover_img}
                                                className="truncate object-cover w-full h-[18vh] rounded-tl-lg rounded-tr-lg" /> :
                                                <div
                                                    className=" h-[18vh] bg-[#DE206A] text-white flex items-center justify-center text-[1.5vh] font-bold uppercase rounded-tl-lg rounded-tr-lg outline-none w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                // onClick={handleSubmit}
                                                >
                                                    <label className='lowercase'>next</label>C<label className='lowercase'>hapter</label>
                                                </div>
                                            }
                                        </div>
                                        <div className=" px-[1.4vh] pt-[0.5vh] pb-[1vh]">
                                            <div className="truncate capitalize font-semibold text-[1.5vh]">{oneEvent?.your_first_name + " & " + oneEvent?.your_partner_first_name}</div>
                                            {oneEvent?.wedding_date && <div className="truncate capitalize text-[1.5vh]">{oneEvent?.wedding_date}</div>}
                                            {oneEvent?.wedding_location && <div className="truncate capitalize text-[1.5vh]">{oneEvent?.wedding_location}</div>}
                                            {oneEvent?.owner_uid === peopleProvider?.uid &&
                                                <div className="mt-[0.5vh] flex">
                                                    <div className="border rounded-lg px-[0.8vh] py-[0.3vh] text-gray-400  text-[1.5vh]">
                                                        Yours
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>}
                </div>
            </div>
        );
    } else {
        return CircularLoadingPage()
    }
}

export default EventsPage;
