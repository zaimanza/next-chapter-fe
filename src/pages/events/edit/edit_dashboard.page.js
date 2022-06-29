import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BsPhone } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { useState } from 'react';

const EditDashboardPage = () => {
    const navigate = useNavigate()
    const run_uno = useRef(false)
    const { nc_wedding_id } = useParams()

    const peopleProvider = useSelector((state) => state.people.value)

    const [getScreenSize, setScreenSize] = useState(0)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/${nc_wedding_id}`)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='h-full bg-gray-900 shadow-sm overflow-hidden'>
            <div className='bottom-0 right-0 fixed mr-4 mb-4'>
                <div className="text-center mt-6">
                    <button
                        className="bg-pink-400 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                    // onClick={handleSubmit}
                    >
                        Launch Event
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="bg-white shadow-sm max-w-[700px] w-full sm:min-w-[500px] h-screen overflow-hidden">
                    <div className="">aiman</div>
                </div>
                <div className=" w-full hidden sm:block flex-grow overflow-hidden text-white ">
                    <div className="py-2 flex w-full justify-center">
                        <div onClick={() => {
                            setScreenSize(0)
                        }} className=''><FiMonitor className={`${getScreenSize === 0 ? "text-pink-400" : ""} m-2 w-8 h-8`} /></div>
                        <div className='w-2 h-2'></div>
                        <div onClick={() => {
                            console.log('hello')
                            setScreenSize(1)
                        }} className=''><BsPhone className={`${getScreenSize === 1 ? "text-pink-400" : ""} m-2 w-8 h-8`} /></div>
                    </div>
                    <div className={`${getScreenSize === 0 ? "ease-in-out duration-300 max-w-[50rem] m-auto" :
                        ""} ${getScreenSize === 1 ? "ease-in-out max-w-[30rem] m-auto" :
                            ""} overflow-y-auto h-[93%] flex items-center justify-center`}>
                        <div className='mx-10 w-full'>
                            <iframe
                                title="wedding card"
                                className={`rounded w-full shadow-lg ${getScreenSize === 0 ? " aspect-[16/9]" : ""} ${getScreenSize === 1 ? " aspect-[9/16]" : ""}`}
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                frameborder="0"
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