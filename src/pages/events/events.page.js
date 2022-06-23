

import { useEffect, useRef } from 'react';
import { HiDownload } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { peopleLogoutReducer } from '../../providers/people.provider';

const EventsPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token !== "") {

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
