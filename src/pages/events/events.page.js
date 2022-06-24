

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

    const handleLogoutButton = async () => {
        dispatch(
            peopleLogoutReducer()
        )
        navigate("/auth");

    }
    return (
        <div className="bg-black">
            welcome page
            <div
                onClick={handleLogoutButton}
                className="bg-white bg-opacity-70 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <HiDownload className="fill-current w-4 h-4 mr-2" />
                <span>Logout</span>
            </div>
        </div>
    );
}

export default EventsPage;
