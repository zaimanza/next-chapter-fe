import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useEventModule from '../../modules/useEvent.module'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const WeddingCardPage = () => {
    const { nc_wedding_id } = useParams()
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const run_uno = useRef(false)

    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()
    const [getDisplayData, setDisplayData] = useState({})

    const currentDisplayIndexRef = useRef(0);
    const [getCurrentDisplayIndex, setCurrentDisplayIndex] = useState(0)

    const rightSideRefs = useRef([]);
    const [getRightSiderefs, setRightSiderefs] = useState([])

    const handleIndex = async (state, index) => {
        var current_index = currentDisplayIndexRef.current
        switch (state) {
            case 1:
                if (index > (getDisplayData.length - getDisplayData.length)) {
                    if (current_index < getDisplayData.length) {
                        current_index = current_index + 1
                        setCurrentDisplayIndex(current_index)
                    }
                }
                break;
            case 0:
            default:
                if (index < (getDisplayData.length)) {
                    if (current_index > 0) {
                        current_index = current_index - 1
                        setCurrentDisplayIndex(current_index)
                    } else if (current_index <= 0) {
                        setCurrentDisplayIndex(0)
                    }
                }
                break;

        }
    }

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true

            const initFunctionCall = async () => {

                // findallByOwnerId
                const result = await _useEventModule.findWeddingCard({
                    nc_wedding_id: nc_wedding_id
                })
                console.log(result)
                if (result?.error || !result) {

                    if (result?.error?.error) {
                        setToastConfig({
                            message: "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
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
                    }
                } else {
                    if (result.length !== 0) {
                        setDisplayData(result)



                    } else {
                        navigate("/wedding_card_not_found")
                    }
                }

                // if error view problem with system
            }
            initFunctionCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        currentDisplayIndexRef.current = getCurrentDisplayIndex
    }, [getCurrentDisplayIndex]);

    useEffect(() => {
        if (getRightSiderefs.length === getDisplayData.length) {
            if (run_uno.current === false) {
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
        }

        return () => {
            gsap.killTweensOf(getRightSiderefs);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getRightSiderefs])

    const addRightSideRef = (el) => {
        if (el && !rightSideRefs.current.includes(el)) {
            rightSideRefs.current.push(el);
        }
        setRightSiderefs(rightSideRefs.current)
    }

    if (Object.keys(getDisplayData).length !== 0) {
        return (
            <div className="text-[1.7vh] relative flex min-h-screen flex-col">
                <div className="flex w-full items-start">
                    <div className='sticky top-0 sm:w-full'>
                        <div className='hidden sm:block p-2 w-full h-screen bg-green-400'>
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
                            <div>{getDisplayData?.data[getCurrentDisplayIndex]?.item_name}</div>
                        </div>
                    </div>
                    <div className="w-[100vw] sm:max-w-[40vw] sm:min-w-[40vw]">
                        {
                            getDisplayData?.data?.map((currentValue, index) => {
                                return (
                                    <div
                                        key={index}
                                        ref={addRightSideRef}
                                        id={`display_data_${index + 1}`}
                                        className='h-[100vh] bg-pink-400'>
                                        {getDisplayData?.data[index]?.item_name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default WeddingCardPage