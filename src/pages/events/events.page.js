

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <div className="">
                {/* floating_action_button */}
                <div className='sm:hidden bottom-0 right-0 fixed mr-4 mb-4'>
                    <div className="text-center">
                        <button
                            className="bg-[#DE206A] text-white active:bg-gray-600 font-bold uppercase px-[0.7rem] py-[0.7rem] rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"

                            onClick={handleCreateEvent}
                        >
                            <IoAdd className='m-auto h-5 w-5' />
                        </button>
                    </div>
                </div>
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
                <div className="mx-[1rem] mb-20">
                    <div className="sm:hidden flex flex-row py-5 pt-[4rem]">
                        <div className="w-full  justify-center">
                            <div className="mx-auto w-fit text-base font-semibold">
                                Wedding Events
                            </div>

                        </div>
                    </div>

                    <div className="hidden sm:flex justify-between py-5 pt-[4rem]">
                        <div className="">
                            <div className="mx-auto w-fit text-base font-semibold">
                                Wedding Events
                            </div>
                        </div>
                        <div onClick={handleCreateEvent} className="my-auto flex flex-row text-sm hover:text-[#DE206A]">
                            Create

                            <IoAdd className='ml-[0.5rem] m-auto h-5 w-5' />
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
                                                className="truncate object-cover w-full h-[10.6rem] rounded-tl-lg rounded-tr-lg" /> :
                                                <div
                                                    className=" h-[10.6rem] bg-[#DE206A] text-white flex items-center justify-center text-base font-bold uppercase rounded-tl-lg rounded-tr-lg outline-none w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                // onClick={handleSubmit}
                                                >
                                                    <label className='lowercase'>next</label>C<label className='lowercase'>hapter</label>
                                                </div>
                                            }
                                        </div>
                                        <div className=" px-[1rem] pt-[0.8rem] pb-[1rem]">
                                            <div className="truncate capitalize font-semibold text-base">{oneEvent?.your_first_name + " & " + oneEvent?.your_partner_first_name}</div>
                                            {oneEvent?.wedding_date && <div className="truncate capitalize text-sm">{oneEvent?.wedding_date}</div>}
                                            {oneEvent?.wedding_location && <div className="truncate capitalize text-sm">{oneEvent?.wedding_location}</div>}
                                            {oneEvent?.owner_uid === peopleProvider?.uid &&
                                                <div className="mt-[0.5rem] flex">
                                                    <div className="border rounded-lg px-[0.5rem] py-[0.3rem] text-gray-400  text-sm">
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
