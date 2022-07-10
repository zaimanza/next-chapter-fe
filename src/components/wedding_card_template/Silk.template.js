import React from 'react'
import HeaderComponent from '../wedding_card_header/Header.component'

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
        <div className="text-[1.7vh] relative flex min-h-screen flex-col bg-white">
            <div className={
                `${(getCurrentImg !== "") ?
                    `flex ${getParamTemplate ?
                        'w-full' :
                        'w-full'} items-start` :
                    `flex justify-center items-center`
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
                                <div className="absolute z-10">
                                    <div>as</div>
                                    <div>as</div>
                                    <div>as</div>
                                    <div>as</div>
                                    <div>as</div>
                                </div>
                                <HeaderComponent
                                    getCurrentImg={getCurrentImg}
                                    getDisplayHeader={getDisplayHeader}
                                />
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
                        getParamTemplate ?
                            (getParamDisplay === 'desktop') ?
                                `max-w-[40vw] min-w-[40vw] justify-center shadow-[0_0px_6px_0px] shadow-gray-400` :
                                `w-[100vw] justify-center` :
                            `w-[100vw] md:max-w-[40vw] md:min-w-[40vw] justify-center shadow-[0_0px_10px_0px] shadow-gray-400`
                    } relative`
                }>
                    <div
                        className={
                            `block ${getCurrentImg !== "" ?
                                getParamTemplate ?
                                    (getParamDisplay === 'desktop') ?
                                        `hidden` :
                                        `` :
                                    'sm:hidden' :
                                ''
                            }  absolute z-[1] bg-green-400 h-[8vh] w-full`
                        }>
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
                    <div
                        className={`block ${getCurrentImg !== "" ?
                            getParamTemplate ?
                                (getParamDisplay === 'desktop') ?
                                    `hidden` :
                                    `` :
                                'sm:hidden' :
                            ''
                            } absolute z-[1] pt-1`}>
                        <div>as</div>
                        <div>as</div>
                        <div>as</div>
                        <div>as</div>
                        <div>as</div>
                    </div>
                    {
                        (getCurrentImg !== "") ? (<div className={`block ${getCurrentImg !== "" ?
                            getParamTemplate ?
                                (getParamDisplay === 'desktop') ?
                                    `hidden` :
                                    `` :
                                'sm:hidden' :
                            ''
                            } h-[100vh]`}>
                            <HeaderComponent
                                getCurrentImg={getCurrentImg}
                                getDisplayHeader={getDisplayHeader}
                            />
                        </div>) : null
                    }
                    {
                        getDisplayData?.data?.map((currentValue, index) => {

                            switch (currentValue?.item_title) {
                                case 'Welcome':
                                    return (
                                        <div
                                            key={index}
                                            ref={addRightSideRef}
                                            id={`display_data_${index + 1}`}
                                            className='relative z-0 min-h-[100vh]'>


                                            <div className="  h-[100vh] bg-purple-400">{getDisplayData?.data[index]?.item_name}</div>
                                        </div>
                                    )
                                default:
                                    return (<div key={index}></div>)
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SilkTemplate