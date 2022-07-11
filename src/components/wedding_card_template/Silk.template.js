import React from 'react'
import GetFont from '../../utils/GetFont.util'
import WelcomeHeader from '../wedding_card_header/WelcomeHeader.component'

const SilkTemplate = ({
    getDisplayData,
    addRightSideRef,
    gsap,
    getCurrentImg,
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

    const HeaderComponent = () => {
        return (
            <div>
                <div className="absolute h-16 bg-green-400 w-full">
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
                    <div className='text-black sticky top-0 hidden sm:block h-[100vh] w-full'>
                        <div className="absolute w-full ">
                            <div className="relative w-full z-50">
                                <HeaderComponent />
                            </div>
                        </div>
                        <LeftComponent />
                    </div>
                ) : null
            }
            <div className={`w-full sm:min-w-[530px] sm:max-w-[580px] ${getCurrentImg !== "" ?
                `` :
                `w-full `}`}>
                <div id="body-navbar" className="fixed z-50 flex w-full sm:min-w-[530px] sm:max-w-[580px]">
                    <div className={`relative w-full block ${getCurrentImg !== "" ? `sm:hidden` : ``}`}>
                        <HeaderComponent />
                    </div>
                </div>

                <div id="body" className="">
                    {
                        getCurrentImg !== "" ? (
                            <div className="block sm:hidden">
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
                                            className='relative h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]'>

                                            <div className="absolute h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh] w-full">
                                                <img
                                                    alt="ss"
                                                    className=" object-cover h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh] w-full"
                                                    src="https://aliveinvite.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbHhYIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--813fb1481ee2552eda4282e915d2780dc8d469ea/Syazwani-Main.png" />

                                            </div>
                                            <div className="absolute h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh] w-full flex justify-center items-center ">
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

