import React from 'react'
import GetFont from '../../utils/GetFont.util'

const IntroductionHeader = ({
    start_time,
    header,
    event_font,
    index_0_body,
    getParamTemplate
}) => {
    return (
        <div className="w-full h-full">
            <div className="relative bg-gradient-to-t from-gray-900/[.40] via-gray-800/[.06] h-full">
                <div className="w-full absolute bottom-0 px-[6vw] pb-[9vh]">
                    {
                        index_0_body?.wedding_date ?
                            <div className={`${getParamTemplate === 'true' ? `grid gap-0 grid-cols-4` : `grid gap-0 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4`} max-w-[50vh] text-white font-['Cormorant_Garamond'] overflow-hidden`}>
                                <div className='w-[10vh] h-[10vh] rounded'>
                                    <div className='text-[4vh]'>
                                        00
                                    </div>
                                    <div>Days</div>
                                </div>
                                <div className='w-[10vh] h-[10vh] rounded'>
                                    <div className='text-[4vh]'>
                                        12
                                    </div>
                                    <div>Hours</div>
                                </div>
                                <div className='w-[10vh] h-[10vh] rounded'>
                                    <div className='text-[4vh]'>
                                        60
                                    </div>
                                    <div>Minutes</div>
                                </div>
                                <div className=' w-[10vh] h-[10vh] rounded'>
                                    <div className='text-[4vh]'>
                                        60
                                    </div>
                                    <div>Seconds</div>
                                </div>
                            </div> :
                            (header?.title_name && header?.title_partner_name) && (
                                <div
                                    className={`text-[6vh] text-white truncate capitalize`}
                                    style={{ fontFamily: GetFont({ font_name: event_font }) }}
                                >
                                    <div className='truncate'>{header?.title_name + " &"}</div>
                                    <div className='truncate'>{header?.title_partner_name}</div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default IntroductionHeader