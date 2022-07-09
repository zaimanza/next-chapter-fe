import React from 'react'

const WelcomeHeader = ({
    header,
    event_font
}) => {

    return (
        <div className="w-full h-full">
            <div className="relative bg-gradient-to-t from-gray-900/[.40] via-gray-800/[.06] h-full">
                <div className="w-full absolute bottom-0 px-[6vw] pb-[9vh]">
                    <div>

                        {
                            (header?.title_name && header?.title_partner_name) ?
                                (
                                    <div className={`text-[6vh] text-white ${event_font} truncate capitalize`}>
                                        <div className='truncate'>{header?.title_name + " &"}</div>
                                        <div className='truncate'>{header?.title_partner_name}</div>
                                    </div>
                                ) : null
                        }
                        {
                            (header?.wedding_welcome_greetings) ?
                                (
                                    <div className={`text-[2.5vh] text-white  overflow-hidden`}>
                                        <div>{header?.wedding_welcome_greetings}</div>
                                    </div>
                                ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeHeader