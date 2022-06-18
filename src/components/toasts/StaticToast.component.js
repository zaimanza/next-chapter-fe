import React, { useRef } from 'react'
import { MdOutlineClose, MdCheck, MdOutlineWarning } from "react-icons/md"

const StaticToast = ({ config }) => {
    const bgColor = useRef("bg-red-300")
    const bgToastIcon = useRef("bg-red-800")
    const textToastIcon = useRef("text-red-200")
    const toastIcon = useRef(<MdOutlineClose className="w-5 h-5" />)
    switch (config.mode) {
        case "error": {
            bgColor.current = "bg-red-300"
            bgToastIcon.current = "bg-red-800"
            textToastIcon.current = "text-red-200"
            toastIcon.current = <MdOutlineClose className="w-5 h-5" />
            break;
        }
        case "warning": {
            bgColor.current = "bg-orange-300"
            bgToastIcon.current = "bg-orange-800"
            textToastIcon.current = "text-orange-200"
            toastIcon.current = <MdOutlineWarning className="w-5 h-5" />
            break;
        }
        case "success":
        default: {
            bgColor.current = "bg-green-300"
            bgToastIcon.current = "bg-green-800"
            textToastIcon.current = "text-green-200"
            toastIcon.current = <MdCheck className="w-5 h-5" />
            break;
        }
        // code block
    }

    return (
        <div className={`${bgColor.current} flex items-center w-full p-4 mb-4  rounded-lg shadow`} role="alert">
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${bgToastIcon.current} rounded-lg ${textToastIcon.current}`}>
                {toastIcon.current}
            </div>
            <div className="ml-3 text-sm font-normal">{config.message}</div>

        </div>
    )
}

export default StaticToast