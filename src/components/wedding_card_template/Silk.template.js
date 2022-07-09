import React from 'react'

const SilkTemplate = ({
    getDisplayData,
    getParamTemplate,
    getParamDisplay,
    getCurrentDisplayIndex,
    addRightSideRef,
    gsap,
    event_font,
    getDisplayHeader,
    getCurrentImg,
}) => {

    return (
        <div className="text-[1.7vh] relative flex min-h-screen flex-col">
            <div className={
                `${(getCurrentImg !== "") ?
                    `flex ${getParamTemplate ?
                        'w-full' :
                        'w-full'} items-start` :
                    `flex justify-center items-center shadow-lg`
                }`
            }>
                {
                    (getCurrentImg !== "") ? (
                        <div className={`sticky top-0 ${getParamTemplate ? (getParamDisplay === 'desktop') ? 'w-full' : 'sm:w-full' : 'sm:w-full'}`}>
                            <div className={`relative z-0  ${getParamTemplate ? (getParamDisplay === 'desktop') ? '' : 'hidden sm:block' : 'hidden sm:block'} overflow-hidden w-full h-screen bg-white`}>
                                {/* img here */}

                                <div className="absolute z-10 bg-green-400 h-[8vh] w-full">
                                    {
                                        getDisplayData?.data?.map((currentValue, index) => {
                                            return (
                                                <div
                                                    key={index}>
                                                    <div
                                                        onClick={() => {
                                                            gsap.to(window, {
                                                                duration: 1,
                                                                scrollTo: {
                                                                    y: `#display_data_${index + 1}`
                                                                }
                                                            })
                                                        }}
                                                    >Go to item {index + 1}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="absolute z-10 pt-1">as</div>
                                <div className="bg-red-400 absolute z-0 h-full w-full">
                                    <img
                                        src={getCurrentImg}
                                        alt="Avatar"
                                        className="object-cover w-full h-full" />
                                </div>
                                {getDisplayHeader}
                            </div>
                        </div>
                    ) : null
                }
                <div className={
                    `${(getCurrentImg !== "") ?
                        `${getParamTemplate ?
                            (getParamDisplay === 'desktop') ?
                                ' max-w-[40vw] min-w-[40vw]' :
                                ' w-[100vw] sm:max-w-[40vw] sm:min-w-[40vw]' :
                            ' w-[100vw] sm:max-w-[40vw] sm:min-w-[40vw]'
                        }` :
                        `w-[100vw] md:max-w-[40vw] md:min-w-[40vw] justify-center`}`
                }>
                    {
                        getDisplayData?.data?.map((currentValue, index) => {
                            return (
                                <div
                                    key={index}
                                    ref={addRightSideRef}
                                    id={`display_data_${index + 1}`}
                                    className='h-[100vh] bg-blue-400'>
                                    {getDisplayData?.data[index]?.item_name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default SilkTemplate