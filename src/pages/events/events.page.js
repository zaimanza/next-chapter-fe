

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { IoAdd } from "react-icons/io5";
import useEventModule from '../../modules/useEvent.module';
import { peopleLogoutReducer } from '../../providers/people.provider';
import StaticToast from '../../components/toasts/StaticToast.component';

const EventsPage = () => {
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const dispatch = useDispatch()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()
    const [getCardList, setCardList] = useState([])
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
                    } else {
                        if (result.length !== 0) {
                            // if exist view
                            setCardList(result)
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

    const handleCreateEvent = async () => {
        console.log("creating_event")
    }

    return (
        <div className="">
            {/* floating_action_button */}
            <div className='sm:hidden bottom-0 right-0 fixed mr-4 mb-4'>
                <div className="text-center">
                    <button
                        className="bg-pink-400 text-white active:bg-gray-600 text-sm font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        onClick={handleCreateEvent}
                    >
                        <IoAdd className='m-auto h-[1.25rem] w-[1.25rem]' size={'4rem'} />
                    </button>
                </div>
            </div>
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

            {/* body */}
            {getIsHamburgerOpen ?
                <div className="bg-white w-full sm:hidden mb-20 fixed h-full mt-20">
                    <div id="profile_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">My profile</div>
                    <hr className="border-t mx-4 border-gray-400" />
                    <div id="logout_button" className="px-4 py-4 block  hover:bg-gray-100 no-underline hover:no-underline">
                        Logout
                    </div>
                </div> : null}
            <div className="mx-6 mb-20">
                <div className="sm:hidden flex flex-row py-5 pt-28">
                    <div className="w-full  justify-center">
                        <div className="mx-auto w-fit text-3xl">
                            Wedding Events
                        </div>

                    </div>
                </div>

                <div onClick={handleCreateEvent} className="hidden sm:flex justify-between my-5">
                    <div className="">
                        <div className="mx-auto w-fit text-3xl">
                            Wedding Events
                        </div>
                    </div>
                    <div className="my-auto flex flex-row text-lg hover:text-pink-400">
                        Create
                        <IoAdd className='h-7 w-5 ml-1 mr-1' />
                    </div>
                </div>
                {getToastConfig && getCardList.length === 0 ?
                    <StaticToast
                        config={getToastConfig ?? {
                            message: "Website is unavailable. Please try again later.",
                            mode: "error"
                        }}
                    /> : null}
                {getCardList.length !== 0 ?
                    <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {getCardList.map((oneEvent, index) =>
                            <div
                                key={index}
                                onClick={() => {
                                    navigate(`/${oneEvent?.nc_wedding_id}/edit`)
                                }} className="shadow-lg rounded-lg">
                                <div>
                                    {oneEvent?.cover_img ? <img
                                        alt={oneEvent?.your_first_name + " & " + oneEvent?.your_partner_first_name}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null
                                        }}
                                        src={oneEvent?.cover_img}
                                        className="object-cover h-48 w-full rounded-tl-lg rounded-tr-lg" /> :

                                        <div className="text-center">
                                            <button
                                                className="cursor-default h-48 bg-pink-400 text-white  text-sm font-bold uppercase px-3 py-3 rounded-tl-lg rounded-tr-lg outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            // onClick={handleSubmit}
                                            >
                                                <label className='lowercase'>next</label>C<label className='lowercase'>hapter</label>
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className="p-5">
                                    <div className="capitalize text-lg font-medium">{oneEvent?.your_first_name + " & " + oneEvent?.your_partner_first_name}</div>
                                    {oneEvent?.wedding_date ? <div className="capitalize">{oneEvent?.wedding_date}</div> : null}
                                    {oneEvent?.wedding_location ? <div className="capitalize">{oneEvent?.wedding_location}</div> : null}
                                    {oneEvent?.owner_uid === peopleProvider?.uid ?
                                        <div className="mt-4 flex">
                                            <div className="border rounded-lg px-2 py-2 text-gray-400">
                                                Yours
                                            </div>
                                        </div> : null}
                                </div>
                            </div>
                        )}
                    </div> : null}
            </div>
        </div>
    );
}

export default EventsPage;
