import React from 'react'
import GetDateDMNY from '../../utils/GetDateDMNY.util'
import GetDayName from '../../utils/GetDayName.util'
import IntroductionHeader from '../wedding_card_header/IntroductionHeader.component'
import WelcomeHeader from '../wedding_card_header/WelcomeHeader.component'

const SilkTemplate = ({
    getDisplayData,
    addRightSideRef,
    gsap,
    getImgLength,
    getParamTemplate,
    getParamDisplay,
    getIsHamburgerOpen,
    setIsHamburgerOpen,
    getCurrentDisplayIndex,
    getNoImage,
    setNoImage,
    getNoImageCover,
    setNoImageCover,
    getIsFadeAnimOn,
}) => {

    const LeftHUD = (currentValue) => {
        switch (currentValue?.item_title) {
            case 'Welcome':
                return (<WelcomeHeader
                    header={currentValue?.header}
                    event_font={getDisplayData?.event_font}

                />)
            case 'Introduction':
                return (<IntroductionHeader
                    header={currentValue?.header}
                    event_font={getDisplayData?.event_font}

                />)

            default:
                return (<div></div>)
        }
    }
    const LeftComponent = () => {
        return (
            <div className=" h-[100vh]">
                <div className="relative h-full w-full">
                    <div className="bg-gray-900 absolute h-full w-full">
                        {/* onimg err */}
                        {
                            getDisplayData?.data[getCurrentDisplayIndex]?.wedding_img_url && getNoImageCover === false ? <img
                                src={getDisplayData?.data[getCurrentDisplayIndex]?.wedding_img_url}
                                alt="Avatar"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    setNoImageCover(true)
                                }}
                                onLoad={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    setNoImageCover(false)
                                }}
                                onChange={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    setNoImageCover(false)
                                }}
                                className={`${getIsFadeAnimOn && `fade-anim`} transition ease-in-out delay-150 object-cover w-full h-full`} /> :
                                <div className={`${getIsFadeAnimOn && `fade-anim`} bg-black w-full h-full`}></div>
                        }
                    </div>
                    {
                        LeftHUD(getDisplayData?.data[getCurrentDisplayIndex])
                    }
                </div>
            </div>
        )
    }
    const HeaderComponent = () => {
        return (
            <div>

                <div className="absolute h-[7vh] w-full flex justify-center flex-col">
                    <button
                        id="hamburget_icon"
                        className="ml-[1vh] focus:outline-none bg-gray-900/[.3] w-min p-[1vh] rounded">

                        <svg
                            id="hamburget_icon"
                            viewBox="0 0 24 24" className="h-[3vh] w-[3vh] stroke-white ">
                            <path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" fill="none" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
                <div className="absolute pl-[1vh] pt-[6vh]">
                    {getIsHamburgerOpen &&
                        <div className="bg-white rounded shadow-md w-[17vh]">
                            {
                                getDisplayData?.data?.map((currentValue, index) => {
                                    return (
                                        <div
                                            key={index}
                                            id={`hamburger_icon_${index + 1}`}
                                            onClick={() => {
                                                gsap.to(window, {
                                                    duration: 1,
                                                    scrollTo: {
                                                        y: `#display_data_${index + 1}`
                                                    }
                                                })
                                                setIsHamburgerOpen(!getIsHamburgerOpen)
                                            }}
                                            className='px-[1.5vh] py-[1.5vh] block hover:rounded hover:bg-gray-100 no-underline hover:no-underline truncate capitalize'
                                        >{currentValue?.item_name}</div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }


    return (
        <div className={`text-[1.7vh] flex items-start bg-white ${getImgLength > 0 ? `` : `w-full items-center justify-center`}`}>

            {
                getImgLength > 0 && (
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
                )
            }
            <div className={`w-full ${getImgLength > 0 ?
                getParamTemplate === 'true' ?
                    getParamDisplay === 'desktop' ?
                        `min-w-[30vw] max-w-[30vw]` :
                        `sm:min-w-[30vw] sm:max-w-[30vw]` :
                    `sm:min-w-[530px] sm:max-w-[30vw]` :
                getParamTemplate === 'true' ?
                    getParamDisplay === 'desktop' ?
                        `shadow-[0_0px_10px_0px] shadow-gray-400 w-[30vw]` :
                        `` :
                    `shadow-[0_0px_10px_0px] shadow-gray-400 sm:w-[530px]  w-full`}`}>
                <div id="body-navbar" className={`fixed z-50 flex w-full ${getImgLength > 0 ?
                    getParamTemplate === 'true' ?
                        getParamDisplay === 'desktop' ?
                            `min-w-[30vw] max-w-[30vw]` :
                            `sm:min-w-[30vw] sm:max-w-[30vw]` :
                        `sm:min-w-[530px] sm:max-w-[30vw]` :
                    `w-full`}`}>
                    <div className={`relative w-full block ${getImgLength > 0 ?
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
                        getImgLength > 0 && (
                            <div
                                className={`${getParamTemplate === 'true' ?
                                    getParamDisplay === 'desktop' ?
                                        `hidden` :
                                        `` :
                                    `block sm:hidden`}`}
                            >
                                <LeftComponent />
                            </div>
                        )
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
                                                {
                                                    getDisplayData?.template?.cover_img_url && getNoImage.toString() === "false" ? <img
                                                        alt="ss"
                                                        className={`object-cover object-center w-full  ${getParamTemplate === 'true' ?
                                                            `h-[100vh]` :
                                                            `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null
                                                            setNoImage(true)
                                                        }}
                                                        src={getDisplayData?.template?.cover_img_url ? getDisplayData?.template?.cover_img_url : ``}

                                                    /> : <div
                                                        className={`bg-pink-400 w-full  ${getParamTemplate === 'true' ?
                                                            `h-[100vh]` :
                                                            `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                                    >     </div>
                                                }

                                            </div>
                                            <div
                                                className={`text-[${getDisplayData?.template?.text_color ?? `#111827`}] absolute w-full flex flex-col text-center justify-center items-center ${getParamTemplate === 'true' ?
                                                    ` min-h-[100vh]` :
                                                    `h-[100vh] min-h-[50rem] sm:h-[100vh] sm:min-h-[100vh]`}`}
                                                style={{ color: getDisplayData?.template?.text_color ?? `#111827` }}
                                            >
                                                <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize line-clamp-1`}>{getDisplayData?.data[index]?.body?.wedding_title}</div>
                                                {
                                                    getImgLength > 0 && getDisplayData?.data[index]?.body?.wedding_date &&
                                                        (getDisplayData?.data[index]?.header?.title_name && getDisplayData?.data[index]?.header?.title_partner_name)
                                                        ? (<>
                                                            <br />
                                                            <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize ${getImgLength > 0 ?
                                                                `text-[3.5vh]` :
                                                                ``}`}
                                                            >{GetDayName({
                                                                date: getDisplayData?.data[index]?.body?.wedding_date
                                                            })}</div>
                                                            <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize ${getImgLength > 0 ?
                                                                `text-[4vh]` :
                                                                ``}`}
                                                            >{GetDateDMNY({
                                                                date: getDisplayData?.data[index]?.body?.wedding_date
                                                            })}</div>
                                                        </>) : (<>
                                                            <br />
                                                            <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize ${getImgLength > 0 ?
                                                                `text-[3.5vh]` :
                                                                `text-[3.5vh]`}`}
                                                            >

                                                                <div className={` capitalize font-['${getDisplayData?.event_font}']`}>
                                                                    <div className='line-clamp-2'>{getDisplayData?.data[index]?.header?.title_name}</div>
                                                                    <div className=''>{" &"}</div>
                                                                    <div className='line-clamp-2'>{getDisplayData?.data[index]?.header?.title_partner_name}</div>
                                                                </div>
                                                            </div>
                                                            {
                                                                getDisplayData?.data[index]?.body?.wedding_date && (<>
                                                                    <br />
                                                                    <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize ${getImgLength > 0 ?
                                                                        `` :
                                                                        ``}`}
                                                                    >
                                                                        {GetDayName({
                                                                            date: getDisplayData?.data[index]?.body?.wedding_date
                                                                        })}
                                                                        {", "}
                                                                        {GetDateDMNY({
                                                                            date: getDisplayData?.data[index]?.body?.wedding_date
                                                                        })}
                                                                    </div>
                                                                </>)
                                                            }
                                                        </>)
                                                }
                                                <br />
                                                <div className={`max-w-full px-[7.4vh]  font-['Cinzel'] capitalize line-clamp-5`}>{getDisplayData?.data[index]?.body?.wedding_location}</div>
                                            </div>
                                        </div>
                                    )
                                case 'Introduction':
                                    return (
                                        <div
                                            key={index}
                                            ref={addRightSideRef}
                                            id={`display_data_${index + 1}`}
                                            className='relative min-h-[100vh]'>

                                            {console.log(getDisplayData)}
                                            <div className="  h-[100vh] flex items-center justify-center">
                                                <div>
                                                    <div>{getDisplayData?.data[0]?.body?.wedding_title}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.father_name}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.mother_name}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.introduction_message}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.your_full_name}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.your_partner_full_name}</div>
                                                    <div>{getDisplayData?.data[0]?.body?.wedding_date}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.start_time}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.end_time}</div>
                                                    <div>{getDisplayData?.data[0]?.body?.wedding_location}</div>
                                                    <div>{getDisplayData?.data[index]?.body?.dress_code}</div>

                                                </div>
                                            </div>
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

