import React from 'react'
import GetFont from '../../utils/GetFont.util'

const WelcomeHeader = ({
    header,
    event_font
}) => {

    return (
        <div className="w-full h-full">
            <div className="relative bg-gradient-to-t from-gray-900/[.40] via-gray-800/[.06] h-full">
                <div className="w-full absolute bottom-0 px-[6vw] pb-[9vh]">
                    {
                        (header?.title_name && header?.title_partner_name) &&
                        (
                            <div
                                className={`text-[6vh] text-white truncate capitalize`}
                                style={{ fontFamily: GetFont({ font_name: event_font }) }}
                            >
                                <div className='truncate'>{header?.title_name + " &"}</div>
                                <div className='truncate'>{header?.title_partner_name}</div>
                            </div>
                        )
                    }
                    {
                        (header?.wedding_welcome_greetings) &&
                        (
                            <div className={`text-[2.5vh] text-white font-['Cormorant_Garamond'] overflow-hidden`}>
                                <div>{header?.wedding_welcome_greetings}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default WelcomeHeader