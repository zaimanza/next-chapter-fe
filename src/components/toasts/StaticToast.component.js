import React, { useRef } from 'react'
import { MdOutlineClose, MdCheck, MdOutlineWarning } from "react-icons/md"

const StaticToast = ({ config }) => {
    const bgColor = useRef("bg-red-300")
    const bgToastIcon = useRef("bg-red-800")
    const textToastIcon = useRef("text-red-200")
    const toastIcon = useRef(<MdOutlineClose className="w-[2vh] h-[2vh]" />)
    switch (config.mode) {
        case "error": {
            bgColor.current = "bg-red-300"
            bgToastIcon.current = "bg-red-800"
            textToastIcon.current = "text-red-200"
            toastIcon.current = <MdOutlineClose className="w-[2vh] h-[2vh]" />
            break;
        }
        case "warning": {
            bgColor.current = "bg-orange-300"
            bgToastIcon.current = "bg-orange-800"
            textToastIcon.current = "text-orange-200"
            toastIcon.current = <MdOutlineWarning className="w-[2vh] h-[2vh]" />
            break;
        }
        case "success":
        default: {
            bgColor.current = "bg-green-300"
            bgToastIcon.current = "bg-green-800"
            textToastIcon.current = "text-green-200"
            toastIcon.current = <MdCheck className="w-[2vh] h-[2vh]" />
            break;
        }
        // code block
    }

    return (
        <div className={`${bgColor.current} flex items-center w-full p-[1.8vh] mb-[1.8vh]  rounded-lg shadow`} role="alert">
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-[3.3vh] h-[3.3vh] ${bgToastIcon.current} rounded-lg ${textToastIcon.current}`}>
                {toastIcon.current}
            </div>
            <div className="ml-[1vh] text-[1.5vh] font-normal">{config.message}</div>

        </div>
    )
}

export default StaticToast