import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useEventModule from '../../modules/useEvent.module'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CircularLoadingPage from '../error/circular_loading.page';
import WeddingCardNotFound from '../error/WeddingCardNotFound.page';
import SilkTemplate from '../../components/wedding_card_template/Silk.template';
import WelcomeHeader from '../../components/wedding_card_header/WelcomeHeader.component';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const WeddingCardPage = () => {
    const { nc_wedding_id } = useParams()
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const run_uno = useRef(false)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const [getParamTemplate, setParamTemplate] = useState(false)
    const [getParamDisplay, setParamDisplay] = useState('desktop')


    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()
    const [getDisplayData, setDisplayData] = useState({})

    const currentDisplayIndexRef = useRef(0);
    const [getCurrentDisplayIndex, setCurrentDisplayIndex] = useState(0)

    const rightSideRefs = useRef([]);
    const [getRightSiderefs, setRightSiderefs] = useState([])

    const [getIsLoadingPageOpen, setIsLoadingPageOpen] = useState(true)
    const [getIsHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [getNoImage, setNoImage] = useState(false)
    const [getNoImageCover, setNoImageCover] = useState(false)
    const [getIsFadeAnimOn, setIsFadeAnimOn] = useState(false)
    const refFadeAnimOn = useRef(false)
    // https://www.w3schools.com/howto/img_avatar2.png
    const [getImgLength, setImgLength] = useState(0)

    const [getTimerDays, setTimerDays] = useState('00')
    const [getTimerHours, setTimerHours] = useState('00')
    const [getTimerMinutes, setTimerMinutes] = useState('00')
    const [getTimerSeconds, setTimerSeconds] = useState('00')


    const startTimerCountdown = () => {
        var wedding_date = getDisplayData?.data[0]?.body?.wedding_date
        var total_date = new Date(wedding_date)

        var start_time = getDisplayData?.data[1]?.body?.start_time
        start_time = new Date(start_time)
        total_date.setHours(start_time.getHours())
        total_date.setMinutes(start_time.getMinutes())
        total_date.setSeconds(start_time.getSeconds())

        total_date.setHours(total_date.getHours() + (total_date.getTimezoneOffset() / 60))

        const countdownDate = new Date(total_date).getTime()
        if (getImgLength > 0) {
            const interval = setInterval(() => {
                const now = new Date().getTime()
                const distance = countdownDate - now

                const days = Math.floor(distance / (1000 * 60 * 60 * 24))
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)

                if (distance < 0) {

                    clearTimeout(interval)
                } else {
                    if (refFadeAnimOn.current === false) {
                        setTimerDays(days)
                        setTimerHours(hours)
                        setTimerMinutes(minutes)
                        setTimerSeconds(seconds)
                    }
                }
            }, 1000)
        }
    }

    const handleIndex = async (state, index) => {
        var current_index = currentDisplayIndexRef.current
        switch (state) {
            case 1:
                if (index > (getRightSiderefs.length - getRightSiderefs.length)) {
                    if (current_index < getRightSiderefs.length) {
                        setIsFadeAnimOn(true)
                        refFadeAnimOn.current = true
                        current_index = current_index + 1
                        setCurrentDisplayIndex(current_index)
                        const timeoutAdd = setTimeout(() => {
                            setIsFadeAnimOn(false)
                            refFadeAnimOn.current = false
                            clearTimeout(timeoutAdd)
                        }, 1000)
                    }
                }
                break;
            case 0:
            default:
                if (index < (getRightSiderefs.length)) {
                    if (current_index > 0) {
                        current_index = current_index - 1
                        setIsFadeAnimOn(true)
                        refFadeAnimOn.current = true
                        setCurrentDisplayIndex(current_index)
                        const timeoutMinus = setTimeout(() => {
                            setIsFadeAnimOn(false)
                            refFadeAnimOn.current = false
                            clearTimeout(timeoutMinus)
                        }, 1000)
                    } else if (current_index < 0) {
                        setCurrentDisplayIndex(0)
                    }
                }
                break;

        }
    }

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true

            if (queryParams.get('template')?.toString() === 'true') setParamTemplate(queryParams.get('template'))
            if (queryParams.get('display')?.toString() === 'desktop' ||
                queryParams.get('display')?.toString() === 'mobile') setParamDisplay(queryParams.get('display'))

            const initFunctionCall = async () => {

                // findallByOwnerId
                var result = await _useEventModule.findWeddingCard({
                    nc_wedding_id: nc_wedding_id
                })
                if (result?.error || !result) {
                    if (result?.error?.error) {
                        setToastConfig({
                            message: "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
                        navigate("/500")
                    } else if (result?.error) {
                        setToastConfig({
                            message: result?.error?.message ?? "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
                        navigate("/wedding_card_not_found")
                    } else {
                        setToastConfig({
                            message: "There's no event available.",
                            mode: "warning"
                        })
                        navigate("/500")
                    }
                } else {
                    if (result.length !== 0) {
                        result?.data?.sort((a, b) => (a.index_position > b.index_position) ? 1 : -1)
                        setDisplayData(result)

                        const filtered_result = result?.data?.filter((element) => {
                            if (element?.wedding_img_url)
                                return true
                            return false
                        });

                        setImgLength(filtered_result?.length ?? 0)
                        SetHeader(result)
                    } else {
                        navigate("/wedding_card_not_found")
                    }
                }

                const timeout = setTimeout(() => {
                    setIsLoadingPageOpen(false)
                    clearTimeout(timeout)
                }, 2000)
            }
            initFunctionCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        currentDisplayIndexRef.current = getCurrentDisplayIndex
    }, [getCurrentDisplayIndex]);

    useEffect(() => {
        if (getRightSiderefs.length > 0) {
            getRightSiderefs.forEach((currentValue, index) => {
                gsap.to(currentValue, {
                    // x: 700,
                    duration: 1,
                    scrollTrigger: {
                        trigger: currentValue,
                        start: "top 50%",
                        // end: vhToPixels(100),
                        scrub: true,
                        toggleActions: "play none none none",
                        // markers: true,
                        onEnter: () => {
                            handleIndex(1, index)
                        },
                        onLeaveBack: () => {
                            handleIndex(0, index)
                        }
                    },
                });
            })
        }

        return () => {
            gsap.killTweensOf(getRightSiderefs);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getRightSiderefs])

    useEffect(() => {
        if (getRightSiderefs.length > 0) {
            const handleClickOutside = (event) => {
                if (event?.target?.id === "events_button") {
                    navigate("/events");
                }
                else if (event?.target?.id === "profile_button") { }
                else if (event?.target?.id === "hamburget_icon") {
                    setIsHamburgerOpen(!getIsHamburgerOpen)
                }
                else if (event?.target?.id?.substring(0, 15) === "hamburger_icon_") {
                }
                else {
                    setIsHamburgerOpen(false)
                }
            }
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getRightSiderefs]);

    useEffect(() => {
        if (getRightSiderefs.length > 0) {
            startTimerCountdown()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getRightSiderefs]);

    const addRightSideRef = (el) => {
        if (el && !rightSideRefs.current.includes(el)) {
            rightSideRefs.current.push(el);
        }
        setRightSiderefs(rightSideRefs.current)
    }

    const [getDisplayHeader, setDisplayHeader] = useState([])

    const SetHeader = async (result) => {

        const tempp_diaplay_header = await result?.data?.map((currentValue, index) => {

            switch (currentValue?.item_title) {
                case 'Welcome':
                    return (<WelcomeHeader
                        key={index}
                        header={currentValue?.header}
                        event_font={result?.event_font}

                    />)

                default:
                    return (<div key={index}></div>)
            }
        });
        setDisplayHeader(tempp_diaplay_header)
    }

    if (!getIsLoadingPageOpen) {
        if (Object.keys(getDisplayData).length !== 0) {
            if (getDisplayData?.event_theme === 'silk') {
                return SilkTemplate({
                    getDisplayData: getDisplayData,
                    getParamTemplate: getParamTemplate,
                    getParamDisplay: getParamDisplay,
                    getCurrentDisplayIndex: getCurrentDisplayIndex,
                    addRightSideRef: addRightSideRef,
                    gsap: gsap,
                    event_font: getDisplayData?.event_font,
                    getDisplayHeader: getDisplayHeader,
                    getImgLength: getImgLength,
                    getIsHamburgerOpen: getIsHamburgerOpen,
                    setIsHamburgerOpen: setIsHamburgerOpen,
                    getNoImage: getNoImage,
                    setNoImage: setNoImage,
                    getNoImageCover: getNoImageCover,
                    setNoImageCover: setNoImageCover,
                    getIsFadeAnimOn: getIsFadeAnimOn,
                    getTimerDays,
                    getTimerHours,
                    getTimerMinutes,
                    getTimerSeconds,
                })
            } else {
                return WeddingCardNotFound()
            }
        } else {
            return WeddingCardNotFound()
        }
    } else {
        return CircularLoadingPage()
    }
}

export default WeddingCardPage