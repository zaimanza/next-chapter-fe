import React from 'react'
import GetFont from '../../utils/GetFont.util'
import WelcomeHeader from '../wedding_card_header/WelcomeHeader.component'

const SilkTemplate = ({
    getDisplayData,
    addRightSideRef,
    gsap,
    getCurrentImg,
    getParamTemplate,
    getParamDisplay,
}) => {

    const LeftComponent = () => {
        return (
            <div className="bg-yellow-400 h-[100vh]">
                <div className="relative h-full w-full">
                    <div className="bg-pink-400 absolute h-full w-full">
                        <img
                            src={getCurrentImg}
                            alt="Avatar"
                            className="object-cover w-full h-full" />
                    </div>
                    {
                        getDisplayData?.data?.map((currentValue, index) => {

                            switch (currentValue?.item_title) {
                                case 'Welcome':
                                    return (<WelcomeHeader
                                        key={index}
                                        header={currentValue?.header}
                                        event_font={
                                            GetFont({
                                                font_name: getDisplayData?.event_font
                                            })
                                        }

                                    />)

                                default:
                                    return (<div key={index}></div>)
                            }
                        })
                    }
                </div>
            </div>
        )
    }
    console.log(getParamTemplate)
    const HeaderComponent = () => {
        return (
            <div>
                <div className="absolute h-[7vh] bg-green-400 w-full">
                    BARNAV
                </div>
                <div className="absolute">
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
            </div>
        )
    }


    return (
        <div className={`text-[1.7vh] flex items-start bg-white ${getCurrentImg !== "" ? `` : `shadow-[0_6px_0px_0px] shadow-black w-full items-center justify-center`}`}>

            {
                getCurrentImg !== "" ? (
                    <div
                        className={`text-black sticky top-0 h-[100vh] w-full ${getParamTemplate === 'true' ?
                            getParamDisplay === 'desktop' ?
                                `` :
                                `hidden` :
                            `hidden sm:block`}`}
                    >
                        <div
                            className="absolute w-full "
                        >
                            <div
                                className="relative w-full z-50"
                            >
                                <HeaderComponent />
                            </div>
                        </div>
                        <LeftComponent />
                    </div>
                ) : null
            }
            <div className={`w-full ${getCurrentImg !== "" ?
                getParamTemplate === 'true' ?
                    getParamDisplay === 'desktop' ?
                        `min-w-[30vw] max-w-[30vw]` :
                        `sm:min-w-[30vw] sm:max-w-[30vw]` :
                    `sm:min-w-[530px] sm:max-w-[30vw]` :
                `sm:min-w-[530px] sm:max-w-[30vw] w-full`}`}>
                <div id="body-navbar" className={`fixed z-50 flex w-full ${getCurrentImg !== "" ?
                    getParamTemplate === 'true' ?
                        getParamDisplay === 'desktop' ?
                            `min-w-[30vw] max-w-[30vw]` :
                            `sm:min-w-[30vw] sm:max-w-[30vw]` :
                        `sm:min-w-[530px] sm:max-w-[30vw]` :
                    `sm:min-w-[530px] sm:max-w-[30vw] w-full`}`}>
                    <div className={`relative w-full block ${getCurrentImg !== "" ?
                        getParamTemplate === 'true' ?
                            getParamDisplay === 'desktop' ?
                                `hidden` :
                                `` :
                            `sm:hidden` :
                        ``}`}>
                        <HeaderComponent />
                    </div>
                </div>

                <div id="body" className="">
                    {
                        getCurrentImg !== "" ? (
                            <div
                                className={`${getParamTemplate === 'true' ?
                                    getParamDisplay === 'desktop' ?
                                        `hidden` :
                                        `` :
                                    `block sm:hidden`}`}
                            >
                                <LeftComponent />
                            </div>
                        ) : null
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
                                            className={`relative ${getParamTemplate === 'true' ?
                                                `h-[100vh]` :
                                                `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                        >

                                            <div
                                                className={`absolute w-full  ${getParamTemplate === 'true' ?
                                                    `h-[100vh]` :
                                                    `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                            >
                                                <img
                                                    alt="ss"
                                                    className={`object-cover object-center w-full  ${getParamTemplate === 'true' ?
                                                        `h-[100vh]` :
                                                        `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                                    src="https://aliveinvite.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHhYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--813fb1481ee2552eda4282e915d2780dc8d469ea/Syazwani-Main.png" />

                                            </div>
                                            <div className={`absolute w-full flex justify-center items-center ${getParamTemplate === 'true' ?
                                                ` min-h-[100vh]` :
                                                `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}>
                                                <div>{getDisplayData?.data[index]?.item_name}</div>
                                            </div>
                                        </div>
                                    )
                                case 'ref':
                                    return (
                                        <div
                                            key={index}
                                            ref={addRightSideRef}
                                            id={`display_data_${index + 1}`}
                                            className='relative min-h-[100vh]'>


                                            <div className="  h-[100vh] bg-red-400">{getDisplayData?.data[index]?.item_name}</div>
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

