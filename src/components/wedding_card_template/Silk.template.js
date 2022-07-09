import React from 'react'

const SilkTemplate = ({
    getDisplayData,
    getParamTemplate,
    getParamDisplay,
    getCurrentDisplayIndex,
    addRightSideRef,
    gsap,
    event_font,
}) => {

    return (
        <div className="text-[1.7vh] relative flex min-h-screen flex-col">
            <div className={`flex ${getParamTemplate ? 'w-full' : 'w-full'} items-start`}>
                <div className={`sticky top-0 ${getParamTemplate ? (getParamDisplay === 'desktop') ? 'w-full' : 'sm:w-full' : 'sm:w-full'}`}>
                    <div className={`${getParamTemplate ? (getParamDisplay === 'desktop') ? '' : 'hidden sm:block' : 'hidden sm:block'} p-2 w-full h-screen bg-green-400`}>
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
                        <div className={`${event_font}`}>{getDisplayData?.data[getCurrentDisplayIndex]?.item_name}</div>
                    </div>
                </div>
                <div className={`${getParamTemplate ? (getParamDisplay === 'desktop') ? ' max-w-[40vw] min-w-[40vw]' : ' w-[100vw] sm:max-w-[40vw] sm:min-w-[40vw]' : ' w-[100vw] sm:max-w-[40vw] sm:min-w-[40vw]'}`}>
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